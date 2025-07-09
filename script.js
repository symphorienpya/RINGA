// Theme toggle logic
const themeToggleBtn = document.getElementById("themeToggleBtn");
const htmlEl = document.documentElement;

function updateThemeToggle() {
  const theme = htmlEl.getAttribute("data-theme");
  if (theme === "dark") {
    themeToggleBtn.textContent = "Light Mode";
    themeToggleBtn.setAttribute("aria-pressed", "true");
  } else {
    themeToggleBtn.textContent = "Dark Mode";
    themeToggleBtn.setAttribute("aria-pressed", "false");
  }
}

themeToggleBtn.addEventListener("click", () => {
  if (htmlEl.getAttribute("data-theme") === "dark") {
    htmlEl.setAttribute("data-theme", "light");
  } else {
    htmlEl.setAttribute("data-theme", "dark");
  }
  updateThemeToggle();
});

updateThemeToggle();

// Hamburger menu toggle for small screens
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("primary-navigation");

hamburgerBtn.addEventListener("click", () => {
  const expanded =
    hamburgerBtn.getAttribute("aria-expanded") === "true" || false;
  hamburgerBtn.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("open");

  // Manage focus trap for menu when open
  if (!expanded) {
    navLinks.querySelector("a").focus();
    navLinks.setAttribute("tabindex", "0");
  } else {
    hamburgerBtn.focus();
    navLinks.setAttribute("tabindex", "-1");
  }
});

// Keyboard navigation for menu links
navLinks.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hamburgerBtn.click();
    hamburgerBtn.focus();
  }
});

// Search filtering logic
const searchInput = document.getElementById("searchInput");
const featureCards = document.querySelectorAll(".feature-card");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeCategory = "all";

function filterFeatures() {
  const searchTerm = searchInput.value.toLowerCase();

  featureCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const desc = card.querySelector("p").textContent.toLowerCase();
    const category = card.getAttribute("data-category");

    const matchesSearch =
      title.includes(searchTerm) || desc.includes(searchTerm);
    const matchesCategory =
      activeCategory === "all" || category === activeCategory;

    if (matchesSearch && matchesCategory) {
      card.style.display = "";
      card.setAttribute("aria-hidden", "false");
    } else {
      card.style.display = "none";
      card.setAttribute("aria-hidden", "true");
    }
  });
}

searchInput.addEventListener("input", () => {
  filterFeatures();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    activeCategory = btn.getAttribute("data-category");
    filterFeatures();
  });

  // Support keyboard with Enter and Space keys
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      btn.click();
    }
  });
});

// Newsletter form validation & submission simulation
const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");
const newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newsletterMessage.textContent = "";
  emailInput.setAttribute("aria-invalid", "false");

  const emailValue = emailInput.value.trim();

  // Simple email regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValue) {
    newsletterMessage.textContent = "Please enter your email address.";
    emailInput.setAttribute("aria-invalid", "true");
    emailInput.focus();
    return;
  } else if (!emailRegex.test(emailValue)) {
    newsletterMessage.textContent = "Please enter a valid email address.";
    emailInput.setAttribute("aria-invalid", "true");
    emailInput.focus();
    return;
  }

  newsletterMessage.style.color = "var(--accent-color)";
  newsletterMessage.textContent = "Thank you for subscribing!";
  emailInput.value = "";
});

// Back to top button
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  backToTopBtn.blur();
});

// Accessibility: visually-hidden class for labels if needed
const style = document.createElement("style");
style.textContent = `
    .visually-hidden {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0 0 0 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }
  `;
document.head.appendChild(style);

// Initial filter on page load
filterFeatures();
