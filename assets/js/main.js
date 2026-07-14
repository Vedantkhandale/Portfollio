const content = window.portfolioContent || {};

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && typeof value === "string") {
    element.textContent = value;
  }
}

function setLink(selector, label, href) {
  const element = document.querySelector(selector);
  if (!element) {
    return;
  }

  if (typeof label === "string") {
    element.textContent = label;
  }

  if (typeof href === "string" && href.length > 0) {
    element.setAttribute("href", href);
  }
}

function renderBadges() {
  const container = document.getElementById("heroBadges");
  const badges = content.hero?.badges || [];

  if (!container) {
    return;
  }

  container.innerHTML = badges
    .map(
      (badge) =>
        `<span><i class="bi ${badge.icon || "bi-star"}"></i>${badge.text || ""}</span>`
    )
    .join("");
}

function renderSocials() {
  const container = document.getElementById("heroSocials");
  const socials = content.site?.socials || [];

  if (!container) {
    return;
  }

  container.innerHTML = socials
    .map((social) => {
      const url = social.url || "#";
      const shouldOpenNewTab = /^https?:\/\//.test(url);

      return `
        <a class="social-link" href="${url}" ${shouldOpenNewTab ? 'target="_blank" rel="noreferrer"' : ""}>
          <i class="bi ${social.icon || "bi-link-45deg"}"></i>
          <span>${social.label || "Link"}</span>
        </a>
      `;
    })
    .join("");
}

function renderHeroMetrics() {
  const container = document.getElementById("heroMetrics");
  const metrics = content.hero?.metrics || [];

  if (!container) {
    return;
  }

  container.innerHTML = metrics
    .map(
      (metric, index) => `
        <div class="metric-card ${index % 2 === 1 ? "accent" : ""}">
          <span class="metric-value counter" data-target="${Number(metric.value) || 0}" data-suffix="${metric.suffix || ""}">0</span>
          <span class="metric-label">${metric.label || ""}</span>
        </div>
      `
    )
    .join("");
}

function renderMarquee() {
  const container = document.getElementById("marqueeTrack");
  const items = content.marquee || [];

  if (!container) {
    return;
  }

  const loopItems = [...items, ...items];
  container.innerHTML = loopItems.map((item) => `<span>${item}</span>`).join("");
}

function renderAboutCards() {
  const container = document.getElementById("aboutCards");
  const cards = content.about?.cards || [];

  if (!container) {
    return;
  }

  container.innerHTML = cards
    .map(
      (card) => `
        <div class="col-md-6">
          <article class="info-card reveal">
            <p class="card-number">${card.number || ""}</p>
            <h3>${card.title || ""}</h3>
            <p>${card.description || ""}</p>
          </article>
        </div>
      `
    )
    .join("");
}

function renderServices() {
  const container = document.getElementById("servicesGrid");
  const services = content.services?.items || [];

  if (!container) {
    return;
  }

  container.innerHTML = services
    .map(
      (service) => `
        <div class="col-lg-4">
          <article class="service-card reveal">
            <span class="service-icon"><i class="bi ${service.icon || "bi-grid"}"></i></span>
            <h3>${service.title || ""}</h3>
            <p>${service.description || ""}</p>
            <ul class="list-unstyled service-list">
              ${(service.points || []).map((point) => `<li>${point}</li>`).join("")}
            </ul>
          </article>
        </div>
      `
    )
    .join("");
}

function renderProjectFilters() {
  const container = document.getElementById("projectFilters");
  const filters = content.projects?.filters || [];

  if (!container) {
    return;
  }

  container.innerHTML = filters
    .map(
      (filter, index) => `
        <button class="filter-btn ${index === 0 ? "is-active" : ""}" type="button" data-filter="${filter.value || "all"}">
          ${filter.label || "All"}
        </button>
      `
    )
    .join("");
}

function renderProjects() {
  const container = document.getElementById("projectGrid");
  const projects = content.projects?.items || [];

  if (!container) {
    return;
  }

  container.innerHTML = projects
    .map(
      (project) => `
        <div class="col-lg-4 col-md-6 project-item reveal" data-category="${project.category || "all"}">
          <article class="project-card">
            <div class="project-visual ${project.gradient || "gradient-one"}"></div>
            <div class="project-meta">
              <span class="project-tag">${project.tag || ""}</span>
              <h3>${project.title || ""}</h3>
              <p>${project.description || ""}</p>
              <a href="${project.linkHref || "#contact"}">${project.linkLabel || "Learn more"} <i class="bi bi-arrow-up-right"></i></a>
            </div>
          </article>
        </div>
      `
    )
    .join("");
}

function renderSkills() {
  const container = document.getElementById("skillCloud");
  const items = content.stack?.items || [];

  if (!container) {
    return;
  }

  container.innerHTML = items.map((item) => `<span>${item}</span>`).join("");
}

function renderProcess() {
  const container = document.getElementById("processTimeline");
  const steps = content.process?.steps || [];

  if (!container) {
    return;
  }

  container.innerHTML = steps
    .map(
      (step) => `
        <article class="timeline-step reveal">
          <span class="timeline-index">${step.index || ""}</span>
          <div>
            <h3>${step.title || ""}</h3>
            <p>${step.description || ""}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderTestimonialMetrics() {
  const container = document.getElementById("testimonialMetrics");
  const items = content.testimonial?.metrics || [];

  if (!container) {
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <div class="mini-metric">
          <span class="counter" data-target="${Number(item.value) || 0}" data-suffix="${item.suffix || ""}">0</span>
          <small>${item.label || ""}</small>
        </div>
      `
    )
    .join("");
}

function renderContactPoints() {
  const container = document.getElementById("contactPoints");
  const points = content.contact?.points || [];

  if (!container) {
    return;
  }

  container.innerHTML = points
    .map(
      (point) => `
        <span><i class="bi ${point.icon || "bi-check2-circle"}"></i>${point.text || ""}</span>
      `
    )
    .join("");
}

function populateSelect(selector, placeholder, items) {
  const element = document.querySelector(selector);
  if (!element) {
    return;
  }

  const options = [`<option value="">${placeholder || "Select"}</option>`];

  items.forEach((item) => {
    options.push(`<option>${item}</option>`);
  });

  element.innerHTML = options.join("");
}

function renderContent() {
  const site = content.site || {};
  const hero = content.hero || {};
  const about = content.about || {};
  const services = content.services || {};
  const projects = content.projects || {};
  const stack = content.stack || {};
  const process = content.process || {};
  const testimonial = content.testimonial || {};
  const contact = content.contact || {};
  const nav = content.nav || {};

  document.title = `${site.fullName || "Your Name"} | ${site.titleSuffix || "Portfolio Studio"}`;

  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag && site.description) {
    descriptionTag.setAttribute("content", site.description);
  }

  setText("#brandMark", site.shortName || "YN");
  setText("#brandText", site.fullName || "Your Name");
  setLink("#navCta", nav.ctaLabel || "Book a project", nav.ctaHref || "#contact");

  setText("#heroKicker", hero.kicker || "");
  setText("#heroTitle", hero.title || "");
  setText("#heroText", hero.description || "");
  setLink("#heroPrimaryCta", hero.primaryCtaLabel || "See featured work", hero.primaryCtaHref || "#projects");
  setLink("#heroSecondaryCta", hero.secondaryCtaLabel || "Start a project", hero.secondaryCtaHref || "#contact");
  setText("#heroPanelLabel", hero.panelLabel || "");
  setText("#heroPanelEdition", hero.panelEdition || "");
  setText("#heroStackText", hero.stackText || "");

  const previewCards = hero.previewCards || [];
  setText("#previewOneLabel", previewCards[0]?.label || "");
  setText("#previewOneTitle", previewCards[0]?.title || "");
  setText("#previewTwoLabel", previewCards[1]?.label || "");
  setText("#previewTwoTitle", previewCards[1]?.title || "");
  setText("#previewThreeLabel", previewCards[2]?.label || "");
  setText("#previewThreeTitle", previewCards[2]?.title || "");

  setText("#aboutKicker", about.kicker || "");
  setText("#aboutTitle", about.title || "");
  setText("#aboutText", about.description || "");
  setText("#aboutSignatureName", about.signatureName || "");
  setText("#aboutSignatureRole", about.signatureRole || "");

  setText("#servicesKicker", services.kicker || "");
  setText("#servicesTitle", services.title || "");

  setText("#projectsKicker", projects.kicker || "");
  setText("#projectsTitle", projects.title || "");

  setText("#stackKicker", stack.kicker || "");
  setText("#stackTitle", stack.title || "");

  setText("#processKicker", process.kicker || "");
  setText("#processTitle", process.title || "");

  setText("#testimonialQuote", testimonial.quote || "");
  setText("#testimonialAuthor", testimonial.author || "");
  setText("#testimonialRole", testimonial.role || "");

  setText("#contactKicker", contact.kicker || "");
  setText("#contactTitle", contact.title || "");
  setText("#contactText", contact.description || "");
  setText("#footerText", site.footerText || "");
  setText("#footerOwner", site.fullName || "Your Name");

  const currentYear = document.getElementById("currentYear");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const submitButton = document.getElementById("submitButton");
  if (submitButton) {
    submitButton.textContent = contact.submitLabel || "Send project inquiry";
    submitButton.dataset.defaultLabel = contact.submitLabel || "Send project inquiry";
    submitButton.dataset.loadingLabel = contact.loadingLabel || "Sending...";
  }

  populateSelect("#service", contact.servicePlaceholder, contact.serviceOptions || []);
  populateSelect("#budget", contact.budgetPlaceholder, contact.budgetOptions || []);

  renderBadges();
  renderSocials();
  renderHeroMetrics();
  renderMarquee();
  renderAboutCards();
  renderServices();
  renderProjectFilters();
  renderProjects();
  renderSkills();
  renderProcess();
  renderTestimonialMetrics();
  renderContactPoints();
}

function updateNavbarState() {
  const navElement = document.querySelector(".navbar");
  if (!navElement) {
    return;
  }

  navElement.classList.toggle("navbar-scrolled", window.scrollY > 24);
}

function initializeRevealObserver() {
  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
}

function animateCounter(element) {
  const target = Number(element.dataset.target || 0);
  const suffix = element.dataset.suffix || "";
  const duration = 1200;
  const startTime = performance.now();

  function step(timestamp) {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentValue = Math.floor(progress * target);
    element.textContent = `${currentValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }

    element.textContent = `${target}${suffix}`;
  }

  requestAnimationFrame(step);
}

function initializeCounterObserver() {
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.6
    }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

function initializeMessageCount() {
  const messageField = document.getElementById("message");
  const messageCount = document.getElementById("messageCount");

  if (!messageField || !messageCount) {
    return;
  }

  const syncMessageCount = () => {
    messageCount.textContent = `${messageField.value.length} / 1000`;
  };

  syncMessageCount();
  messageField.addEventListener("input", syncMessageCount);
}

function initializeProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter || "all";

      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      projectItems.forEach((project) => {
        const category = project.dataset.category || "";
        const shouldShow = selectedFilter === "all" || selectedFilter === category;
        project.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

function renderStatus(message, type) {
  const formStatus = document.getElementById("formStatus");
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;
  formStatus.className = `form-status is-visible ${type === "success" ? "is-success" : "is-error"}`;
}

async function refreshSubmissionCount() {
  const submissionCountElement = document.querySelector("[data-submission-count]");
  if (!submissionCountElement) {
    return;
  }

  try {
    const response = await fetch("/api/health");
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    submissionCountElement.textContent = data.submissions;
  } catch {
    submissionCountElement.textContent = "0";
  }
}

function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");
  const submitButton = document.getElementById("submitButton");
  const messageCount = document.getElementById("messageCount");

  if (!contactForm || !submitButton) {
    return;
  }

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      renderStatus("Please complete the required fields first.", "error");
      return;
    }

    submitButton.classList.add("is-submitting");
    submitButton.textContent = submitButton.dataset.loadingLabel || "Sending...";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your inquiry.");
      }

      contactForm.reset();
      if (messageCount) {
        messageCount.textContent = "0 / 1000";
      }
      renderStatus(result.message, "success");

      const submissionCountElement = document.querySelector("[data-submission-count]");
      if (submissionCountElement && typeof result.submissions === "number") {
        submissionCountElement.textContent = result.submissions;
      }
    } catch (error) {
      renderStatus(error.message, "error");
    } finally {
      submitButton.classList.remove("is-submitting");
      submitButton.textContent = submitButton.dataset.defaultLabel || "Send project inquiry";
    }
  });
}

function initializePage() {
  renderContent();
  updateNavbarState();
  initializeRevealObserver();
  initializeCounterObserver();
  initializeMessageCount();
  initializeProjectFilters();
  initializeContactForm();
  refreshSubmissionCount();
  window.addEventListener("scroll", updateNavbarState);
}

initializePage();
