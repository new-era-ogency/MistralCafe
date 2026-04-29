const galleryGrid = document.getElementById("gallery-grid");

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85",
    srcset:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85 1x, https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2400&q=85 2x",
    alt: "Luxury coastal restaurant terrace",
  },
  {
    src: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=85",
    srcset:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=85 1x, https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1800&q=85 2x",
    alt: "Seafood platter close-up",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85",
    srcset:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85 1x, https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=85 2x",
    alt: "Elegant dinner table setup",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
    srcset:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85 1x, https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85 2x",
    alt: "Premium restaurant interior",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1100&q=85",
    srcset:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1100&q=85 1x, https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=2200&q=85 2x",
    alt: "Fine dining food presentation",
  },
  {
    src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85",
    srcset:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85 1x, https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1800&q=85 2x",
    alt: "Dessert close-up at restaurant",
  },
];

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
