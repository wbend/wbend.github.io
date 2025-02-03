// controls.js

function initControls(map, layers) {
  const attributionControl = L.control({
    position: "bottomright"
  });
  attributionControl.onAdd = function (map) {
    var div = L.DomUtil.create("div", "leaflet-control-attribution");
    div.innerHTML = "<span class='hidden-xs'>Developed by <a href='https://oxussociety.org' target='_blank'>The Oxus Society for Central Asian Affairs</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
    return div;
  };
  map.addControl(attributionControl);

  const zoomControl = L.control.zoom({
    position: "bottomright"
  }).addTo(map);

  const isCollapsed = (document.body.clientWidth <= 767);

  // Track state
  const state = {
    selectedCountries: new Set(['Tajikistan', 'Uzbekistan']),
    selectedUnitTypes: new Set(Object.keys(categories)),
    unitTypesInCountry: {},
    countriesWithUnitType: {}
  };

  // Initialize relationship maps
  ['Tajikistan', 'Uzbekistan'].forEach(country => {
    state.unitTypesInCountry[country] = new Set();
  });
  Object.keys(categories).forEach(category => {
    state.countriesWithUnitType[category] = new Set();
  });

  // Load all units data and build relationships
  $.getJSON("data/all_units.geojson", function(data) {
    data.features.forEach(feature => {
      const country = feature.properties.Country;
      const category = normalizeCategory(feature.properties.Category || "POI");
      
      if (country === 'Tajikistan' || country === 'Uzbekistan') {
        state.unitTypesInCountry[country].add(category);
        state.countriesWithUnitType[category].add(country);
      }
    });
    
    // Initialize the map
    updateLayerControlState();
  });

  const groupedOverlays = {
    "Country Borders": {
      "Show Borders": layers.ca_countries
    },
    "Military Units": {},
    "Countries": {
      "Kazakhstan (Coming Soon)": layers.kazakhstanUnits,
      "Kyrgyzstan (Coming Soon)": layers.kyrgyzstanUnits,
      "Tajikistan": layers.tajikistanUnits,
      "Turkmenistan (Coming Soon)": layers.turkmenistanUnits,
      "Uzbekistan": layers.uzbekistanUnits
    }
  };
  
  Object.keys(categories).forEach(function(category) {
    groupedOverlays["Military Units"]["<img src='assets/img/" + categories[category] + "' width='30' height='30'>&nbsp;" + category] = layers.categoryLayers[category];
  });

  const layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
    collapsed: isCollapsed
  }).addTo(map);

  function getCheckbox(label) {
    const inputs = document.querySelectorAll('.leaflet-control-layers-selector');
    return Array.from(inputs).find(input => 
      input.nextSibling.textContent.trim() === label ||
      input.nextSibling.textContent.trim().includes(label)
    );
  }

  function updateMapDisplay() {
    // Update checkbox states first
    ['Tajikistan', 'Uzbekistan'].forEach(country => {
      const checkbox = getCheckbox(country);
      if (checkbox) {
        checkbox.checked = state.selectedCountries.has(country);
      }
    });

    Object.keys(categories).forEach(category => {
      const checkbox = getCheckbox(category);
      if (checkbox) {
        checkbox.checked = state.selectedUnitTypes.has(category);
      }
    });

    // Clear all existing layers first
    Object.keys(categories).forEach(category => {
      const layer = layers.categoryLayers[category];
      if (layer && map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    });

    ['Tajikistan', 'Uzbekistan'].forEach(country => {
      const layer = layers[country.toLowerCase() + 'Units'];
      if (layer && map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    });

    // Add back the selected layers
    state.selectedCountries.forEach(country => {
      const countryLayer = layers[country.toLowerCase() + 'Units'];
      if (countryLayer) {
        // Clear existing features
        countryLayer.clearLayers();
        
        // Get the original features for this country
        $.getJSON(`data/${country.toLowerCase()}_units.geojson`, function(data) {
          // Filter and add features based on selected unit types
          const filteredFeatures = data.features.filter(feature => {
            const category = normalizeCategory(feature.properties.Category || "POI");
            return state.selectedUnitTypes.has(category);
          });
          
          countryLayer.addData({
            type: "FeatureCollection",
            features: filteredFeatures
          });
          
          // Add the layer to the map if it has features
          if (filteredFeatures.length > 0) {
            map.addLayer(countryLayer);
          }
        });
      }
    });

    // Add category layers
    state.selectedUnitTypes.forEach(category => {
      const categoryLayer = layers.categoryLayers[category];
      if (categoryLayer) {
        // Clear existing features
        categoryLayer.clearLayers();
        
        // Get all features for selected countries
        state.selectedCountries.forEach(country => {
          $.getJSON(`data/${country.toLowerCase()}_units.geojson`, function(data) {
            // Filter features for this category
            const filteredFeatures = data.features.filter(feature => {
              const featureCategory = normalizeCategory(feature.properties.Category || "POI");
              return featureCategory === category;
            });
            
            if (filteredFeatures.length > 0) {
              // Create temporary GeoJSON to add filtered features
              const tempGeoJSON = L.geoJson({
                type: "FeatureCollection",
                features: filteredFeatures
              }, {
                pointToLayer: function(feature, latlng) {
                  // Recreate the marker with the same options as in layers.js
                  var iconUrl = feature.properties.Symbology || 
                               "assets/img/" + (categories[category] || categories["POI"]);
                  var iconSize = feature.properties.Symbology ? [32, 32] : [36, 42];
                  
                  return L.marker(latlng, {
                    icon: L.icon({
                      iconUrl: iconUrl,
                      iconSize: iconSize,
                      iconAnchor: [iconSize[0] / 2, iconSize[1]],
                      popupAnchor: [0, -iconSize[1] / 2]
                    }),
                    title: feature.properties.Location || feature.properties.Title || '',
                    riseOnHover: true
                  });
                }
              });
              
              // Add the markers to the category layer
              tempGeoJSON.eachLayer(marker => {
                categoryLayer.addLayer(marker);
              });
              
              // Add the category layer to the map
              if (!map.hasLayer(categoryLayer)) {
                map.addLayer(categoryLayer);
              }
            }
          });
        });
      }
    });
  }

  // Handle layer control events
  document.addEventListener('change', function(e) {
    if (!e.target.classList.contains('leaflet-control-layers-selector')) return;

    const label = e.target.nextSibling.textContent.trim();
    if (label === 'Show Borders' || label.includes('Coming Soon')) return;

    // Handle country selection
    if (label === 'Tajikistan' || label === 'Uzbekistan') {
      if (e.target.checked) {
        state.selectedCountries.add(label);
      } else {
        state.selectedCountries.delete(label);
      }
    }
    // Handle unit type selection
    else {
      const unitType = Object.keys(categories).find(cat => label.includes(cat));
      if (unitType) {
        if (e.target.checked) {
          state.selectedUnitTypes.add(unitType);
          // Auto-select at least one country if none are selected
          if (state.selectedCountries.size === 0) {
            state.countriesWithUnitType[unitType].forEach(country => {
              state.selectedCountries.add(country);
            });
          }
        } else {
          state.selectedUnitTypes.delete(unitType);
        }
      }
    }

    updateMapDisplay();
  });

  function deselectAllLayers() {
    state.selectedCountries.clear();
    state.selectedUnitTypes.clear();
    updateMapDisplay();
  }
  
  function selectAllLayers() {
    ['Tajikistan', 'Uzbekistan'].forEach(country => {
      state.selectedCountries.add(country);
    });
    Object.keys(categories).forEach(category => {
      state.selectedUnitTypes.add(category);
    });
    updateMapDisplay();
  }

  var layerControlContainer = layerControl.getContainer();
  var buttonContainer = L.DomUtil.create('div', 'layer-control-custom-buttons', layerControlContainer);
  buttonContainer.style.textAlign = 'center';

  var selectButton = L.DomUtil.create('button', 'select-all-button custom-button', buttonContainer);
  selectButton.innerHTML = 'Select All Units';
  selectButton.style.margin = '5px';
  selectButton.style.padding = '5px';

  var deselectButton = L.DomUtil.create('button', 'deselect-all-button custom-button', buttonContainer);
  deselectButton.innerHTML = 'Deselect All Units';
  deselectButton.style.margin = '5px';
  deselectButton.style.padding = '5px';

  var suggestButton = L.DomUtil.create('button', 'suggest-locations-button custom-button', buttonContainer);
  suggestButton.innerHTML = 'Have a location to add?<br>Let us know here.';
  suggestButton.style.margin = '5px';
  suggestButton.style.padding = '5px';

  L.DomEvent.on(selectButton, 'click', function(e) {
    L.DomEvent.stopPropagation(e);
    selectAllLayers();
  });

  L.DomEvent.on(deselectButton, 'click', function(e) {
    L.DomEvent.stopPropagation(e);
    deselectAllLayers();
  });

  L.DomEvent.on(suggestButton, 'click', function(e) {
    L.DomEvent.stopPropagation(e);
    window.open('https://forms.gle/uaqvXPXdNWKt6rN7A', '_blank');
  });

  L.DomEvent.disableClickPropagation(layerControlContainer);

  var container = $(".leaflet-control-layers")[0];
  if (!L.Browser.touch) {
    L.DomEvent
    .disableClickPropagation(container)
    .disableScrollPropagation(container);
  } else {
    L.DomEvent.disableClickPropagation(container);
  }

  function updateLayerControlState() {
    selectAllLayers();
  }

  return {
    updateLayerControlState: updateLayerControlState
  };
}