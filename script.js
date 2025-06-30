// main.js
let animated = false;

  window.addEventListener("scroll", () => {
    const section = document.getElementById("skills");
    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;

    if (!animated && sectionTop < triggerPoint) {
      document.querySelectorAll(".progress-bar").forEach(bar => {
        const width = bar.getAttribute("data-width");
        bar.style.setProperty('--target-width', width);
        bar.style.animation = `growBar 2s ease forwards`;
      });

      document.querySelectorAll(".percentage").forEach(el => {
        let count = 0;
        const target = +el.getAttribute("data-target");

        const interval = setInterval(() => {
          if (count < target) {
            count++;
            el.innerText = `${count}%`;
          } else {
            clearInterval(interval);
          }
        }, 20);
      });

      animated = true;
    }
  });

  document.getElementById("googleFormBtn").addEventListener("click", function () {
    window.open("https://forms.gle/ZyHXr7nrmBu63GGaA", "_blank");
  });
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const backToTopBtn = document.getElementById("backToTop");

  // Mobile menu toggle with null check
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");

      // Optional accessibility: toggle aria-expanded
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
    });

    // Close menu on link click
    const navLinks = mobileMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Back to Top Button visibility with scroll throttling
  if (backToTopBtn) {
    let scrollTimeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        backToTopBtn.style.display =
          window.pageYOffset > 300 ? "block" : "none";
      }, 100); // throttle for performance
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
