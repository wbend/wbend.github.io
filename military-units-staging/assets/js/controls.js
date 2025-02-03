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

  // Track state for all countries
  const state = {
    selectedCountries: new Set(['Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Uzbekistan']),
    selectedUnitTypes: new Set(Object.keys(categories)),
    unitTypesInCountry: {},
    countriesWithUnitType: {}
  };

  // Initialize relationship maps for all countries
  ['Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Uzbekistan'].forEach(country => {
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
      
      if (state.selectedCountries.has(country)) {
        state.unitTypesInCountry[country].add(category);
        state.countriesWithUnitType[category].add(country);
      }
    });
    
    updateLayerControlState();
  });

  const groupedOverlays = {
    "Country Borders": {
      "Show Borders": layers.ca_countries
    },
    "Military Units": {},
    "Countries": {
      "Kazakhstan": layers.kazakhstanUnits,
      "Kyrgyzstan": layers.kyrgyzstanUnits,
      "Tajikistan": layers.tajikistanUnits,
      "Turkmenistan": layers.turkmenistanUnits,
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
    ['Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Uzbekistan'].forEach(country => {
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

    // Remove all layers first
    Object.keys(layers.categoryLayers).forEach(category => {
      layers.categoryLayers[category].clearLayers();
    });

    ['Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Uzbekistan'].forEach(country => {
      const countryLayer = layers[country.toLowerCase() + 'Units'];
      if (countryLayer && countryLayer.getLayers) {
        countryLayer.clearLayers();
      }
    });

    // Load GeoJSON data again to rebuild layers
    $.getJSON("data/all_units.geojson", function(data) {
      data.features.forEach(feature => {
        const country = feature.properties.Country;
        const category = normalizeCategory(feature.properties.Category || "POI");
        
        // Only process features for selected countries and unit types
        if (state.selectedCountries.has(country) && state.selectedUnitTypes.has(category)) {
          // Create marker using the same logic as in layers.js
          const marker = L.geoJson(feature, {
            pointToLayer: function (feature, latlng) {
              var iconUrl;
              var iconSize = [36, 42];
              
              if (feature.properties.Symbology) {
                iconUrl = feature.properties.Symbology;
                iconSize = [32, 32];
              } else {
                iconUrl = "assets/img/" + (categories[category] || categories["POI"]);
              }
              
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
            },
            onEachFeature: function(feature, layer) {
              if (feature.properties) {
                function createContent(isTooltip) {
                  var content = '';
                  var excludeFields = ['geometry', 'id'];
                  
                  for (var key in feature.properties) {
                    if (feature.properties.hasOwnProperty(key) && !excludeFields.includes(key) && feature.properties[key]) {
                      var value = feature.properties[key];
                      if (key === 'Category') {
                        value = normalizeCategory(value);
                      }
                      if (key === 'Symbology' && feature.properties.Symbology) {
                        content += '<strong>' + key + ':</strong><br><img src="' + value + '" style="width: 150px; height: 150px; object-fit: contain;"><br>';
                      } else {
                        content += '<strong>' + key + ':</strong> ' + value + '<br>';
                      }
                    }
                  }
                  
                  return content;
                }

                var tooltipContent = createContent(true);
                if (tooltipContent) {
                  layer.bindPopup(tooltipContent, {
                    closeButton: false,
                    offset: L.point(0, -40),
                    className: 'tooltip-popup'
                  });
                  
                  layer.on('mouseover', function (e) {
                    this.openPopup();
                  });
                  layer.on('mouseout', function (e) {
                    this.closePopup();
                  });
                }

                var popupContent = createContent(false);
                layer.on('click', function (e) {
                  $("#feature-title").html(feature.properties.Title || feature.properties.Name || 'Unit Information');
                  $("#feature-info").html(popupContent);
                  $("#featureModal").modal("show");
                });
              }
            }
          });
          
          // Add marker to both country and category layers
          const countryLayer = layers[country.toLowerCase() + 'Units'];
          const categoryLayer = layers.categoryLayers[category];
          
          if (countryLayer) {
            marker.eachLayer(layer => countryLayer.addLayer(layer));
          }
          if (categoryLayer) {
            marker.eachLayer(layer => categoryLayer.addLayer(layer));
          }
        }
      });

      // Add or remove layers from map based on selection
      ['Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Uzbekistan'].forEach(country => {
        const layer = layers[country.toLowerCase() + 'Units'];
        if (state.selectedCountries.has(country)) {
          if (!map.hasLayer(layer)) map.addLayer(layer);
        } else {
          if (map.hasLayer(layer)) map.removeLayer(layer);
        }
      });

      Object.keys(categories).forEach(category => {
        const layer = layers.categoryLayers[category];
        if (state.selectedUnitTypes.has(category)) {
          if (!map.hasLayer(layer)) map.addLayer(layer);
        } else {
          if (map.hasLayer(layer)) map.removeLayer(layer);
        }
      });
    });
  }

  // Handle layer control events
  document.addEventListener('change', function(e) {
    if (!e.target.classList.contains('leaflet-control-layers-selector')) return;

    const label = e.target.nextSibling.textContent.trim();
    if (label === 'Show Borders') return;

    // Handle country selection
    if (['Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Uzbekistan'].includes(label)) {
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
    ['Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan', 'Uzbekistan'].forEach(country => {
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

// Add collapse button for mobile
var collapseButton = L.DomUtil.create('button', 'layer-control-collapse-btn', layerControlContainer);
collapseButton.innerHTML = '×';
collapseButton.setAttribute('aria-label', 'Collapse layer control');
collapseButton.style.fontSize = '20px';

L.DomEvent.on(collapseButton, 'click', function(e) {
    L.DomEvent.stopPropagation(e);
    var control = document.querySelector('.leaflet-control-layers');
    if (control) {
        control.classList.remove('leaflet-control-layers-expanded');
    }
});

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