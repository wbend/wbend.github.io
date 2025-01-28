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
        "Uzbekistan (Coming Soon)": layers.uzbekistanUnits
      }
    };
    
  
    Object.keys(categories).forEach(function(category) {
      groupedOverlays["Military Units"]["<img src='assets/img/" + categories[category] + "' width='30' height='30'>&nbsp;" + category] = layers.categoryLayers[category];
    });
  
    const layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
      collapsed: isCollapsed
    }).addTo(map);
  
    // Create collections of layers to be affected by select/deselect all
    const militaryUnitLayers = Object.values(layers.categoryLayers);
    const countryLayers = [layers.kazakhstanUnits, layers.kyrgyzstanUnits, layers.tajikistanUnits, layers.turkmenistanUnits, layers.uzbekistanUnits];
    const selectableLayers = [...militaryUnitLayers, ...countryLayers];

    function deselectAllLayers() {
      selectableLayers.forEach(function(layer) {
        map.removeLayer(layer);
        layers.markerClusterGroup.removeLayers(layer.getLayers());
      });
      updateLayerControlCheckboxes(false);
    }
    
    function selectAllLayers() {
      selectableLayers.forEach(function(layer) {
        map.addLayer(layer);
        layers.markerClusterGroup.addLayers(layer.getLayers());
      });
      updateLayerControlCheckboxes(true);
    }
    
    function updateLayerControlCheckboxes(checked) {
      var inputs = document.querySelectorAll('.leaflet-control-layers-selector');
      inputs.forEach(function(input) {
        var layerName = input.nextSibling.textContent.trim();
        if (selectableLayers.includes(input._layer)) {
          input.checked = checked;
        }
      });
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
  
    map.on('overlayadd', function(e) {
      var layer = e.layer;
      if (selectableLayers.includes(layer)) {
        layers.markerClusterGroup.addLayers(layer.getLayers());
      }
    });
  
    map.on('overlayremove', function(e) {
      var layer = e.layer;
      if (selectableLayers.includes(layer)) {
        layers.markerClusterGroup.removeLayers(layer.getLayers());
      }
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
      var inputs = document.querySelectorAll('.leaflet-control-layers-selector');
      inputs.forEach(function(input) {
        var layerName = input.nextSibling.textContent.trim();
        if (layerName === 'Tajikistan' || layerName === 'Show Borders') {
          input.checked = true;
        } else if (layerName.includes('(Coming Soon)')) {
          input.checked = false;
        }
      });
    }
  
    return {
      updateLayerControlState: updateLayerControlState
    };
  }