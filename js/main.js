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
