import { menuItems, menuCategories } from "../data/menu.js";
import { getLocale, onLocaleChange, t } from "./i18n.js";

const menuTabs = document.getElementById("menu-tabs");
const menuGrid = document.getElementById("menu-grid");
const menuEmpty = document.getElementById("menu-empty");
const modal = document.getElementById("menu-modal");
const modalClose = document.getElementById("menu-modal-close");
const modalImage = document.getElementById("menu-modal-image");
const modalTitle = document.getElementById("menu-modal-title");
const modalDescription = document.getElementById("menu-modal-description");
const modalAllergens = document.getElementById("menu-modal-allergens");
const modalPrice = document.getElementById("menu-modal-price");

let activeCategory = "all";
let lastFocusedElement = null;

const getText = (localMap) => localMap[getLocale()] || localMap.en;

const renderTabs = () => {
  if (!menuTabs) return;
  menuTabs.innerHTML = "";

  menuCategories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-tab";
    if (category.key === activeCategory) {
      button.classList.add("active");
    }
    button.textContent = getText(category.label);
    button.addEventListener("click", () => {
      activeCategory = category.key;
      renderTabs();
      renderMenuGrid();
    });
    menuTabs.appendChild(button);
  });
};

const openModal = (item) => {
  lastFocusedElement = document.activeElement;

  modalImage.src = item.image;
  modalImage.alt = getText(item.title);
  modalTitle.textContent = getText(item.title);
  modalDescription.textContent = getText(item.description);
  modalAllergens.innerHTML = "";
  item.allergens.forEach((allergen) => {
    const pill = document.createElement("span");
    pill.className = "menu-allergen";
    pill.textContent = allergen;
    modalAllergens.appendChild(pill);
  });
  modalPrice.textContent = `${t("menu.modal.price")}: €${item.price}`;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modalClose.focus();
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
};

const getFilteredItems = () => {
  if (activeCategory === "all") {
    return menuItems;
  }
  return menuItems.filter((item) => item.category === activeCategory);
};

const renderMenuGrid = () => {
  if (!menuGrid || !menuEmpty) return;
  const filtered = getFilteredItems();
  menuGrid.innerHTML = "";

  if (!filtered.length) {
    menuEmpty.classList.remove("hidden");
    menuEmpty.textContent = t("menu.empty");
    return;
  }

  menuEmpty.classList.add("hidden");

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "menu-card";
    card.innerHTML = `
      <button type="button" class="menu-card-button w-full text-left" aria-label="${getText(item.title)}">
        <div class="menu-card-image-wrap">
          <img src="${item.image}" alt="${getText(item.title)}" class="h-48 w-full object-cover" loading="lazy" />
          <span class="menu-plus" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </span>
        </div>
        <div class="p-4">
          <div class="flex items-center justify-between gap-2">
            <h3 class="font-heading text-2xl text-sage">${getText(item.title)}</h3>
            <span class="rounded-full bg-sage/10 px-3 py-1 text-sm font-semibold text-sage">€${item.price}</span>
          </div>
          <p class="mt-2 line-clamp-2 text-sm text-slate-700">${getText(item.description)}</p>
        </div>
      </button>
    `;

    card.querySelector(".menu-card-button")?.addEventListener("click", () => openModal(item));
    menuGrid.appendChild(card);
  });
};

const trapFocus = (event) => {
  if (event.key !== "Tab" || modal.classList.contains("hidden")) {
    return;
  }
  const focusable = modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
  if (!focusable.length) {
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
  trapFocus(event);
});

renderTabs();
renderMenuGrid();
onLocaleChange(() => {
  renderTabs();
  renderMenuGrid();
});
