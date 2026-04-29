import { eventsData } from "../data/events.js";
import { getLocale, onLocaleChange, t } from "./i18n.js";

const eventsGrid = document.getElementById("events-grid");

const getText = (map) => map[getLocale()] || map.en;

const formatDate = (date) =>
  new Intl.DateTimeFormat(getLocale(), { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date));

const renderEvents = () => {
  if (!eventsGrid) return;
  eventsGrid.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureEvents = eventsData.filter((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });

  if (!futureEvents.length) {
    const empty = document.createElement("p");
    empty.className = "text-slate-600";
    empty.textContent = t("events.empty");
    eventsGrid.appendChild(empty);
    return;
  }

  futureEvents.forEach((event, index) => {
    const tilt = index % 2 === 0 ? "rotate(-3deg)" : "rotate(3deg)";
    const card = document.createElement("article");
    card.className = "polaroid-card";
    card.style.transform = tilt;

    card.innerHTML = `
      <img src="${event.image}" alt="${getText(event.title)}" class="h-56 w-full object-cover" loading="lazy" />
      <div class="bg-white px-4 pb-4 pt-3">
        <p class="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">${formatDate(event.date)}</p>
        <h3 class="mt-2 font-heading text-2xl text-sage">${getText(event.title)}</h3>
        <p class="event-caption mt-2 text-slate-700">${getText(event.caption)}</p>
        <a href="${event.image}" class="glightbox mt-4 inline-flex text-sm font-semibold text-sage underline" data-gallery="events-gallery" data-title="${getText(event.title)}">
          ${t("events.learnMore")}
        </a>
      </div>
    `;
    eventsGrid.appendChild(card);
  });

  if (window.GLightbox) {
    window.GLightbox({
      selector: "#events-grid .glightbox",
      touchNavigation: true,
      loop: true,
    });
  }
};

renderEvents();
onLocaleChange(renderEvents);
