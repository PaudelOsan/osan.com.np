const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navbar = document.querySelector(".navbar");
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const hero = document.querySelector(".hero");
const heroGlow = document.getElementById("heroGlow");

/* Mobile menu */
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}

/* Dark / light mode */
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.textContent = "☀️";
} else {
  themeIcon.textContent = "🌙";
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    themeIcon.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

/* Project filter with animation */
const tabButtons = document.querySelectorAll(".tab-btn");
const projectCards = document.querySelectorAll(".project-card");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.type === filter;

      if (shouldShow) {
        card.style.display = "flex";
        card.classList.remove("hide");
        card.classList.add("show");
      } else {
        card.classList.add("hide");
        card.classList.remove("show");

        setTimeout(() => {
          card.style.display = "none";
        }, 220);
      }
    });
  });
});

/* Navbar shadow on scroll */
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* Scroll reveal animation */
const revealItems = document.querySelectorAll(
  ".section-heading, .about-grid, .skill-card, .project-card, .timeline-card, .cert-card, .contact-grid"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");

  if (index % 4 === 1) {
    item.classList.add("reveal-delay-1");
  }

  if (index % 4 === 2) {
    item.classList.add("reveal-delay-2");
  }

  if (index % 4 === 3) {
    item.classList.add("reveal-delay-3");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

/* Active navbar link while scrolling */
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

/* Hero mouse glow */
if (hero && heroGlow) {
  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    heroGlow.style.left = `${x}px`;
    heroGlow.style.top = `${y}px`;
  });

  hero.addEventListener("mouseleave", () => {
    heroGlow.style.left = "50%";
    heroGlow.style.top = "50%";
  });
}

/* Card tilt effect */
const tiltCards = document.querySelectorAll(".card, .profile-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* Magnetic button effect */
const magneticItems = document.querySelectorAll(".btn, .tab-btn, .contact-card a");

magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (event) => {
    const rect = item.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    item.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "";
  });
});
