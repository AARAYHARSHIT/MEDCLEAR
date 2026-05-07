# MedClear

MedClear is a design-thinking hospital transparency website with a zero-dependency Node backend and responsive frontend. It includes login, treatment and PIN-code based hospital search, comparison cards, hospital detail pages, cost breakdowns, virtual consultation booking, and an emergency finder.

## Default Login

- User ID: `medclear`
- Password: `care2026`

You can override these with environment variables:

```powershell
$env:MEDCLEAR_USERNAME="your-user"
$env:MEDCLEAR_PASSWORD="your-password"
```

## Run Locally

This project uses a zero-dependency Node.js server. No `npm install` is needed.

```powershell
node server.mjs
```

Open:

```text
http://127.0.0.1:8000
```

If port `8000` is busy:

```powershell
$env:PORT="8010"
node server.mjs
```

Then open `http://127.0.0.1:8010`.

Optional Python reference server:

```powershell
python app.py
```

## Main Features

1. **Login and responsive dashboard**
   - Clean login screen.
   - Desktop and mobile navigation.
   - Hover effects, glass panels, smooth scrolling, animated section reveals.

2. **Hospital search and comparison**
   - Search by treatment, city, and six-digit PIN code.
   - Example: `MRI Scan` + `248001`.
   - If only a treatment is entered, search defaults near Dehradun as requested.
   - Sort by recommended, nearest, clarity score, rating, or lowest treatment cost.

3. **Hospital detail, cost clarity, and emergency**
   - Hospital detail pages include clarity score, specialties, insurance, reviews, and treatment cost breakdowns.
   - Consultation form saves requests to `data/consultations.jsonl`.
   - Emergency page lists 108, 112, 104, and nearest ER-capable hospitals.

## Public API Integrations

The app works offline from the curated local dataset, and also integrates free public APIs when internet is available:

- Postal PIN Code API: `https://api.postalpincode.in/pincode/{PINCODE}`
- OpenStreetMap Nominatim Search API: `https://nominatim.openstreetmap.org/search`
- Wikimedia Commons MediaWiki API for public hospital image discovery

Live API calls have local fallbacks so classroom demos do not break when the network is slow. To disable live image lookups:

```powershell
$env:MEDCLEAR_DISABLE_LIVE_IMAGES="1"
node server.mjs
```

## Useful Demo Searches

- Treatment: `MRI Scan`, PIN code: `248001`
- Treatment: `Angioplasty`, City: `Dehradun`
- Treatment only: `MRI`
- City only: `New Delhi`
- Emergency location: `Dehradun`

## Project Structure

```text
app.py                  Python backend and API server
server.mjs              Zero-dependency Node backend and API server
data/hospitals.json     Curated hospital and treatment dataset
static/index.html       Frontend markup
static/styles.css       Responsive UI styling
static/app.js           Frontend behavior
```

## Notes

This is a design-thinking prototype. Costs, wait times, and reviews are demo data and should be replaced with verified hospital data before real-world use.