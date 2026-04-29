const siteHeader = document.getElementById("site-header");
const preloader = document.getElementById("preloader");
const navLinks = [...document.querySelectorAll(".nav-link[href^='#']")];
const observedSections = [...document.querySelectorAll("main section[id]")];

if (siteHeader) {
  const toggleHeaderState = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  toggleHeaderState();
  window.addEventListener("scroll", toggleHeaderState, { passive: true });
}

if (navLinks.length && observedSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const activeId = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.05 }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

window.addEventListener("load", () => {
  window.setTimeout(() => {
    preloader?.classList.add("is-hidden");
  }, 600);
});

// Safety fallback: never let preloader block viewport if scripts partially fail.
window.setTimeout(() => {
  preloader?.classList.add("is-hidden");
}, 2200);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion && window.Lenis) {
  const lenis = new window.Lenis({
    duration: 1.1,
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });

  const raf = (time) => {
    lenis.raf(time);
    window.requestAnimationFrame(raf);
  };
  window.requestAnimationFrame(raf);
}

if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  window.gsap.utils.toArray("main section").forEach((section) => {
    window.gsap.from(section, {
      opacity: 0,
      y: 36,
      duration: 0.95,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
      },
    });
  });
}

const heroImage = document.querySelector(".hero-bg img");
if (heroImage && !prefersReducedMotion) {
  const updateParallax = () => {
    const offset = Math.min(window.scrollY * 0.12, 42);
    heroImage.style.transform = `scale(1.12) translate3d(0, ${offset}px, 0)`;
  };
  updateParallax();
  window.addEventListener("scroll", updateParallax, { passive: true });
}

const storyParallax = document.querySelector("[data-parallax]");
if (storyParallax && !prefersReducedMotion) {
  const updateStoryParallax = () => {
    const section = document.getElementById("our-story");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const center = window.innerHeight * 0.5;
    const delta = (rect.top + rect.height / 2 - center) * 0.08;
    storyParallax.style.transform = `scale(1.12) translate3d(0, ${delta}px, 0)`;
  };
  updateStoryParallax();
  window.addEventListener("scroll", updateStoryParallax, { passive: true });
}

const magneticButtons = document.querySelectorAll(".magnetic-btn");
magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.12}px, ${y * 0.2}px)`;
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

if (window.Swiper) {
  new window.Swiper(".voices-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    speed: 700,
    pagination: {
      el: ".voices-swiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".voices-swiper .swiper-button-next",
      prevEl: ".voices-swiper .swiper-button-prev",
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 22 },
      1200: { slidesPerView: 3, spaceBetween: 26 },
    },
  });
}
