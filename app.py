from __future__ import annotations

import json
import math
import mimetypes
import os
import re
import secrets
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.error import URLError
from urllib.parse import parse_qs, quote, unquote, urlparse
from urllib.request import Request, urlopen
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


ROOT = Path(__file__).resolve().parent
STATIC_DIR = ROOT / "static"
DATA_DIR = ROOT / "data"
HOSPITALS_FILE = DATA_DIR / "hospitals.json"
CONSULTATIONS_FILE = DATA_DIR / "consultations.jsonl"

APP_NAME = "MedClear"
DEFAULT_USERNAME = os.environ.get("MEDCLEAR_USERNAME", "medclear")
DEFAULT_PASSWORD = os.environ.get("MEDCLEAR_PASSWORD", "care2026")
USER_AGENT = "MedClearDesignThinking/1.0 (local student project)"

CITY_COORDS = {
    "dehradun": {"lat": 30.3165, "lon": 78.0322, "city": "Dehradun", "state": "Uttarakhand"},
    "new delhi": {"lat": 28.6139, "lon": 77.2090, "city": "New Delhi", "state": "Delhi"},
    "delhi": {"lat": 28.6139, "lon": 77.2090, "city": "New Delhi", "state": "Delhi"},
    "gurugram": {"lat": 28.4595, "lon": 77.0266, "city": "Gurugram", "state": "Haryana"},
    "gurgaon": {"lat": 28.4595, "lon": 77.0266, "city": "Gurugram", "state": "Haryana"},
    "mumbai": {"lat": 19.0760, "lon": 72.8777, "city": "Mumbai", "state": "Maharashtra"},
    "chennai": {"lat": 13.0827, "lon": 80.2707, "city": "Chennai", "state": "Tamil Nadu"},
    "bengaluru": {"lat": 12.9716, "lon": 77.5946, "city": "Bengaluru", "state": "Karnataka"},
    "bangalore": {"lat": 12.9716, "lon": 77.5946, "city": "Bengaluru", "state": "Karnataka"},
}

PINCODE_COORDS = {
    "248001": {"lat": 30.3165, "lon": 78.0322, "city": "Dehradun", "state": "Uttarakhand"},
    "248003": {"lat": 30.3383, "lon": 78.0574, "city": "Dehradun", "state": "Uttarakhand"},
    "248006": {"lat": 30.2714, "lon": 78.0184, "city": "Dehradun", "state": "Uttarakhand"},
    "248007": {"lat": 30.3539, "lon": 77.9673, "city": "Dehradun", "state": "Uttarakhand"},
    "248140": {"lat": 30.1882, "lon": 78.1875, "city": "Jolly Grant", "state": "Uttarakhand"},
    "110017": {"lat": 28.5245, "lon": 77.2066, "city": "New Delhi", "state": "Delhi"},
    "110029": {"lat": 28.5672, "lon": 77.2100, "city": "New Delhi", "state": "Delhi"},
    "122001": {"lat": 28.4595, "lon": 77.0266, "city": "Gurugram", "state": "Haryana"},
    "400053": {"lat": 19.1307, "lon": 72.8331, "city": "Mumbai", "state": "Maharashtra"},
    "560017": {"lat": 12.9580, "lon": 77.6650, "city": "Bengaluru", "state": "Karnataka"},
    "600006": {"lat": 13.0632, "lon": 80.2514, "city": "Chennai", "state": "Tamil Nadu"},
}

STOP_WORDS = {
    "hospital",
    "hospitals",
    "near",
    "nearby",
    "available",
    "for",
    "with",
    "in",
    "at",
    "best",
    "center",
    "centre",
    "treatment",
}

TREATMENT_SYNONYMS = {
    "mri": {"mri", "scan", "radiology", "diagnostic", "imaging"},
    "heart": {"heart", "cardiac", "cardiology", "angioplasty", "bypass"},
    "cardiac": {"heart", "cardiac", "cardiology", "angioplasty", "bypass"},
    "cancer": {"cancer", "oncology", "chemotherapy", "radiation"},
    "kidney": {"kidney", "renal", "nephrology", "dialysis"},
    "liver": {"liver", "transplant", "hepatology"},
    "spine": {"spine", "lumbar", "orthopaedics", "neurosurgery"},
    "knee": {"knee", "orthopaedics", "replacement", "joint"},
    "child": {"child", "pediatric", "paediatric"},
    "delivery": {"delivery", "maternity", "obstetrics", "c-section"},
    "csection": {"delivery", "maternity", "obstetrics", "c-section", "cesarean"},
    "eye": {"eye", "cataract", "ophthalmology"},
}

IMAGE_CACHE: dict[str, str | None] = {}
PINCODE_CACHE: dict[str, dict[str, Any]] = {}
LOCATION_CACHE: dict[str, dict[str, Any] | None] = {}


def load_hospitals() -> list[dict[str, Any]]:
    with HOSPITALS_FILE.open("r", encoding="utf-8") as handle:
        return json.load(handle)


HOSPITALS = load_hospitals()
HOSPITAL_BY_ID = {hospital["id"]: hospital for hospital in HOSPITALS}


def normalize(text: str | None) -> str:
    if not text:
        return ""
    return re.sub(r"[^a-z0-9]+", " ", text.lower()).strip()


def compact(text: str | None) -> str:
    return normalize(text).replace(" ", "")


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    radius = 6371.0
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (
        math.sin(d_lat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(d_lon / 2) ** 2
    )
    return 2 * radius * math.asin(math.sqrt(a))


def fetch_json(url: str, timeout: float = 4.0) -> Any:
    request = Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/json"})
    with urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


def api_get_pincode(pin: str) -> dict[str, Any] | None:
    if not re.fullmatch(r"\d{6}", pin):
        return None
    if pin in PINCODE_CACHE:
        return PINCODE_CACHE[pin]

    cached = PINCODE_COORDS.get(pin)
    info: dict[str, Any] = {
        "pincode": pin,
        "source": "local-cache",
        "lat": cached.get("lat") if cached else None,
        "lon": cached.get("lon") if cached else None,
        "city": cached.get("city") if cached else "",
        "state": cached.get("state") if cached else "",
        "post_offices": [],
    }

    try:
        postal_data = fetch_json(f"https://api.postalpincode.in/pincode/{pin}", timeout=3.0)
        if postal_data and str(postal_data[0].get("Status", "")).lower() == "success":
            offices = postal_data[0].get("PostOffice") or []
            first = offices[0] if offices else {}
            info.update(
                {
                    "source": "api.postalpincode.in",
                    "city": first.get("District") or info["city"],
                    "state": first.get("State") or info["state"],
                    "post_offices": [office.get("Name") for office in offices[:8] if office.get("Name")],
                }
            )
    except (TimeoutError, URLError, OSError, ValueError, KeyError):
        pass

    if info.get("lat") is None or info.get("lon") is None:
        geo = geocode_location(pin, force_query=f"{pin}, India")
        if geo:
            info.update({"lat": geo["lat"], "lon": geo["lon"], "source": f"{info['source']} + nominatim"})

    PINCODE_CACHE[pin] = info
    return info


def geocode_location(location: str, force_query: str | None = None) -> dict[str, Any] | None:
    cleaned = normalize(location)
    if not cleaned:
        return None
    if cleaned in CITY_COORDS:
        city = CITY_COORDS[cleaned]
        return {**city, "source": "local-city-cache", "label": f"{city['city']}, {city['state']}"}

    if cleaned in LOCATION_CACHE:
        return LOCATION_CACHE[cleaned]

    query = force_query or f"{location}, India"
    url = (
        "https://nominatim.openstreetmap.org/search"
        f"?format=jsonv2&limit=1&countrycodes=in&q={quote(query)}"
    )
    try:
        rows = fetch_json(url, timeout=4.0)
        if rows:
            row = rows[0]
            address = row.get("display_name", "")
            result = {
                "lat": float(row["lat"]),
                "lon": float(row["lon"]),
                "city": location.title(),
                "state": "",
                "label": address,
                "source": "nominatim.openstreetmap.org",
            }
            LOCATION_CACHE[cleaned] = result
            return result
    except (TimeoutError, URLError, OSError, ValueError, KeyError):
        pass

    LOCATION_CACHE[cleaned] = None
    return None


def resolve_location(location: str | None, pincode: str | None, treatment: str | None) -> dict[str, Any] | None:
    pin = re.sub(r"\D", "", pincode or "")
    if not pin and location:
        match = re.search(r"\b(\d{6})\b", location)
        if match:
            pin = match.group(1)
    if pin:
        info = api_get_pincode(pin)
        if info:
            return info

    if location:
        geo = geocode_location(location)
        if geo:
            return geo

    if treatment:
        fallback = CITY_COORDS["dehradun"]
        return {
            **fallback,
            "label": "Dehradun default",
            "source": "default-near-dehradun",
            "implicit": True,
        }
    return None


def treatment_score(hospital: dict[str, Any], query: str | None) -> int:
    if not query:
        return 20
    terms = [term for term in normalize(query).split() if term not in STOP_WORDS]
    if not terms:
        return 20
    expanded: set[str] = set()
    for term in terms:
        expanded.add(term)
        expanded.add(compact(term))
        expanded.update(TREATMENT_SYNONYMS.get(term, set()))
        expanded.update(TREATMENT_SYNONYMS.get(compact(term), set()))

    haystack_parts = [
        hospital.get("name", ""),
        hospital.get("type", ""),
        " ".join(hospital.get("specialties", [])),
    ]
    for treatment in hospital.get("treatments", []):
        haystack_parts.extend(
            [
                treatment.get("name", ""),
                treatment.get("category", ""),
                " ".join(treatment.get("tags", [])),
            ]
        )
    haystack = normalize(" ".join(haystack_parts))
    haystack_compact = compact(haystack)

    direct_hits = sum(1 for term in terms if term in haystack or compact(term) in haystack_compact)
    expanded_hits = sum(1 for term in expanded if term and term in haystack)
    if direct_hits == len(terms):
        return 100
    if direct_hits or expanded_hits:
        return min(95, 48 + (direct_hits * 18) + (expanded_hits * 8))
    return 0


def public_hospital(hospital: dict[str, Any], base: dict[str, Any] | None = None) -> dict[str, Any]:
    result = dict(hospital)
    result.pop("image_search", None)
    result["image"] = f"/api/image?id={quote(hospital['id'])}"
    result["distance_km"] = None
    if base and hospital.get("lat") and hospital.get("lon"):
        result["distance_km"] = round(
            haversine_km(float(base["lat"]), float(base["lon"]), float(hospital["lat"]), float(hospital["lon"])),
            1,
        )
    return result


def search_hospitals(params: dict[str, list[str]]) -> dict[str, Any]:
    treatment = first_param(params, "treatment")
    location_text = first_param(params, "location")
    pincode = first_param(params, "pincode")
    hospital_type = first_param(params, "type")
    sort = first_param(params, "sort") or "recommended"
    limit_text = first_param(params, "limit")
    require_er = (first_param(params, "er") or "").lower() in {"1", "true", "yes"}
    base = resolve_location(location_text, pincode, treatment)
    limit = int(limit_text) if limit_text and limit_text.isdigit() else None

    rows = []
    for hospital in HOSPITALS:
        score = treatment_score(hospital, treatment)
        if treatment and score == 0:
            continue
        if hospital_type and hospital_type != "all" and normalize(hospital_type) not in normalize(hospital.get("type")):
            continue
        if require_er and not hospital.get("er_available"):
            continue

        public = public_hospital(hospital, base)
        distance = public.get("distance_km")
        if base and base.get("implicit") and distance is not None and distance > 80:
            continue
        if base and (location_text or pincode) and distance is not None and distance > 140:
            continue

        public["match_score"] = score
        public["match_reason"] = build_match_reason(public, treatment, base)
        rows.append(public)

    if sort == "distance" and base:
        rows.sort(key=lambda item: (item.get("distance_km") is None, item.get("distance_km") or 9999, -item["clarity"]))
    elif sort == "rating":
        rows.sort(key=lambda item: (-item["rating"], item.get("distance_km") or 9999))
    elif sort == "cost":
        rows.sort(key=lambda item: (min_treatment_cost(item), item.get("distance_km") or 9999))
    elif sort == "clarity":
        rows.sort(key=lambda item: (-item["clarity"], item.get("distance_km") or 9999))
    else:
        rows.sort(
            key=lambda item: (
                -item["match_score"],
                item.get("distance_km") if item.get("distance_km") is not None else 9999,
                -item["clarity"],
                -item["rating"],
            )
        )

    if limit:
        rows = rows[:limit]

    return {
        "count": len(rows),
        "results": rows,
        "location": base,
        "query": {
            "treatment": treatment or "",
            "location": location_text or "",
            "pincode": pincode or "",
            "sort": sort,
        },
        "sources": [
            "api.postalpincode.in for PIN code metadata",
            "nominatim.openstreetmap.org for location geocoding",
            "commons.wikimedia.org for public hospital images",
            "local curated dataset for fast offline fallback",
        ],
    }


def build_match_reason(hospital: dict[str, Any], treatment: str | None, base: dict[str, Any] | None) -> str:
    bits = []
    if treatment:
        bits.append(f"Matches {treatment}")
    if base and hospital.get("distance_km") is not None:
        bits.append(f"{hospital['distance_km']} km from {base.get('city') or base.get('label') or 'selected location'}")
    if hospital.get("er_available"):
        bits.append("ER available")
    return " - ".join(bits) or "High transparency score"


def min_treatment_cost(hospital: dict[str, Any]) -> int:
    costs = [int(treatment.get("total", 99999999)) for treatment in hospital.get("treatments", [])]
    return min(costs) if costs else 99999999


def emergency_hospitals(params: dict[str, list[str]]) -> dict[str, Any]:
    location_text = first_param(params, "location") or "Dehradun"
    pincode = first_param(params, "pincode")
    base = resolve_location(location_text, pincode, None) or CITY_COORDS["dehradun"]
    rows = []
    for hospital in HOSPITALS:
        if not hospital.get("er_available"):
            continue
        public = public_hospital(hospital, base)
        rows.append(public)
    rows.sort(key=lambda item: (item.get("distance_km") is None, item.get("distance_km") or 9999, item["er_wait_min"]))
    return {
        "location": base,
        "count": len(rows),
        "results": rows[:12],
        "contacts": [
            {"label": "Ambulance", "number": "108", "detail": "India emergency ambulance"},
            {"label": "National Emergency", "number": "112", "detail": "Police, fire, medical"},
            {"label": "Health Helpline", "number": "104", "detail": "State health guidance"},
            {"label": "Child Helpline", "number": "1098", "detail": "Child emergency support"},
        ],
    }


def first_param(params: dict[str, list[str]], key: str) -> str:
    value = params.get(key, [""])[0].strip()
    return value


def commons_image_url(hospital: dict[str, Any]) -> str | None:
    hospital_id = hospital["id"]
    if hospital_id in IMAGE_CACHE:
        return IMAGE_CACHE[hospital_id]
    if os.environ.get("MEDCLEAR_DISABLE_LIVE_IMAGES") == "1":
        IMAGE_CACHE[hospital_id] = None
        return None

    query = hospital.get("image_search") or f"{hospital['name']} hospital building India"
    url = (
        "https://commons.wikimedia.org/w/api.php"
        "?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=1"
        f"&gsrsearch={quote(query)}&prop=imageinfo&iiprop=url&iiurlwidth=900"
    )
    try:
        data = fetch_json(url, timeout=3.0)
        pages = (data.get("query") or {}).get("pages") or {}
        for page in pages.values():
            image_info = page.get("imageinfo") or []
            if image_info:
                image_url = image_info[0].get("thumburl") or image_info[0].get("url")
                if image_url:
                    IMAGE_CACHE[hospital_id] = image_url
                    return image_url
    except (TimeoutError, URLError, OSError, ValueError, KeyError):
        pass
    IMAGE_CACHE[hospital_id] = None
    return None


def placeholder_svg(hospital: dict[str, Any]) -> bytes:
    title = hospital.get("name", "Hospital")
    city = hospital.get("city", "India")
    initials = "".join(part[0] for part in normalize(title).split()[:3]).upper() or "MC"
    hue = abs(hash(hospital.get("id", title))) % 360
    escaped_title = html_escape(title)
    escaped_city = html_escape(city)
    svg = f"""
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
  <defs>
    <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="hsl({hue}, 54%, 38%)" offset="0"/>
      <stop stop-color="hsl({(hue + 44) % 360}, 58%, 24%)" offset="0.55"/>
      <stop stop-color="#152a38" offset="1"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" x2="1">
      <stop stop-color="#ffffff" stop-opacity=".82" offset="0"/>
      <stop stop-color="#d7f3f1" stop-opacity=".58" offset="1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="760" fill="url(#sky)"/>
  <circle cx="1010" cy="130" r="140" fill="#ffffff" opacity=".12"/>
  <circle cx="210" cy="610" r="210" fill="#ee6c5d" opacity=".15"/>
  <g transform="translate(190 170)">
    <rect x="0" y="120" width="820" height="350" rx="26" fill="#eef9f8" opacity=".90"/>
    <rect x="70" y="20" width="235" height="450" rx="20" fill="url(#glass)"/>
    <rect x="345" y="80" width="300" height="390" rx="20" fill="#f7fbfb" opacity=".93"/>
    <rect x="690" y="145" width="200" height="325" rx="18" fill="#d8edf0" opacity=".82"/>
    <g fill="#0f6e7b" opacity=".92">
      <rect x="100" y="70" width="54" height="54" rx="10"/>
      <rect x="178" y="70" width="54" height="54" rx="10"/>
      <rect x="100" y="150" width="54" height="54" rx="10"/>
      <rect x="178" y="150" width="54" height="54" rx="10"/>
      <rect x="390" y="130" width="64" height="58" rx="12"/>
      <rect x="490" y="130" width="64" height="58" rx="12"/>
      <rect x="390" y="225" width="64" height="58" rx="12"/>
      <rect x="490" y="225" width="64" height="58" rx="12"/>
      <rect x="735" y="195" width="50" height="48" rx="10"/>
      <rect x="810" y="195" width="50" height="48" rx="10"/>
    </g>
    <rect x="486" y="345" width="80" height="125" rx="12" fill="#0d4654"/>
    <rect x="515" y="368" width="20" height="102" rx="8" fill="#ffffff" opacity=".65"/>
  </g>
  <g transform="translate(76 76)">
    <rect width="132" height="132" rx="32" fill="#ffffff" opacity=".88"/>
    <text x="66" y="79" fill="#0f6e7b" text-anchor="middle" font-size="42" font-family="Arial, sans-serif" font-weight="700">{initials}</text>
  </g>
  <text x="78" y="670" fill="#ffffff" font-size="42" font-family="Arial, sans-serif" font-weight="700">{escaped_title}</text>
  <text x="80" y="716" fill="#d8f4f2" font-size="27" font-family="Arial, sans-serif">{escaped_city}</text>
</svg>
"""
    return svg.encode("utf-8")


def html_escape(value: str) -> str:
    return (
        value.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


class MedClearHandler(BaseHTTPRequestHandler):
    server_version = "MedClearHTTP/1.0"

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "content-type, authorization")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path.startswith("/api/"):
            self.handle_api_get(parsed.path, parse_qs(parsed.query))
            return
        self.serve_static(parsed.path)

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/login":
            payload = self.read_json_body()
            username = str(payload.get("username", "")).strip()
            password = str(payload.get("password", "")).strip()
            if username == DEFAULT_USERNAME and password == DEFAULT_PASSWORD:
                self.respond_json(
                    {
                        "ok": True,
                        "token": f"demo-{secrets.token_hex(16)}",
                        "user": {"name": "Design Team", "username": DEFAULT_USERNAME},
                    }
                )
            else:
                self.respond_json({"ok": False, "message": "Invalid username or password."}, status=401)
            return

        if parsed.path == "/api/consultations":
            payload = self.read_json_body()
            required = ["hospital_id", "name", "email", "phone", "procedure"]
            missing = [key for key in required if not str(payload.get(key, "")).strip()]
            if missing:
                self.respond_json({"ok": False, "message": f"Missing fields: {', '.join(missing)}"}, status=400)
                return
            hospital = HOSPITAL_BY_ID.get(str(payload["hospital_id"]))
            if not hospital:
                self.respond_json({"ok": False, "message": "Hospital not found."}, status=404)
                return
            code = f"MC-{secrets.token_hex(3).upper()}"
            record = {
                "code": code,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "hospital_id": hospital["id"],
                "hospital_name": hospital["name"],
                "name": payload["name"],
                "email": payload["email"],
                "phone": payload["phone"],
                "procedure": payload["procedure"],
                "preferred_time": payload.get("preferred_time", ""),
                "notes": payload.get("notes", ""),
            }
            DATA_DIR.mkdir(exist_ok=True)
            with CONSULTATIONS_FILE.open("a", encoding="utf-8") as handle:
                handle.write(json.dumps(record, ensure_ascii=False) + "\n")
            self.respond_json(
                {
                    "ok": True,
                    "code": code,
                    "message": f"Consultation request saved for {hospital['name']}.",
                },
                status=201,
            )
            return

        self.respond_json({"message": "Not found"}, status=404)

    def handle_api_get(self, path: str, params: dict[str, list[str]]) -> None:
        if path == "/api/health":
            self.respond_json({"ok": True, "app": APP_NAME, "time": time.time()})
            return

        if path == "/api/hospitals":
            self.respond_json(search_hospitals(params))
            return

        if path.startswith("/api/hospitals/"):
            hospital_id = unquote(path.rsplit("/", 1)[-1])
            hospital = HOSPITAL_BY_ID.get(hospital_id)
            if not hospital:
                self.respond_json({"message": "Hospital not found"}, status=404)
                return
            self.respond_json(public_hospital(hospital))
            return

        if path == "/api/emergency":
            self.respond_json(emergency_hospitals(params))
            return

        if path == "/api/pincode":
            pin = re.sub(r"\D", "", first_param(params, "value"))
            info = api_get_pincode(pin) if pin else None
            if not info:
                self.respond_json({"ok": False, "message": "Enter a valid six digit PIN code."}, status=400)
                return
            self.respond_json({"ok": True, "location": info})
            return

        if path == "/api/location-suggest":
            query = first_param(params, "q")
            suggestions = []
            norm = normalize(query)
            if norm:
                for city in CITY_COORDS.values():
                    label = f"{city['city']}, {city['state']}"
                    if norm in normalize(label):
                        suggestions.append({**city, "label": label, "source": "local-city-cache"})
                if re.fullmatch(r"\d{6}", query.strip()):
                    pin = api_get_pincode(query.strip())
                    if pin:
                        suggestions.insert(0, {**pin, "label": f"{pin.get('city')}, {pin.get('state')}"})
            self.respond_json({"suggestions": suggestions[:6]})
            return

        if path == "/api/image":
            hospital_id = first_param(params, "id")
            hospital = HOSPITAL_BY_ID.get(hospital_id) or {
                "id": "hero",
                "name": "Modern hospital care",
                "city": "India",
                "image_search": "hospital building India",
            }
            image_url = commons_image_url(hospital)
            if image_url:
                self.send_response(302)
                self.send_header("Location", image_url)
                self.send_header("Cache-Control", "public, max-age=3600")
                self.end_headers()
            else:
                body = placeholder_svg(hospital)
                self.send_response(200)
                self.send_header("Content-Type", "image/svg+xml; charset=utf-8")
                self.send_header("Content-Length", str(len(body)))
                self.send_header("Cache-Control", "public, max-age=600")
                self.end_headers()
                self.wfile.write(body)
            return

        if path == "/api/sources":
            self.respond_json(
                {
                    "sources": [
                        {
                            "name": "Postal PIN Code API",
                            "url": "https://www.postalpincode.in/Api-Details",
                            "usage": "PIN code metadata lookup",
                        },
                        {
                            "name": "OpenStreetMap Nominatim",
                            "url": "https://nominatim.org/release-docs/latest/api/Search/",
                            "usage": "City and PIN geocoding",
                        },
                        {
                            "name": "Wikimedia Commons MediaWiki API",
                            "url": "https://www.mediawiki.org/wiki/API:Imageinfo",
                            "usage": "Hospital image discovery",
                        },
                    ]
                }
            )
            return

        self.respond_json({"message": "Not found"}, status=404)

    def read_json_body(self) -> dict[str, Any]:
        length = int(self.headers.get("Content-Length", "0") or 0)
        if not length:
            return {}
        raw = self.rfile.read(length)
        try:
            return json.loads(raw.decode("utf-8"))
        except ValueError:
            return {}

    def respond_json(self, payload: Any, status: int = 200) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def serve_static(self, raw_path: str) -> None:
        route = "/index.html" if raw_path in {"", "/"} else unquote(raw_path)
        target = (STATIC_DIR / route.lstrip("/")).resolve()
        static_root = STATIC_DIR.resolve()
        if not str(target).startswith(str(static_root)) or not target.exists() or target.is_dir():
            target = STATIC_DIR / "index.html"

        content_type = mimetypes.guess_type(str(target))[0] or "application/octet-stream"
        body = target.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "public, max-age=60")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt: str, *args: Any) -> None:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] {self.address_string()} {fmt % args}")


def main() -> None:
    port = int(os.environ.get("PORT", "8000"))
    server = ThreadingHTTPServer(("127.0.0.1", port), MedClearHandler)
    print(f"MedClear is running at http://127.0.0.1:{port}")
    print(f"Login: {DEFAULT_USERNAME} / {DEFAULT_PASSWORD}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping MedClear.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
