(() => {
  // List of translations for "Map" in european languages
  const mapTranslations = [
    "Map",         // English
    "Karte",       // German
    "Carte",       // French
    "Mapa",        // Spanish
    "Mappa",       // Italian
    "Kaart",       // Dutch
    "Harta",       // Romanian
    "Mapa",        // Polish
    "Térkép",      // Hungarian
    "Карта",       // Russian
    "Карта",       // Bulgarian
    "Zemljevid",   // Slovenian
    "Kartta",      // Finnish
    "Karte",       // Latvian
    "Žemėlapis",   // Lithuanian
    "Mapa",        // Slovak
    "Mapa",        // Czech
    "Kort",        // Danish
    "Kart",        // Norwegian
    "Karta",       // Swedish
    "Hartă",       // Maltese
    "Kartta",      // Estonian
    "Μap",         // Greek
  ];
  

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

  function addMapsItem(item) {
    // Use search query for Google Maps
    const searchQuery = new URLSearchParams(window.location.search).get('q');

    if (!searchQuery) return;
  
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
    
    // handle different list implementations in html code, e.g. when tab "All" is selected or tab "News"
    if (item.parentElement.role == "listitem") {
      var list = item.parentElement.parentElement;
      var mapsItem = list.firstElementChild.cloneNode(true);
      mapsItem.firstElementChild.setAttribute("href", mapsUrl);
      mapsItem.firstElementChild.firstElementChild.textContent = "Maps";
      mapsItem.firstElementChild.firstElementChild.removeAttribute("selected");
      list.insertBefore(mapsItem, list.firstElementChild.nextSibling); // insert at second position
    } else { 
      var list = item.parentElement;  
      var mapsItem = item.cloneNode(true);
      mapsItem.setAttribute("href", mapsUrl);
      mapsItem.firstElementChild.textContent = "Maps";
      mapsItem.firstElementChild.removeAttribute("selected");
      list.insertBefore(mapsItem, list.firstElementChild.nextSibling.nextSibling); // insert at third position (first is here a hidden <h1>)
    }
    
  }

  // Create MutationObserver for DOM changes
  function observeDOM() {
    var addedItem = false;
    var addedOverlay = false;
    const observer = new MutationObserver(() => {

      const mapImage = Array.from(document.querySelectorAll('g-img')).find(img =>
        img.id == "lu_map"
      );

      // check if aria-label is "Map"
      const mapDiv = Array.from(document.querySelectorAll('div')).find(div =>
        mapTranslations.includes(div.ariaLabel)
      );

      // check if aria-current is "page"
      const item = Array.from(document.querySelectorAll('A')).find(div =>
        div.ariaCurrent == "page"
      );

      if (mapImage && !addedOverlay) {
        addImageUrl(mapImage);
        addedOverlay = true;
        observer.disconnect();
      } else if (mapDiv && !addedOverlay) {
        addMapViewOverlay(mapDiv);
        addedOverlay = true;
      } 

      if (item && !addedItem) {
        addMapsItem(item);
        addedItem = true;
      }

    });

    observer.observe(document.body, { childList: true, subtree: true });

    if (addedItem && addedOverlay) {
      observerDisconnect;
    }
  }

  observeDOM();
})();