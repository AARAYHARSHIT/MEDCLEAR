import { createServer } from "node:http";
import { readFile, appendFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(__dirname);
const staticDir = join(root, "static");
const dataDir = join(root, "data");
const hospitals = JSON.parse(await readFile(join(dataDir, "hospitals.json"), "utf8"));
const hospitalById = new Map(hospitals.map((hospital) => [hospital.id, hospital]));

const appName = "MedClear";
const username = process.env.MEDCLEAR_USERNAME || "medclear";
const password = process.env.MEDCLEAR_PASSWORD || "care2026";
const userAgent = "MedClearDesignThinking/1.0 (local student project)";
const imageCache = new Map();
const pincodeCache = new Map();
const locationCache = new Map();

const cityCoords = {
  dehradun: { lat: 30.3165, lon: 78.0322, city: "Dehradun", state: "Uttarakhand" },
  "new delhi": { lat: 28.6139, lon: 77.209, city: "New Delhi", state: "Delhi" },
  delhi: { lat: 28.6139, lon: 77.209, city: "New Delhi", state: "Delhi" },
  gurugram: { lat: 28.4595, lon: 77.0266, city: "Gurugram", state: "Haryana" },
  gurgaon: { lat: 28.4595, lon: 77.0266, city: "Gurugram", state: "Haryana" },
  mumbai: { lat: 19.076, lon: 72.8777, city: "Mumbai", state: "Maharashtra" },
  chennai: { lat: 13.0827, lon: 80.2707, city: "Chennai", state: "Tamil Nadu" },
  bengaluru: { lat: 12.9716, lon: 77.5946, city: "Bengaluru", state: "Karnataka" },
  bangalore: { lat: 12.9716, lon: 77.5946, city: "Bengaluru", state: "Karnataka" }
};

const pincodeCoords = {
  "248001": { lat: 30.3165, lon: 78.0322, city: "Dehradun", state: "Uttarakhand" },
  "248003": { lat: 30.3383, lon: 78.0574, city: "Dehradun", state: "Uttarakhand" },
  "248006": { lat: 30.2714, lon: 78.0184, city: "Dehradun", state: "Uttarakhand" },
  "248007": { lat: 30.3539, lon: 77.9673, city: "Dehradun", state: "Uttarakhand" },
  "248140": { lat: 30.1882, lon: 78.1875, city: "Jolly Grant", state: "Uttarakhand" },
  "110017": { lat: 28.5245, lon: 77.2066, city: "New Delhi", state: "Delhi" },
  "110029": { lat: 28.5672, lon: 77.21, city: "New Delhi", state: "Delhi" },
  "122001": { lat: 28.4595, lon: 77.0266, city: "Gurugram", state: "Haryana" },
  "400053": { lat: 19.1307, lon: 72.8331, city: "Mumbai", state: "Maharashtra" },
  "560017": { lat: 12.958, lon: 77.665, city: "Bengaluru", state: "Karnataka" },
  "600006": { lat: 13.0632, lon: 80.2514, city: "Chennai", state: "Tamil Nadu" }
};

const stopWords = new Set([
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
  "treatment"
]);

const treatmentSynonyms = {
  mri: ["mri", "scan", "radiology", "diagnostic", "imaging"],
  heart: ["heart", "cardiac", "cardiology", "angioplasty", "bypass"],
  cardiac: ["heart", "cardiac", "cardiology", "angioplasty", "bypass"],
  cancer: ["cancer", "oncology", "chemotherapy", "radiation"],
  kidney: ["kidney", "renal", "nephrology", "dialysis"],
  liver: ["liver", "transplant", "hepatology"],
  spine: ["spine", "lumbar", "orthopaedics", "neurosurgery"],
  knee: ["knee", "orthopaedics", "replacement", "joint"],
  child: ["child", "pediatric", "paediatric"],
  delivery: ["delivery", "maternity", "obstetrics", "c-section"],
  csection: ["delivery", "maternity", "obstetrics", "c-section", "cesarean"],
  eye: ["eye", "cataract", "ophthalmology"]
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

export const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);
    if (request.method === "OPTIONS") return sendOptions(response);
    if (url.pathname.startsWith("/api/")) {
      return await handleApi(request, response, url);
    }
    return await serveStatic(response, url.pathname);
  } catch (error) {
    console.error(error);
    sendJSON(response, { ok: false, message: "Internal server error" }, 500);
  }
});

const port = Number(process.env.PORT || 8000);
server.listen(port, () => {
  console.log(`MedClear is running at http://127.0.0.1:${port}`);
  console.log(`Login: ${username} / ${password}`);
});

async function handleApi(request, response, url) {
  if (request.method === "GET" && url.pathname === "/api/health") {
    return sendJSON(response, { ok: true, app: appName, time: Date.now() });
  }

  if (request.method === "POST" && url.pathname === "/api/login") {
    const payload = await readJSONBody(request);
    if ((payload.username || "").trim() === username && (payload.password || "").trim() === password) {
      return sendJSON(response, {
        ok: true,
        token: `demo-${randomBytes(16).toString("hex")}`,
        user: { name: "Design Team", username }
      });
    }
    return sendJSON(response, { ok: false, message: "Invalid username or password." }, 401);
  }

  if (request.method === "GET" && url.pathname === "/api/hospitals") {
    return sendJSON(response, await searchHospitals(url.searchParams));
  }

  if (request.method === "GET" && url.pathname.startsWith("/api/hospitals/")) {
    const id = decodeURIComponent(url.pathname.split("/").at(-1) || "");
    const hospital = hospitalById.get(id);
    if (!hospital) return sendJSON(response, { message: "Hospital not found" }, 404);
    return sendJSON(response, publicHospital(hospital));
  }

  if (request.method === "GET" && url.pathname === "/api/emergency") {
    return sendJSON(response, await emergencyHospitals(url.searchParams));
  }

  if (request.method === "GET" && url.pathname === "/api/pincode") {
    const pin = (url.searchParams.get("value") || "").replace(/\D/g, "");
    const info = pin ? await apiGetPincode(pin) : null;
    if (!info) return sendJSON(response, { ok: false, message: "Enter a valid six digit PIN code." }, 400);
    return sendJSON(response, { ok: true, location: info });
  }

  if (request.method === "GET" && url.pathname === "/api/location-suggest") {
    const query = url.searchParams.get("q") || "";
    const norm = normalize(query);
    const suggestions = [];
    if (norm) {
      for (const city of Object.values(cityCoords)) {
        const label = `${city.city}, ${city.state}`;
        if (normalize(label).includes(norm)) suggestions.push({ ...city, label, source: "local-city-cache" });
      }
      if (/^\d{6}$/.test(query.trim())) {
        const pin = await apiGetPincode(query.trim());
        if (pin) suggestions.unshift({ ...pin, label: `${pin.city}, ${pin.state}` });
      }
    }
    return sendJSON(response, { suggestions: suggestions.slice(0, 6) });
  }

  if (request.method === "GET" && url.pathname === "/api/image") {
    const id = url.searchParams.get("id") || "hero";
    const hospital =
      hospitalById.get(id) || {
        id: "hero",
        name: "Modern hospital care",
        city: "India",
        image_search: "hospital building India"
      };
   if (hospital.image) {
    response.writeHead(302, {
        Location: hospital.image
    });
    return response.end();
}

const imageUrl = await commonsImageUrl(hospital);

if (imageUrl) {
    response.writeHead(302, {
        Location: imageUrl
    });
    return response.end();
}
    const body = placeholderSVG(hospital);
    response.writeHead(200, {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Length": Buffer.byteLength(body),
      "Cache-Control": "public, max-age=600"
    });
    return response.end(body);
  }

  if (request.method === "POST" && url.pathname === "/api/consultations") {
    const payload = await readJSONBody(request);
    if (!String(payload.procedure || "").trim()) payload.procedure = "General Consultation";
    const missing = ["hospital_id", "name", "email", "phone"].filter((key) => !String(payload[key] || "").trim());
    if (missing.length) return sendJSON(response, { ok: false, message: `Missing fields: ${missing.join(", ")}` }, 400);
    const hospital = hospitalById.get(String(payload.hospital_id));
    if (!hospital) return sendJSON(response, { ok: false, message: "Hospital not found." }, 404);
    const code = `MC-${randomBytes(3).toString("hex").toUpperCase()}`;
    const record = {
      code,
      created_at: new Date().toISOString(),
      hospital_id: hospital.id,
      hospital_name: hospital.name,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      procedure: payload.procedure,
      preferred_time: payload.preferred_time || "",
      notes: payload.notes || ""
    };
    await appendFile(join(dataDir, "consultations.jsonl"), `${JSON.stringify(record)}\n`, "utf8");
    return sendJSON(response, { ok: true, code, message: `Consultation request saved for ${hospital.name}.` }, 201);
  }

  if (request.method === "GET" && url.pathname === "/api/sources") {
    return sendJSON(response, {
      sources: [
        { name: "Postal PIN Code API", url: "https://www.postalpincode.in/Api-Details", usage: "PIN code metadata lookup" },
        { name: "OpenStreetMap Nominatim", url: "https://nominatim.org/release-docs/latest/api/Search/", usage: "City and PIN geocoding" },
        { name: "Wikimedia Commons MediaWiki API", url: "https://www.mediawiki.org/wiki/API:Imageinfo", usage: "Hospital image discovery" }
      ]
    });
  }

  return sendJSON(response, { message: "Not found" }, 404);
}

async function searchHospitals(params) {
  const treatment = params.get("treatment") || "";
  const locationText = params.get("location") || "";
  const pincode = params.get("pincode") || "";
  const hospitalType = params.get("type") || "";
  const sort = params.get("sort") || "recommended";
  const limit = Number(params.get("limit") || 0);
  const requireEr = ["1", "true", "yes"].includes((params.get("er") || "").toLowerCase());
  const base = await resolveLocation(locationText, pincode, treatment);

  let rows = hospitals
    .map((hospital) => ({ hospital, score: treatmentScore(hospital, treatment) }))
    .filter(({ hospital, score }) => {
      if (treatment && score === 0) return false;
      if (hospitalType && hospitalType !== "all" && !normalize(hospital.type).includes(normalize(hospitalType))) return false;
      if (requireEr && !hospital.er_available) return false;
      return true;
    })
    .map(({ hospital, score }) => {
      const publicRow = publicHospital(hospital, base);
      publicRow.match_score = score;
      publicRow.match_reason = buildMatchReason(publicRow, treatment, base);
      return publicRow;
    })
    .filter((hospital) => {
      if (!base || hospital.distance_km === null) return true;
      if (base.implicit && hospital.distance_km > 80) return false;
      if ((locationText || pincode) && hospital.distance_km > 140) return false;
      return true;
    });

  if (sort === "distance" && base) {
    rows.sort((a, b) => nullLast(a.distance_km) - nullLast(b.distance_km) || b.clarity - a.clarity);
  } else if (sort === "rating") {
    rows.sort((a, b) => b.rating - a.rating || nullLast(a.distance_km) - nullLast(b.distance_km));
  } else if (sort === "cost") {
    rows.sort((a, b) => minTreatmentCost(a) - minTreatmentCost(b) || nullLast(a.distance_km) - nullLast(b.distance_km));
  } else if (sort === "clarity") {
    rows.sort((a, b) => b.clarity - a.clarity || nullLast(a.distance_km) - nullLast(b.distance_km));
  } else {
    rows.sort(
      (a, b) =>
        b.match_score - a.match_score ||
        nullLast(a.distance_km) - nullLast(b.distance_km) ||
        b.clarity - a.clarity ||
        b.rating - a.rating
    );
  }

  if (limit > 0) rows = rows.slice(0, limit);

  return {
    count: rows.length,
    results: rows,
    location: base,
    query: { treatment, location: locationText, pincode, sort },
    sources: [
      "api.postalpincode.in for PIN code metadata",
      "nominatim.openstreetmap.org for location geocoding",
      "commons.wikimedia.org for public hospital images",
      "local curated dataset for fast offline fallback"
    ]
  };
}

async function emergencyHospitals(params) {
  const locationText = params.get("location") || "Dehradun";
  const pincode = params.get("pincode") || "";
  const base = (await resolveLocation(locationText, pincode, "")) || cityCoords.dehradun;
  const rows = hospitals
    .filter((hospital) => hospital.er_available)
    .map((hospital) => publicHospital(hospital, base))
    .sort((a, b) => nullLast(a.distance_km) - nullLast(b.distance_km) || a.er_wait_min - b.er_wait_min)
    .slice(0, 12);
  return {
    location: base,
    count: rows.length,
    results: rows,
    contacts: [
      { label: "Ambulance", number: "108", detail: "India emergency ambulance" },
      { label: "National Emergency", number: "112", detail: "Police, fire, medical" },
      { label: "Health Helpline", number: "104", detail: "State health guidance" },
      { label: "Child Helpline", number: "1098", detail: "Child emergency support" }
    ]
  };
}

async function resolveLocation(location, pincode, treatment) {
  let pin = String(pincode || "").replace(/\D/g, "");
  if (!pin && location) {
    const match = String(location).match(/\b(\d{6})\b/);
    if (match) pin = match[1];
  }
  if (pin) {
    const info = await apiGetPincode(pin);
    if (info) return info;
  }
  if (location) {
    const geo = await geocodeLocation(location);
    if (geo) return geo;
  }
  if (treatment) {
    return { ...cityCoords.dehradun, label: "Dehradun default", source: "default-near-dehradun", implicit: true };
  }
  return null;
}

async function apiGetPincode(pin) {
  if (!/^\d{6}$/.test(pin)) return null;
  if (pincodeCache.has(pin)) return pincodeCache.get(pin);
  const cached = pincodeCoords[pin] || {};
  const info = {
    pincode: pin,
    source: "local-cache",
    lat: cached.lat ?? null,
    lon: cached.lon ?? null,
    city: cached.city || "",
    state: cached.state || "",
    post_offices: []
  };

  try {
    const data = await fetchJSON(`https://api.postalpincode.in/pincode/${pin}`, 3000);
    if (data?.[0]?.Status?.toLowerCase() === "success") {
      const offices = data[0].PostOffice || [];
      const first = offices[0] || {};
      info.source = "api.postalpincode.in";
      info.city = first.District || info.city;
      info.state = first.State || info.state;
      info.post_offices = offices.slice(0, 8).map((office) => office.Name).filter(Boolean);
    }
  } catch {
    // Local cache keeps the demo responsive when public APIs are unavailable.
  }

  if (info.lat === null || info.lon === null) {
    const geo = await geocodeLocation(pin, `${pin}, India`);
    if (geo) {
      info.lat = geo.lat;
      info.lon = geo.lon;
      info.source = `${info.source} + nominatim`;
    }
  }

  pincodeCache.set(pin, info);
  return info;
}

async function geocodeLocation(location, forcedQuery = "") {
  const cleaned = normalize(location);
  if (!cleaned) return null;
  if (cityCoords[cleaned]) {
    const city = cityCoords[cleaned];
    return { ...city, label: `${city.city}, ${city.state}`, source: "local-city-cache" };
  }
  if (locationCache.has(cleaned)) return locationCache.get(cleaned);
  const query = forcedQuery || `${location}, India`;
  const apiUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=in&q=${encodeURIComponent(query)}`;
  try {
    const rows = await fetchJSON(apiUrl, 4000);
    if (rows?.length) {
      const row = rows[0];
      const result = {
        lat: Number(row.lat),
        lon: Number(row.lon),
        city: titleCase(location),
        state: "",
        label: row.display_name || titleCase(location),
        source: "nominatim.openstreetmap.org"
      };
      locationCache.set(cleaned, result);
      return result;
    }
  } catch {
    // Local data handles demo flow.
  }
  locationCache.set(cleaned, null);
  return null;
}

function publicHospital(hospital, base = null) {
  const row = JSON.parse(JSON.stringify(hospital));
  delete row.image_search;
  row.image = `/api/image?id=${encodeURIComponent(hospital.id)}`;
  row.distance_km = null;
  if (base && hospital.lat && hospital.lon) {
    row.distance_km = Number(haversineKm(base.lat, base.lon, hospital.lat, hospital.lon).toFixed(1));
  }
  return row;
}

function treatmentScore(hospital, query) {
  if (!query) return 20;
  const terms = normalize(query).split(" ").filter((term) => term && !stopWords.has(term));
  if (!terms.length) return 20;
  const expanded = new Set();
  for (const term of terms) {
    expanded.add(term);
    expanded.add(compact(term));
    for (const item of treatmentSynonyms[term] || []) expanded.add(item);
    for (const item of treatmentSynonyms[compact(term)] || []) expanded.add(item);
  }
  const parts = [hospital.name, hospital.type, ...(hospital.specialties || [])];
  for (const treatment of hospital.treatments || []) {
    parts.push(treatment.name, treatment.category, ...(treatment.tags || []));
  }
  const haystack = normalize(parts.join(" "));
  const haystackCompact = compact(haystack);
  const directHits = terms.filter((term) => haystack.includes(term) || haystackCompact.includes(compact(term))).length;
  const expandedHits = [...expanded].filter((term) => term && haystack.includes(term)).length;
  if (directHits === terms.length) return 100;
  if (directHits || expandedHits) return Math.min(95, 48 + directHits * 18 + expandedHits * 8);
  return 0;
}

function buildMatchReason(hospital, treatment, base) {
  const bits = [];
  if (treatment) bits.push(`Matches ${treatment}`);
  if (base && hospital.distance_km !== null) bits.push(`${hospital.distance_km} km from ${base.city || base.label || "selected location"}`);
  if (hospital.er_available) bits.push("ER available");
  return bits.join(" - ") || "High transparency score";
}

async function commonsImageUrl(hospital) {
  if (imageCache.has(hospital.id)) return imageCache.get(hospital.id);
  if (process.env.MEDCLEAR_DISABLE_LIVE_IMAGES === "1") {
    imageCache.set(hospital.id, null);
    return null;
  }
  const query = hospital.image_search || `${hospital.name} hospital building India`;
  const apiUrl =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=1" +
    `&gsrsearch=${encodeURIComponent(query)}&prop=imageinfo&iiprop=url&iiurlwidth=900`;
  try {
    const data = await fetchJSON(apiUrl, 3000);
    const pages = data?.query?.pages || {};
    for (const page of Object.values(pages)) {
      const imageInfo = page.imageinfo || [];
      const imageUrl = imageInfo[0]?.thumburl || imageInfo[0]?.url;
      if (imageUrl) {
        imageCache.set(hospital.id, imageUrl);
        return imageUrl;
      }
    }
  } catch {
    // SVG fallback is rendered by this server.
  }
  imageCache.set(hospital.id, null);
  return null;
}

function placeholderSVG(hospital) {
  const title = hospital.name || "Hospital";
  const city = hospital.city || "India";
  const initials = normalize(title)
    .split(" ")
    .slice(0, 3)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "MC";
  const hue = simpleHash(hospital.id || title) % 360;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
  <defs>
    <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="hsl(${hue}, 54%, 38%)" offset="0"/>
      <stop stop-color="hsl(${(hue + 44) % 360}, 58%, 24%)" offset="0.55"/>
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
      <rect x="100" y="70" width="54" height="54" rx="10"/><rect x="178" y="70" width="54" height="54" rx="10"/>
      <rect x="100" y="150" width="54" height="54" rx="10"/><rect x="178" y="150" width="54" height="54" rx="10"/>
      <rect x="390" y="130" width="64" height="58" rx="12"/><rect x="490" y="130" width="64" height="58" rx="12"/>
      <rect x="390" y="225" width="64" height="58" rx="12"/><rect x="490" y="225" width="64" height="58" rx="12"/>
      <rect x="735" y="195" width="50" height="48" rx="10"/><rect x="810" y="195" width="50" height="48" rx="10"/>
    </g>
    <rect x="486" y="345" width="80" height="125" rx="12" fill="#0d4654"/>
    <rect x="515" y="368" width="20" height="102" rx="8" fill="#ffffff" opacity=".65"/>
  </g>
  <g transform="translate(76 76)">
    <rect width="132" height="132" rx="32" fill="#ffffff" opacity=".88"/>
    <text x="66" y="79" fill="#0f6e7b" text-anchor="middle" font-size="42" font-family="Arial, sans-serif" font-weight="700">${escapeHTML(initials)}</text>
  </g>
  <text x="78" y="670" fill="#ffffff" font-size="42" font-family="Arial, sans-serif" font-weight="700">${escapeHTML(title)}</text>
  <text x="80" y="716" fill="#d8f4f2" font-size="27" font-family="Arial, sans-serif">${escapeHTML(city)}</text>
</svg>`;
}

async function serveStatic(response, rawPath) {
  const route = rawPath === "/" ? "/index.html" : decodeURIComponent(rawPath);
  let target = resolve(join(staticDir, route.replace(/^\/+/, "")));
  const staticRoot = resolve(staticDir);
  if (!target.startsWith(staticRoot) || !existsSync(target)) {
    target = join(staticDir, "index.html");
  }
  const body = await readFile(target);
  response.writeHead(200, {
    "Content-Type": mimeTypes[extname(target).toLowerCase()] || "application/octet-stream",
    "Content-Length": body.length,
    "Cache-Control": "no-cache"
  });
  response.end(body);
}

async function readJSONBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

function sendOptions(response) {
  response.writeHead(204, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "content-type, authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  });
  response.end();
}

function sendJSON(response, payload, status = 200) {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store"
  });
  response.end(body);
}

async function fetchJSON(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": userAgent, Accept: "application/json" }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function compact(text) {
  return normalize(text).replaceAll(" ", "");
}

function titleCase(text) {
  return normalize(text)
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const radius = 6371;
  const dLat = radians(lat2 - lat1);
  const dLon = radians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * radius * Math.asin(Math.sqrt(a));
}

function radians(value) {
  return (value * Math.PI) / 180;
}

function minTreatmentCost(hospital) {
  return Math.min(...(hospital.treatments || []).map((treatment) => Number(treatment.total || 99999999)));
}

function nullLast(value) {
  return value === null || value === undefined ? 999999 : value;
}

function simpleHash(text) {
  let hash = 0;
  for (const char of String(text)) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
