// layers.js

function initLayers(map) {
  const ca_countries = L.geoJson(null, {
    style: function (feature) {
      return {
        fillColor: getCountryColor(feature),
        color: "white",
        fillOpacity: 0.4,
        opacity: 1,
        weight: 2,
        dashArray: 4
      };
    }
  });

  $.getJSON("data/central-asia-countries.geojson", function (data) {
    ca_countries.addData(data);
  });

  const categoryLayers = {};
  Object.keys(categories).forEach(function(category) {
    categoryLayers[category] = L.layerGroup();
  });

  function createCountryLayer(country) {
    return L.geoJson(null, {
      pointToLayer: function (feature, latlng) {
        var rawCategory = feature.properties.Category || "POI";
        var category = normalizeCategory(rawCategory);
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
      onEachFeature: function (feature, layer) {
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
          
          var rawCategory = feature.properties.Category || "POI";
          var category = normalizeCategory(rawCategory);
          if (categoryLayers[category]) {
            categoryLayers[category].addLayer(layer);
          } else {
            console.warn(`Category '${category}' not found. Adding to POI.`);
            categoryLayers["POI"].addLayer(layer);
          }
        }
      }
    });
  }

  const kazakhstanUnits = createCountryLayer('Kazakhstan');
  const kyrgyzstanUnits = createCountryLayer('Kyrgyzstan');
  const tajikistanUnits = createCountryLayer('Tajikistan');
  const turkmenistanUnits = createCountryLayer('Turkmenistan');
  const uzbekistanUnits = createCountryLayer('Uzbekistan');

  $.getJSON("data/kazakhstan_units.geojson", function (data) {
    kazakhstanUnits.addData(data);
  });

  $.getJSON("data/kyrgyzstan_units.geojson", function (data) {
    kyrgyzstanUnits.addData(data);
  });

  $.getJSON("data/tajikistan_units.geojson", function (data) {
    tajikistanUnits.addData(data);
  });

  $.getJSON("data/turkmenistan_units.geojson", function (data) {
    turkmenistanUnits.addData(data);
  });

  $.getJSON("data/uzbekistan_units.geojson", function (data) {
    uzbekistanUnits.addData(data);
  });

  Object.values(categoryLayers).forEach(function(layer) {
    map.addLayer(layer);
  });
  map.addLayer(tajikistanUnits);

  return { 
    ca_countries,
    kazakhstanUnits,
    kyrgyzstanUnits,
    tajikistanUnits,
    turkmenistanUnits,
    uzbekistanUnits,
    categoryLayers
  };
}