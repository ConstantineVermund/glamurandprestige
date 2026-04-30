const BGPSite = (() => {
  const services = [
    {
      id: "mens-signature-cut",
      category: "men",
      name: "Men's Signature Cut",
      price: 55,
      duration: "45 min",
      level: "Classic",
      desc: "A precise tailored haircut built around face shape, hair density, lifestyle and daily styling habits.",
      includes: ["Consultation", "Shampoo", "Precision cut", "Neck cleanup", "Blow-dry styling", "Product finish"]
    },
    {
      id: "executive-grooming",
      category: "men",
      name: "Executive Grooming",
      price: 82,
      duration: "70 min",
      level: "Premium",
      desc: "A polished boardroom-ready service for men who need a clean silhouette, controlled texture and sharp finishing.",
      includes: ["Consultation", "Haircut", "Scalp refresh", "Beard tidy", "Hot towel", "Premium styling"]
    },
    {
      id: "skin-fade",
      category: "men",
      name: "Skin Fade",
      price: 60,
      duration: "55 min",
      level: "Sharp",
      desc: "A clean gradient fade with controlled weight, balanced top shape and detailed edge work.",
      includes: ["Fade mapping", "Clipper work", "Scissor blend", "Line cleanup", "Neck shave", "Finish"]
    },
    {
      id: "beard-sculpt",
      category: "men",
      name: "Beard Sculpt",
      price: 38,
      duration: "35 min",
      level: "Detail",
      desc: "Structured beard shaping that keeps the jawline strong, clean and symmetrical.",
      includes: ["Shape consultation", "Beard trim", "Cheek line", "Neck line", "Hot towel", "Oil finish"]
    },
    {
      id: "royal-shave",
      category: "men",
      name: "Royal Hot Towel Shave",
      price: 48,
      duration: "40 min",
      level: "Luxury",
      desc: "Traditional razor shave with warm towel preparation and calming post-shave care.",
      includes: ["Skin prep", "Hot towel", "Straight razor", "Aftershave balm", "Face towel", "Finish"]
    },
    {
      id: "mens-color-camo",
      category: "men",
      name: "Men's Color Camo",
      price: 70,
      duration: "50 min",
      level: "Color",
      desc: "Subtle grey blending for a natural, refreshed look without a hard artificial finish.",
      includes: ["Tone consult", "Grey blend", "Rinse", "Conditioner", "Blow-dry", "Style"]
    },
    {
      id: "womens-cut-blowout",
      category: "women",
      name: "Women's Cut & Blowout",
      price: 78,
      duration: "65 min",
      level: "Essential",
      desc: "A polished haircut with shape, movement and a salon-grade blowout finish.",
      includes: ["Consultation", "Shampoo", "Cut", "Face framing", "Blowout", "Finishing serum"]
    },
    {
      id: "luxury-layers",
      category: "women",
      name: "Luxury Layers",
      price: 95,
      duration: "85 min",
      level: "Signature",
      desc: "Soft dimensional layers designed for movement, volume and a premium camera-ready silhouette.",
      includes: ["Hair analysis", "Layer design", "Precision cut", "Texture work", "Blowout", "Finish"]
    },
    {
      id: "bob-precision",
      category: "women",
      name: "Precision Bob",
      price: 92,
      duration: "80 min",
      level: "Architectural",
      desc: "A sharp bob service focused on clean geometry, weight control and elegant finishing.",
      includes: ["Consultation", "Shape mapping", "Precision cut", "Weight balancing", "Smoothing", "Finish"]
    },
    {
      id: "glamour-blowout",
      category: "women",
      name: "Glamour Blowout",
      price: 58,
      duration: "45 min",
      level: "Styling",
      desc: "Smooth, voluminous styling for events, meetings, dates and high-polish everyday looks.",
      includes: ["Shampoo", "Heat protection", "Round brush styling", "Volume work", "Shine finish", "Hold spray"]
    },
    {
      id: "balayage-gloss",
      category: "women",
      name: "Balayage & Gloss",
      price: 185,
      duration: "150 min",
      level: "Color",
      desc: "Dimensional color with soft placement, controlled brightness and a glossy finish.",
      includes: ["Color consult", "Balayage placement", "Toner", "Gloss", "Treatment", "Blowout"]
    },
    {
      id: "keratin-smooth",
      category: "women",
      name: "Keratin Smooth Treatment",
      price: 165,
      duration: "130 min",
      level: "Care",
      desc: "A smoothing treatment built to reduce frizz, improve manageability and add shine.",
      includes: ["Hair check", "Clarifying wash", "Treatment application", "Heat seal", "Rinse", "Smooth finish"]
    }
  ];

  function navToggle() {
    const button = document.querySelector("[data-nav-toggle]");
    if (!button) return;
    button.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
      button.setAttribute("aria-expanded", document.body.classList.contains("nav-open") ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(link => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        button.setAttribute("aria-expanded", "false");
      });
    });
  }

  function serviceOptionText(service) {
    return `${service.name} - $${service.price} - ${service.duration}`;
  }

  function renderServices() {
    const list = document.querySelector("[data-service-list]");
    const select = document.querySelector("[data-service-select]");
    if (list) {
      list.innerHTML = services.map(service => `
        <article class="service-item" data-category="${service.category}" data-service="${service.id}">
          <div>
            <div class="service-title-row">
              <h3>${service.name}</h3>
              <span class="price">$${service.price}</span>
            </div>
            <div class="service-meta">
              <span class="pill">${service.category === "men" ? "Men" : "Women"}</span>
              <span class="pill">${service.duration}</span>
              <span class="pill">${service.level}</span>
            </div>
            <p>${service.desc}</p>
            <div class="service-includes">
              ${service.includes.map(item => `<span>${item}</span>`).join("")}
            </div>
          </div>
          <div class="service-cta">
            <a class="btn primary" href="booking.html?service=${service.id}">Book this service</a>
            <a class="btn" href="gallery.html">View work</a>
          </div>
        </article>
      `).join("");
    }

    if (select) {
      select.innerHTML = `<option value="">Choose a service</option>` + services.map(service => `
        <option value="${service.id}">${serviceOptionText(service)}</option>
      `).join("");

      const params = new URLSearchParams(window.location.search);
      const selected = params.get("service");
      if (selected && services.some(service => service.id === selected)) {
        select.value = selected;
      }
    }
  }

  function tabs() {
    const tabs = document.querySelectorAll("[data-service-tab]");
    if (!tabs.length) return;
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const category = tab.dataset.serviceTab;
        document.querySelectorAll("[data-category]").forEach(item => {
          item.classList.toggle("hidden", category !== "all" && item.dataset.category !== category);
        });
      });
    });
  }

  function galleryFilters() {
    const buttons = document.querySelectorAll("[data-gallery-filter]");
    const cards = document.querySelectorAll("[data-gallery-card]");
    if (!buttons.length) return;
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        const category = button.dataset.galleryFilter;
        cards.forEach(card => {
          card.classList.toggle("hide", category !== "all" && card.dataset.type !== category);
        });
      });
    });
  }

  function generateCode() {
    const now = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `BGP-${now}-${random}`;
  }

  function reservations() {
    try {
      return JSON.parse(localStorage.getItem("bgpReservations") || "[]");
    } catch {
      return [];
    }
  }

  function saveReservation(record) {
    const all = reservations();
    all.unshift(record);
    localStorage.setItem("bgpReservations", JSON.stringify(all));
  }

  function bookingForm() {
    const form = document.querySelector("[data-booking-form]");
    if (!form) return;

    const dateInput = form.querySelector("[name='date']");
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split("T")[0];
    }

    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const service = services.find(item => item.id === data.service);
      const code = generateCode();
      const record = {
        code,
        status: "Request received",
        createdAt: new Date().toISOString(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        serviceId: data.service,
        serviceName: service ? service.name : data.service,
        price: service ? service.price : "",
        date: data.date,
        time: data.time,
        stylist: data.stylist,
        notes: data.notes || ""
      };
      saveReservation(record);

      const success = document.querySelector("[data-booking-success]");
      if (success) {
        success.classList.add("show");
        success.innerHTML = `
          <strong>Your booking request has been created.</strong><br>
          Reservation code: <strong>${code}</strong><br>
          Save this code and use it on the Booking Status page. No payment was taken.
        `;
      }
      form.reset();
      const params = new URLSearchParams(window.location.search);
      const selected = params.get("service");
      const serviceSelect = document.querySelector("[data-service-select]");
      if (selected && serviceSelect) serviceSelect.value = selected;
    });
  }

  function statusForm() {
    const form = document.querySelector("[data-status-form]");
    const result = document.querySelector("[data-status-result]");
    if (!form || !result) return;

    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const code = (data.code || "").trim().toUpperCase();
      const email = (data.email || "").trim().toLowerCase();

      const found = reservations().find(item => {
        const codeMatch = item.code.toUpperCase() === code;
        const emailMatch = !email || (item.email || "").toLowerCase() === email;
        return codeMatch && emailMatch;
      });

      result.classList.add("show");
      if (!found) {
        result.innerHTML = `
          <div class="notice">
            <strong>No reservation found.</strong><br>
            Check the reservation code and email. This demo stores bookings in this browser only.
          </div>
        `;
        return;
      }

      result.innerHTML = `
        <div class="card">
          <h3>${found.serviceName}</h3>
          <div class="status-line"><strong>Status</strong><span>${found.status}</span></div>
          <div class="status-line"><strong>Code</strong><span>${found.code}</span></div>
          <div class="status-line"><strong>Guest</strong><span>${found.name}</span></div>
          <div class="status-line"><strong>Date</strong><span>${found.date} at ${found.time}</span></div>
          <div class="status-line"><strong>Stylist</strong><span>${found.stylist || "Any available expert"}</span></div>
          <div class="status-line"><strong>Price</strong><span>${found.price ? "$" + found.price : "To confirm"}</span></div>
          <div class="status-line"><strong>Notes</strong><span>${found.notes || "No notes added"}</span></div>
        </div>
      `;
    });
  }

  function init() {
    navToggle();
    renderServices();
    tabs();
    galleryFilters();
    bookingForm();
    statusForm();
  }

  return { init, services };
})();

document.addEventListener("DOMContentLoaded", BGPSite.init);