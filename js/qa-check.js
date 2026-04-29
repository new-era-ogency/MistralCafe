const check = (name, pass, details) => ({ name, pass, details });

const run = () => {
  const checks = [];
  const navCount = document.querySelectorAll(".nav-link").length;
  const i18nLocale = localStorage.getItem("mistral-locale") || "en";
  const lazyImages = [...document.querySelectorAll("img")].filter(
    (img) => img.getAttribute("loading") === "lazy"
  ).length;
  const totalImages = document.querySelectorAll("img").length;

  checks.push(check("Document language set", !!document.documentElement.lang, document.documentElement.lang));
  checks.push(check("Navigation links present", navCount >= 6, `${navCount} links`));
  checks.push(check("Locale persistence", ["en", "ua", "bg", "ru"].includes(i18nLocale), i18nLocale));
  checks.push(check("Preloader exists", !!document.getElementById("preloader"), "Element #preloader"));
  checks.push(
    check(
      "Lazy loading images",
      totalImages === 0 ? true : lazyImages / totalImages >= 0.8,
      `${lazyImages}/${totalImages} images lazy`
    )
  );
  checks.push(check("Menu modal exists", !!document.getElementById("menu-modal"), "Element #menu-modal"));
  checks.push(check("Contact form exists", !!document.getElementById("contact-form"), "Element #contact-form"));

  const metaDescription = document.querySelector("meta[name='description']")?.getAttribute("content") || "";
  checks.push(check("SEO description exists", metaDescription.length > 50, `${metaDescription.length} chars`));

  console.table(
    checks.map((item) => ({
      check: item.name,
      status: item.pass ? "PASS" : "WARN",
      details: item.details,
    }))
  );

  const passed = checks.filter((item) => item.pass).length;
  const summary = { passed, total: checks.length, ratio: `${passed}/${checks.length}` };
  console.info("[Mistral QA] Summary:", summary);
  return { checks, summary };
};

window.mistralQA = { run };
