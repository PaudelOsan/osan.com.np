document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const navbar = document.querySelector(".navbar");
  const themeBtn = document.getElementById("themeBtn");
  const themeIcon = document.getElementById("themeIcon");
  const cursorGlow = document.getElementById("cursorGlow");
  const canvas = document.getElementById("bgCanvas");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

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

  /* Light / dark mode */
  function applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-mode");

      if (themeIcon) {
        themeIcon.textContent = "☾";
      }

      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-mode");

      if (themeIcon) {
        themeIcon.textContent = "☀";
      }

      localStorage.setItem("theme", "dark");
    }
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight = document.body.classList.contains("light-mode");
      applyTheme(isLight ? "dark" : "light");
    });
  }

  /* Mouse tracking */
  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  /* Smooth cursor glow */
  function animateCursorGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    if (cursorGlow) {
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }

    requestAnimationFrame(animateCursorGlow);
  }

  animateCursorGlow();

  window.addEventListener("mouseleave", () => {
    if (cursorGlow) {
      cursorGlow.style.opacity = "0";
    }
  });

  window.addEventListener("mouseenter", () => {
    if (cursorGlow) {
      cursorGlow.style.opacity = "0.9";
    }
  });

  /* Hero 3D parallax follows mouse */
  const artStage = document.querySelector(".art-stage");

  function animateArtStage() {
    if (artStage) {
      const moveX = (mouseX / window.innerWidth - 0.5) * 18;
      const moveY = (mouseY / window.innerHeight - 0.5) * 18;

      artStage.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    }

    requestAnimationFrame(animateArtStage);
  }

  animateArtStage();

  /* Navbar shadow on scroll */
  window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* Project filter */
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

  /* Scroll reveal */
  const revealItems = document.querySelectorAll(
    ".section-heading, .section-copy, .about-card, .skill-card, .project-card, .timeline-card, .cert-card, .contact-card, .tech-strip"
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal");
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

  /* Active navbar link */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSection = "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
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

  /* Softer card tilt */
  const tiltCards = document.querySelectorAll(".tilt-card");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y - rect.height / 2) / rect.height) * -2.2;
      const rotateY = ((x - rect.width / 2) / rect.width) * 2.2;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-2px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* Softer magnetic buttons */
  const magneticItems = document.querySelectorAll(".magnetic");

  magneticItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      item.style.transform = `translate(${x * 0.025}px, ${y * 0.035}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "";
    });
  });

  /* Animated particle background with mouse reaction */
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];

      const count = Math.min(100, Math.floor(window.innerWidth / 16));

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          size: Math.random() * 1.8 + 0.6,
          opacity: Math.random() * 0.45 + 0.12,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        const dxMouse = particle.x - mouseX;
        const dyMouse = particle.y - mouseY;
        const mouseDistance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (mouseDistance < 140) {
          particle.x += dxMouse * 0.004;
          particle.y += dyMouse * 0.004;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
        }

        const isLight = document.body.classList.contains("light-mode");

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(37, 99, 235, ${particle.opacity})`
          : `rgba(110, 231, 255, ${particle.opacity})`;
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 115) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);

            ctx.strokeStyle = isLight
              ? `rgba(37, 99, 235, ${0.08 * (1 - distance / 115)})`
              : `rgba(110, 231, 255, ${0.08 * (1 - distance / 115)})`;

            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(drawParticles);
    }

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });

    resizeCanvas();
    createParticles();
    drawParticles();
  }
});
