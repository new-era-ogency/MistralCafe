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
if (!prefersReducedMotion && window.gsap) {
  window.gsap.from("main section", {
    opacity: 0,
    y: 32,
    duration: 0.9,
    ease: "power2.out",
    stagger: 0.1,
    clearProps: "opacity,transform",
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
