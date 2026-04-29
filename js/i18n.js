const supportedLocales = ["en", "ua", "bg", "ru"];
const localeCache = new Map();
const seoByLocale = {
  en: {
    title: "Mistral Restaurant - Sveti Vlas | Fresh Cuisine by the Sea",
    description:
      "Mistral Restaurant in Sveti Vlas - fresh coastal cuisine, beachside atmosphere, and premium hospitality.",
  },
  ua: {
    title: "Mistral Restaurant - Свети Влас | Свіжа кухня біля моря",
    description:
      "Mistral у Светі Влас: свіжа прибережна кухня, морська атмосфера та преміальна гостинність.",
  },
  bg: {
    title: "Mistral Restaurant - Свети Влас | Свежа кухня край морето",
    description:
      "Mistral в Свети Влас: свежа крайбрежна кухня, морска атмосфера и премиум обслужване.",
  },
  ru: {
    title: "Mistral Restaurant - Свети Влас | Свежая кухня у моря",
    description:
      "Mistral в Свети Влас: свежая прибрежная кухня, морская атмосфера и премиальный сервис.",
  },
};

let currentLocale = localStorage.getItem("mistral-locale") || "en";
if (!supportedLocales.includes(currentLocale)) {
  currentLocale = "en";
}

const listeners = new Set();

const getByPath = (obj, key) => obj[key] ?? key;

const loadLocale = async (locale) => {
  if (localeCache.has(locale)) {
    return localeCache.get(locale);
  }
  const response = await fetch(`./data/locales/${locale}.json`);
  const dictionary = await response.json();
  localeCache.set(locale, dictionary);
  return dictionary;
};

const translateDOM = (dictionary) => {
  const nodes = document.querySelectorAll("[data-i18n]");
  nodes.forEach((node) => {
    const key = node.dataset.i18n;
    const text = getByPath(dictionary, key);
    node.textContent = text;
  });

  const placeholderNodes = document.querySelectorAll("[data-i18n-placeholder]");
  placeholderNodes.forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    node.setAttribute("placeholder", getByPath(dictionary, key));
  });

  const ariaNodes = document.querySelectorAll("[data-i18n-aria-label]");
  ariaNodes.forEach((node) => {
    const key = node.dataset.i18nAriaLabel;
    node.setAttribute("aria-label", getByPath(dictionary, key));
  });
};

const syncLanguageButtons = () => {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLocale);
  });
};

const syncSeo = (locale) => {
  const data = seoByLocale[locale] || seoByLocale.en;
  document.title = data.title;

  const descriptionMeta = document.querySelector("meta[name='description']");
  if (descriptionMeta) {
    descriptionMeta.setAttribute("content", data.description);
  }

  const ogTitle = document.querySelector("meta[property='og:title']");
  const ogDescription = document.querySelector("meta[property='og:description']");
  const twitterTitle = document.querySelector("meta[name='twitter:title']");
  const twitterDescription = document.querySelector("meta[name='twitter:description']");

  ogTitle?.setAttribute("content", data.title);
  ogDescription?.setAttribute("content", data.description);
  twitterTitle?.setAttribute("content", data.title);
  twitterDescription?.setAttribute("content", data.description);
};

export const t = (key) => {
  const dict = localeCache.get(currentLocale) || {};
  return getByPath(dict, key);
};

export const getLocale = () => currentLocale;

export const onLocaleChange = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

export const setLocale = async (locale) => {
  if (!supportedLocales.includes(locale)) {
    return;
  }
  currentLocale = locale;
  localStorage.setItem("mistral-locale", locale);
  document.documentElement.lang = locale;

  const dictionary = await loadLocale(locale);
  translateDOM(dictionary);
  syncLanguageButtons();
  syncSeo(locale);
  listeners.forEach((listener) => listener(locale, dictionary));
};

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => setLocale(button.dataset.lang));
});

setLocale(currentLocale);
