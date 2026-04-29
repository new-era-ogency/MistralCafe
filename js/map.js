function initMistralMap() {
  const mapMount = document.getElementById("mistral-map");
  if (!mapMount || !window.google || !window.google.maps) return;

  const location = { lat: 42.7083, lng: 27.7586 };

  const map = new window.google.maps.Map(mapMount, {
    center: location,
    zoom: 14,
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#f4efe8" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#6d7e70" }] },
      { featureType: "water", elementType: "geometry", stylers: [{ color: "#cfe2d3" }] },
      { featureType: "road", elementType: "geometry", stylers: [{ color: "#e4ddcf" }] },
      { featureType: "poi", elementType: "geometry", stylers: [{ color: "#e9e2d6" }] },
    ],
  });

  new window.google.maps.Marker({
    position: location,
    map,
    title: "Mistral Restaurant",
    icon: {
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 9,
      fillColor: "#7C9A7E",
      fillOpacity: 1,
      strokeColor: "#FAF8F5",
      strokeWeight: 2,
    },
  });
}

window.initMistralMap = initMistralMap;
