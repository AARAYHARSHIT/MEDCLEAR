const iconPaths = {
  pulse: '<path d="M3 12h4l2-7 4 14 2-7h6"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  "map-pin": '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  pin: '<path d="M12 17v5"/><path d="M5 7h14"/><path d="M7 7l2 10h6l2-10"/><path d="M9 3h6v4H9z"/>',
  "arrow-left": '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>',
  building: '<path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9h1"/><path d="M9 13h1"/><path d="M9 17h1"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  wallet: '<path d="M20 12V8H6a2 2 0 0 1 0-4h14v4"/><path d="M4 6v14h16v-4"/><path d="M18 12h4v4h-4a2 2 0 0 1 0-4Z"/>',
  sliders: '<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M2 14h4"/><path d="M10 8h4"/><path d="M18 16h4"/>',
  video: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L8 9.64a16 16 0 0 0 6.36 6.36l1.2-1.2a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.92Z"/>',
  siren: '<path d="M7 18v-6a5 5 0 0 1 10 0v6"/><path d="M5 21h14"/><path d="M12 2v3"/><path d="m4 4 2 2"/><path d="m20 4-2 2"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  rupee: '<path d="M6 3h12"/><path d="M6 8h12"/><path d="M6 13h6a5 5 0 0 0 0-10"/><path d="m6 13 8 8"/>',
  comment: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>'
};

const state = {
  activeRoute: "home",
  lastResults: [],
  selectedHospital: null,
  detailTab: "treatments"
};

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

document.addEventListener("DOMContentLoaded", () => {
  hydrateIcons();
  wireLogin();
  wireNavigation();
  wireForms();
  setupRevealObserver();

  if (localStorage.getItem("medclear_token")) {
    showApp();
  }
});

function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((node) => {
    const name = node.dataset.icon;
    node.innerHTML = icon(name);
  });
}

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.pulse}</svg>`;
}

function wireLogin() {
  const form = document.querySelector("#login-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const error = document.querySelector("#login-error");
    button.disabled = true;
    error.textContent = "";
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("medclear_token", data.token);
      showApp();
    } catch (errorText) {
      error.textContent = errorText.message;
    } finally {
      button.disabled = false;
    }
  });

  document.querySelector("#logout-button").addEventListener("click", () => {
    localStorage.removeItem("medclear_token");
    document.querySelector("#app").hidden = true;
    document.querySelector("#login-screen").hidden = false;
  });
}

function showApp() {
  document.querySelector("#login-screen").hidden = true;
  document.querySelector("#app").hidden = false;
  routeTo("home");
  loadHome();
  loadCompare();
  loadEmergency();
}

function wireNavigation() {
  document.body.addEventListener("click", (event) => {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) {
      event.preventDefault();
      routeTo(routeButton.dataset.route);
    }

    if (event.target.closest("[data-close-modal]")) {
      closeConsultModal();
    }
  });
}

function routeTo(route) {
  state.activeRoute = route;
  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
  const page = document.querySelector(`#${route}-page`);
  if (page) page.classList.add("active");
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === route);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function wireForms() {
  document.querySelector("#hero-search").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    document.querySelector("#compare-form [name=treatment]").value = formData.get("treatment") || "";
    const location = formData.get("location") || "";
    if (/^\d{6}$/.test(location.trim())) {
      document.querySelector("#compare-form [name=pincode]").value = location.trim();
      document.querySelector("#compare-form [name=location]").value = "";
    } else {
      document.querySelector("#compare-form [name=location]").value = location;
    }
    routeTo("compare");
    loadCompare();
  });

  document.querySelectorAll(".popular-row button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("#compare-form [name=treatment]").value = button.dataset.treatment;
      document.querySelector("#compare-form [name=location]").value = "";
      document.querySelector("#compare-form [name=pincode]").value = "";
      routeTo("compare");
      loadCompare();
    });
  });

  document.querySelector("#compare-form").addEventListener("submit", (event) => {
    event.preventDefault();
    loadCompare();
  });

  document.querySelector("#emergency-form").addEventListener("submit", (event) => {
    event.preventDefault();
    loadEmergency();
  });

  document.querySelector("#consult-form").addEventListener("submit", submitConsultation);
  wireProcedurePicker();
}

function wireProcedurePicker() {
  const picker = document.querySelector("[data-procedure-picker]");
  const input = document.querySelector("#procedure-input");
  const menu = document.querySelector("#procedure-menu");
  if (!picker || !input || !menu) return;

  menu.addEventListener("click", (event) => {
    const option = event.target.closest("[data-procedure-option]");
    if (!option) return;
    input.value = option.dataset.procedureOption;
    menu.querySelectorAll("[data-procedure-option]").forEach((button) => {
      button.classList.toggle("selected", button === option);
    });
  });
}

function setupRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

async function loadHome() {
  const data = await getJSON("/api/hospitals?sort=clarity&limit=6");
  document.querySelector("#stat-hospitals").textContent = `${Math.max(data.count, 12)}+`;
  document.querySelector("#top-hospitals").innerHTML = data.results.map(renderHospitalCard).join("");
  hydrateIcons(document.querySelector("#top-hospitals"));
  document.querySelectorAll("[data-detail]").forEach((button) => {
    button.addEventListener("click", () => openHospitalDetail(button.dataset.detail));
  });
}

async function loadCompare() {
  const form = document.querySelector("#compare-form");
  const params = new URLSearchParams(new FormData(form));
  const response = await getJSON(`/api/hospitals?${params.toString()}`);
  state.lastResults = response.results;
  renderLocationStatus(response);
  const results = document.querySelector("#compare-results");
  if (!response.results.length) {
    results.innerHTML = emptyState("No hospitals found", "Try a broader treatment term or remove the location filter.");
    return;
  }
  results.innerHTML = `
    <div class="section-heading">
      <div>
        <p class="eyebrow">${response.count} hospitals found</p>
        <h2>Compare results</h2>
      </div>
    </div>
    ${response.results.map(renderResultCard).join("")}
  `;
  hydrateIcons(results);
  results.querySelectorAll("[data-detail]").forEach((button) => {
    button.addEventListener("click", () => openHospitalDetail(button.dataset.detail));
  });
}

function renderLocationStatus(response) {
  const target = document.querySelector("#location-status");
  const location = response.location;
  if (!location) {
    target.innerHTML = `<span class="status-pill">${icon("shield")} Showing all curated hospitals with live image API fallback.</span>`;
    return;
  }
  const source = location.source || "local data";
  const label = location.pincode
    ? `${location.pincode} - ${location.city || "India"}`
    : location.label || `${location.city || "Selected location"}`;
  target.innerHTML = `
    <span class="status-pill">
      ${icon("map-pin")}
      Search anchored at ${escapeHTML(label)} via ${escapeHTML(source)}
    </span>
  `;
}

async function loadEmergency() {
  const form = document.querySelector("#emergency-form");
  const params = new URLSearchParams(new FormData(form));
  const response = await getJSON(`/api/emergency?${params.toString()}`);
  const content = document.querySelector("#emergency-content");
  content.innerHTML = `
    <div class="contact-grid">
      ${response.contacts.map(renderContactCard).join("")}
    </div>
    <div class="section-heading" style="margin-top: 44px;">
      <div>
        <p class="eyebrow danger">${response.count} ER facilities</p>
        <h2>Hospitals with emergency rooms</h2>
      </div>
    </div>
    <div class="er-grid">
      ${response.results.map(renderERCard).join("")}
    </div>
  `;
  hydrateIcons(content);
  content.querySelectorAll("[data-detail]").forEach((button) => {
    button.addEventListener("click", () => openHospitalDetail(button.dataset.detail));
  });
}

async function openHospitalDetail(id) {
  const hospital = await getJSON(`/api/hospitals/${encodeURIComponent(id)}`);
  state.selectedHospital = hospital;
  state.detailTab = "treatments";
  renderHospitalDetail();
  routeTo("detail");
}

function renderHospitalDetail() {
  const hospital = state.selectedHospital;
  if (!hospital) return;

  const detail = document.querySelector("#hospital-detail");
  detail.innerHTML = `
    <section>
      <button class="text-button back-button" data-route="compare" type="button">${icon("arrow-left")} Back to compare</button>
      <article class="detail-hero">
        <img src="${hospital.image}" alt="${escapeHTML(hospital.name)} exterior" loading="lazy" />
        <div class="detail-main">
          <div class="detail-title-row">
            <div>
              <h1>${escapeHTML(hospital.name)}</h1>
              <div class="meta-line">
                <span>${icon("map-pin")} ${escapeHTML(hospital.address)}</span>
                <span>${icon("phone")} ${escapeHTML(hospital.phone)}</span>
                <span>${icon("star")} ${hospital.rating} (${hospital.reviews_count} reviews)</span>
              </div>
            </div>
            <div class="score-pill"><strong>${hospital.clarity}</strong><small>Clarity</small></div>
          </div>
          <div class="badge-row">
            <span class="badge">${escapeHTML(hospital.type)}</span>
            ${hospital.er_available ? '<span class="badge warn">ER available</span>' : ""}
            <span class="badge neutral">${icon("clock")} ~${hospital.er_wait_min} min ER wait</span>
          </div>
          <div class="badge-row">
            ${hospital.specialties.map((item) => `<span class="badge neutral">${escapeHTML(item)}</span>`).join("")}
          </div>
          <div class="badge-row">
            ${hospital.insurance.map((item) => `<span class="badge">${escapeHTML(item)}</span>`).join("")}
          </div>
          <div class="tabs">
            <button class="${state.detailTab === "treatments" ? "active" : ""}" data-tab="treatments">${icon("rupee")} Treatments (${hospital.treatments.length})</button>
            <button class="${state.detailTab === "reviews" ? "active" : ""}" data-tab="reviews">${icon("comment")} Reviews (${hospital.reviews.length})</button>
          </div>
          <div id="detail-tab-content"></div>
        </div>
      </article>
    </section>
    <aside class="side-stack">
      <article class="side-card centered">
        <p class="eyebrow">${icon("video")} Virtual consultation</p>
        <h3>Speak with a care coordinator</h3>
        <p>Discuss procedure options and get a cost estimate before committing.</p>
        <button class="primary-button" type="button" data-open-consult="${hospital.id}">${icon("video")} Book free consultation</button>
      </article>
      <article class="side-card danger">
        <h3>${icon("phone")} Emergency line</h3>
        <strong style="font-size: 1.9rem;">${escapeHTML(hospital.emergency_phone)}</strong>
        <p>Use 108 or 112 for immediate medical emergencies in India.</p>
      </article>
      <article class="side-card">
        <h3>${icon("shield")} Quick stats</h3>
        <div class="quick-stat"><span>Average rating</span><strong>${hospital.rating}</strong></div>
        <div class="quick-stat"><span>Total reviews</span><strong>${hospital.reviews_count}</strong></div>
        <div class="quick-stat"><span>Clarity score</span><strong>${hospital.clarity}</strong></div>
        <div class="quick-stat"><span>Treatments listed</span><strong>${hospital.treatments.length}</strong></div>
      </article>
    </aside>
  `;
  hydrateIcons(detail);
  renderDetailTab();
  detail.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.detailTab = button.dataset.tab;
      renderHospitalDetail();
    });
  });
  detail.querySelector("[data-open-consult]").addEventListener("click", () => openConsultModal(hospital));
}

function renderDetailTab() {
  const container = document.querySelector("#detail-tab-content");
  const hospital = state.selectedHospital;
  if (state.detailTab === "reviews") {
    container.innerHTML = `
      <div class="review-list">
        ${renderReviewSummary(hospital)}
        ${hospital.reviews.map(renderReviewCard).join("")}
      </div>
    `;
    hydrateIcons(container);
    return;
  }
  container.innerHTML = `<div class="treatment-list">${hospital.treatments.map(renderTreatmentCard).join("")}</div>`;
  hydrateIcons(container);
}

function renderTreatmentCard(treatment) {
  const total = treatment.breakdown.reduce((sum, item) => sum + item.value, 0) || treatment.total;
  return `
    <article class="treatment-card">
      <p class="eyebrow">${icon("rupee")} ${escapeHTML(treatment.category)}</p>
      <h3>${escapeHTML(treatment.name)}</h3>
      <div class="cost-bar" aria-label="Cost breakdown for ${escapeHTML(treatment.name)}">
        ${treatment.breakdown
          .map((item) => `<span style="width:${(item.value / total) * 100}%; background:${item.color};"></span>`)
          .join("")}
      </div>
      <div class="breakdown">
        ${treatment.breakdown
          .map(
            (item) => `
              <div class="breakdown-row">
                <span><span class="dot" style="background:${item.color};"></span>${escapeHTML(item.label)}</span>
                <strong>${currency.format(item.value)}</strong>
              </div>
            `
          )
          .join("")}
      </div>
      <div class="total-row">
        <strong>Total estimated cost</strong>
        <strong>${currency.format(treatment.total)}</strong>
      </div>
      <div class="breakdown" style="margin-top: 12px;">
        <div class="breakdown-row"><span>Insurance negotiated rate</span><strong>${currency.format(treatment.insurance_rate)}</strong></div>
        <div class="breakdown-row"><span>Estimated out-of-pocket</span><strong>${currency.format(treatment.out_of_pocket)}</strong></div>
      </div>
    </article>
  `;
}

function renderReviewSummary(hospital) {
  const avg = hospital.reviews.reduce((sum, item) => sum + item.rating, 0) / Math.max(hospital.reviews.length, 1);
  const recommend = Math.round((hospital.reviews.filter((item) => item.recommended).length / Math.max(hospital.reviews.length, 1)) * 100);
  return `
    <article class="review-card">
      <p class="eyebrow">${icon("comment")} Review summary</p>
      <div class="stats-band" style="border:0; background:transparent;">
        <article><strong>${avg.toFixed(1)}</strong><span>${stars(Math.round(avg))}</span><span>${hospital.reviews.length} reviews</span></article>
        <article><strong>${hospital.clarity}</strong><span>Clarity</span><span>out of 100</span></article>
        <article><strong>${recommend}%</strong><span>Recommend</span><span>patient signal</span></article>
      </div>
    </article>
  `;
}

function renderReviewCard(review) {
  return `
    <article class="review-card">
      <div class="card-title-row">
        <h3>${escapeHTML(review.name)}</h3>
        <span>${escapeHTML(review.date)}</span>
      </div>
      <p class="rating">${stars(review.rating)}</p>
      <h3>${escapeHTML(review.title)}</h3>
      <p>${escapeHTML(review.body)}</p>
      <div class="meta-line">
        <span>${icon("rupee")} Actual cost paid: ${currency.format(review.actual_cost)}</span>
        ${review.recommended ? `<span>${icon("shield")} Recommends</span>` : ""}
      </div>
    </article>
  `;
}

function renderHospitalCard(hospital) {
  return `
    <article class="hospital-card">
      <img src="${hospital.image}" alt="${escapeHTML(hospital.name)} exterior" loading="lazy" />
      <div class="hospital-card-body">
        <div class="card-title-row">
          <h3>${escapeHTML(hospital.name)}</h3>
          <span class="verified">${icon("shield")} Verified</span>
        </div>
        <div class="meta-line">
          <span>${icon("map-pin")} ${escapeHTML(hospital.city)}, ${escapeHTML(hospital.state)}</span>
          <span class="rating">${icon("star")} ${hospital.rating}</span>
        </div>
        <div class="badge-row">
          <span class="badge">${escapeHTML(hospital.type)}</span>
          ${hospital.er_available ? '<span class="badge warn">ER available</span>' : ""}
        </div>
        <div class="card-footer">
          <button class="text-button" type="button" data-detail="${hospital.id}">View details ${icon("arrow-right")}</button>
          <span class="score-pill"><strong>${hospital.clarity}</strong><small>Clarity</small></span>
        </div>
      </div>
    </article>
  `;
}

function renderResultCard(hospital) {
  const distance = hospital.distance_km === null ? "" : `<span>${icon("map-pin")} ${hospital.distance_km} km away</span>`;
  const bestCost = Math.min(...hospital.treatments.map((item) => item.total));
  return `
    <article class="result-card">
      <img src="${hospital.image}" alt="${escapeHTML(hospital.name)} exterior" loading="lazy" />
      <div class="result-body">
        <div class="card-title-row">
          <h3>${escapeHTML(hospital.name)}</h3>
          <span class="verified">${icon("shield")} Verified</span>
        </div>
        <div class="meta-line">
          <span>${icon("map-pin")} ${escapeHTML(hospital.address)}</span>
          ${distance}
          <span class="rating">${icon("star")} ${hospital.rating} (${hospital.reviews_count})</span>
        </div>
        <div class="badge-row">
          <span class="badge">${escapeHTML(hospital.type)}</span>
          ${hospital.er_available ? `<span class="badge warn">ER available</span>` : ""}
          <span class="badge neutral">${icon("clock")} ~${hospital.er_wait_min} min wait</span>
          <span class="badge neutral">${icon("rupee")} From ${currency.format(bestCost)}</span>
        </div>
        <p>${escapeHTML(hospital.match_reason)}</p>
      </div>
      <div class="result-actions">
        <span class="score-pill"><strong>${hospital.clarity}</strong><small>Clarity</small></span>
        <button class="primary-button" type="button" data-detail="${hospital.id}">Details</button>
      </div>
    </article>
  `;
}

function renderContactCard(contact) {
  return `
    <article class="contact-card">
      <p class="eyebrow danger">${icon("phone")} ${escapeHTML(contact.label)}</p>
      <strong>${escapeHTML(contact.number)}</strong>
      <p>${escapeHTML(contact.detail)}</p>
    </article>
  `;
}

function renderERCard(hospital) {
  const distance = hospital.distance_km === null ? "" : `<span>${hospital.distance_km} km away</span>`;
  return `
    <article class="er-card">
      <div class="card-title-row">
        <h3>${escapeHTML(hospital.name)}</h3>
        <span class="badge warn">ER open</span>
      </div>
      <p>${icon("map-pin")} ${escapeHTML(hospital.address)}</p>
      <div class="meta-line">
        <span>${icon("clock")} Estimated wait: ~${hospital.er_wait_min} minutes</span>
        ${distance}
      </div>
      <div class="card-footer">
        <a class="danger-button" href="tel:108">${icon("phone")} 108</a>
        <button class="text-button" type="button" data-detail="${hospital.id}">Details ${icon("arrow-right")}</button>
      </div>
    </article>
  `;
}

function openConsultModal(hospital) {
  const modal = document.querySelector("#consult-modal");
  const form = document.querySelector("#consult-form");
  form.reset();
  form.hospital_id.value = hospital.id;
  setProcedureOptions(form, hospital);
  document.querySelector("#modal-title").textContent = "Book virtual consultation";
  document.querySelector("#modal-subtitle").textContent = hospital.name;
  document.querySelector("#consult-message").textContent = "";
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function setProcedureOptions(form, hospital) {
  const procedureMenu = document.querySelector("#procedure-menu");
  const procedureInput = form.elements.procedure;
  const treatmentNames = (hospital.treatments || []).map((treatment) => treatment.name);
  const options = treatmentNames.length
    ? [...treatmentNames, "Other / Not Listed"]
    : ["General Consultation", "MRI Scan", "Angioplasty", "C-Section Delivery", "Other / Not Listed"];
  procedureMenu.innerHTML = options
    .map(
      (name, index) => `
        <button class="procedure-option ${index === 0 ? "selected" : ""}" type="button" role="option" data-procedure-option="${escapeHTML(name)}">
          ${escapeHTML(name)}
        </button>
      `
    )
    .join("");
  procedureInput.value = treatmentNames[0] || "General Consultation";
}

function closeConsultModal() {
  document.querySelector("#consult-modal").hidden = true;
  document.body.style.overflow = "";
}

async function submitConsultation(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector("button");
  const message = document.querySelector("#consult-message");
  button.disabled = true;
    message.textContent = "";
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      if (!payload.procedure) payload.procedure = "General Consultation";
      const response = await fetch("/api/consultations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("medclear_token") || ""}`
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Could not save consultation");
    message.textContent = `${data.message} Confirmation: ${data.code}`;
    form.reset();
    if (state.selectedHospital) setProcedureOptions(form, state.selectedHospital);
  } catch (error) {
    message.textContent = error.message;
  } finally {
    button.disabled = false;
  }
}

async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${url}`);
  return response.json();
}

function stars(count) {
  return "★★★★★".slice(0, count) + "☆☆☆☆☆".slice(count);
}

function emptyState(title, body) {
  return `
    <article class="side-card centered">
      <p class="eyebrow">${icon("search")} ${escapeHTML(title)}</p>
      <p>${escapeHTML(body)}</p>
    </article>
  `;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
