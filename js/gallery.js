const galleryGrid = document.getElementById("gallery-grid");

const galleryItems = Array.from({ length: 12 }).map((_, index) => {
  const id = index + 1;
  const width = id % 2 === 0 ? 900 : 700;
  const height = id % 3 === 0 ? 1100 : 850;
  const src = `https://picsum.photos/seed/mistral-gallery-${id}/${width}/${height}.webp`;
  return {
    src,
    srcset: `${src} 1x, https://picsum.photos/seed/mistral-gallery-${id}/${width * 2}/${height * 2}.webp 2x`,
    alt: `Mistral gallery image ${id}`,
  };
});

const renderGallery = () => {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = "";

  galleryItems.forEach((item) => {
    const wrapper = document.createElement("a");
    wrapper.href = item.src;
    wrapper.className = "masonry-item glightbox";
    wrapper.dataset.gallery = "mistral-gallery";
    wrapper.dataset.title = item.alt;

    wrapper.innerHTML = `
      <img src="${item.src}" srcset="${item.srcset}" alt="${item.alt}" loading="lazy" />
      <span class="expand-mark" aria-hidden="true">+</span>
    `;
    galleryGrid.appendChild(wrapper);
  });
};

renderGallery();

if (window.GLightbox) {
  window.GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    openEffect: "zoom",
    closeEffect: "fade",
  });
}
