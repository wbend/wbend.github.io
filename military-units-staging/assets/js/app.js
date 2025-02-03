// app.js

var map;
var layers;
var controls;

$(document).ready(function() {
  map = initMap();
  layers = initLayers(map);
  controls = initControls(map, layers);

  map.addLayer(layers.ca_countries);  // Add country borders layer
  
  // Add country layers in alphabetical order
  const orderedCountries = [
    'kazakhstanUnits',
    'kyrgyzstanUnits',
    'tajikistanUnits',
    'turkmenistanUnits',
    'uzbekistanUnits'
  ];

  orderedCountries.forEach(countryLayer => {
    map.addLayer(layers[countryLayer]);
  });

  $(window).resize(function() {
    sizeLayerControl();
  });

  $("#about-btn").click(function() {
    $("#aboutModal").modal("show");
    $(".navbar-collapse.in").collapse("hide");
    return false;
  });

  $("#full-extent-btn").click(function() {
    map.fitBounds(layers.ca_countries.getBounds());
    $(".navbar-collapse.in").collapse("hide");
    return false;
  });

  $("#nav-btn").click(function() {
    $(".navbar-collapse").collapse("toggle");
    return false;
  });

  $(document).one("ajaxStop", function () {
    $("#loading").hide();
    $("#aboutModal").modal("show");
    sizeLayerControl();
    controls.updateLayerControlState();
  });

  // Leaflet patch to make layer control scrollable on touch browsers
  var container = $(".leaflet-control-layers")[0];
  if (!L.Browser.touch) {
    L.DomEvent
    .disableClickPropagation(container)
    .disableScrollPropagation(container);
  } else {
    L.DomEvent.disableClickPropagation(container);
  }
});