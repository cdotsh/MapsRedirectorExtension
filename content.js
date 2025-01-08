(() => {

  // Add a link overlay for embedded Google Maps Views
  function addMapViewOverlay(element) {
    // Use search query for Google Maps
    const searchQuery = new URLSearchParams(window.location.search).get('q');

    if (!searchQuery) return;
  
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
  
    // Create the link overlay
    const overlay = document.createElement('div');
    overlay.className = 'maps-overlay';
    overlay.title = "Click to view on Google Maps";

    overlay.addEventListener('click', () => {
      window.open(mapsUrl, '_blank');
    });

    element.style.position = 'relative';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.cursor = 'pointer';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
    overlay.style.zIndex = '10';

    element.appendChild(overlay);
  }

  // Add url to the Google Maps image
  function addImageUrl(element) {
    // Use href from 'Address' link
    const addressLink = Array.from(document.querySelectorAll('a')).find(a =>
      a.href.includes('/maps/place/')
    );

    if (addressLink) {
      const mapsUrl = addressLink.href;
      // The g-img element is wrapped in a link element without href
      element.parentElement.setAttribute("href", mapsUrl);
      element.parentElement.setAttribute("target", "_blank");
      element.parentElement.classList.add("maps-overlay");
    }

  }

  // Create MutationObserver for DOM changes
  function observeDOM() {
    const observer = new MutationObserver(() => {
      const mapImage = Array.from(document.querySelectorAll('g-img')).find(img =>
        img.id == "lu_map"
      );
      const mapDiv = Array.from(document.querySelectorAll('div')).find(div =>
        div.ariaLabel == "Map"
      );

      if (mapImage) {
        addImageUrl(mapImage);
        observer.disconnect();
      } else if (mapDiv) {
        addMapViewOverlay(mapDiv);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  observeDOM();
})();