var map, featureList, eilschoolsSearch = [], sitsaschoolSearch = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(eilstates.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();
  /* Loop through eilschools layer and add only features which are in the map bounds */
  eilschools.eachLayer(function (layer) {
    if (map.hasLayer(eilschoolsLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/eil-school.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Loop through sitsaschools layer and add only features which are in the map bounds */
  sitsaschools.eachLayer(function (layer) {
    if (map.hasLayer(sitsaschoolLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/sit-sa-school.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}

/* Basemap Layers */
var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions" target="_blank">CartoDB</a>'
});
var usgsImagery = L.layerGroup([L.tileLayer("http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}", {
  maxZoom: 15,
}), L.tileLayer.wms("http://raster.nationalmap.gov/arcgis/services/Orthoimagery/USGS_EROS_Ortho_SCALE/ImageServer/WMSServer?", {
  minZoom: 16,
  maxZoom: 19,
  layers: "0",
  format: 'image/jpeg',
  transparent: true,
  attribution: "Aerial Imagery courtesy USGS"
})]);

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};



function getColor(d) {
    return d > 500 ? '#57a023' :
           d > 200  ? '#57a023' :
           d > 100  ? '#66bc29' :
           d > 50  ? '#76d334' :
           d > 20   ? '#89d950' :
           d > 10   ? '#9cdf6c' :
           d > 0   ? '#afe588' :
                      '#d5d5d5';
}



var customOptions =
        {
		closeButton: false,
			autoPan: false,
        className: "custom"
        };


var eilstates = L.geoJson(null, {
  style: function (feature) {
    return {
	fillColor: getColor(feature.properties.density),
      color: "white",
      fillOpacity: 0.7,
      opacity: 1,
		weight: 2,
		dashArray: 4
    };
  },
  onEachFeature: function (feature, layer) {
	  var content
	  if (feature.properties.density === 1) {
	     content = feature.properties.density + " Experimenter came from " + feature.properties.name + " between 2013 and 2017."
	  } else { 
	     content = feature.properties.density + " Experimenters came from " + feature.properties.name + " between 2013 and 2017."
	  };
      layer.on({
        mouseover: function (e) {
		    var layer = e.target;
			
		    layer.setStyle({
		        weight: 5,
		        color: '#666',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
			/*layer.bindPopup(content,customOptions);
			this.openPopup();*/
			

		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
			


          },
        mouseout: function (e) {
		    eilstates.resetStyle(e.target);
          },
        click: function (e) {
			  map.fitBounds(e.target.getBounds());
              $("#hover-title").html(feature.properties.name);
              $("#hover-info").html(content);
              $("#hoverModal").modal("show"); 

          }
      });
  }
});
$.getJSON("data/eil-states.geojson", function (data) {
  eilstates.addData(data);
});


var sitstates = L.geoJson(null, {
  style: function (feature) {
    return {
	fillColor: getColor(feature.properties.density),
      color: "white",
      fillOpacity: 0.7,
      opacity: 1,
		weight: 2,
		dashArray: 4
    };
  },
  onEachFeature: function (feature, layer) {
	  var content
	  if (feature.properties.density === 1) {
	     content = feature.properties.density + " SIT Study Abroad student came from " + feature.properties.name + " between 2013 and 2017."
	  } else { 
	     content = feature.properties.density + " SIT Study Abroad students came from " + feature.properties.name + " between 2013 and 2017."
	  };
      layer.on({
        mouseover: function (e) {
		    var layer = e.target;
			
		    layer.setStyle({
		        weight: 5,
		        color: '#666',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
			/*layer.bindPopup(content,customOptions);
			this.openPopup();*/
			

		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
			


          },
        mouseout: function (e) {
		    sitstates.resetStyle(e.target);
			
			
		   


          },
        click: function (e) {
			  map.fitBounds(e.target.getBounds());
              $("#hover-title").html(feature.properties.name);
              $("#hover-info").html(content);
              $("#hoverModal").modal("show");

          }
      });
  }
});
$.getJSON("data/sit-sa-states.geojson", function (data) {
  sitstates.addData(data);
});

var sitgistates = L.geoJson(null, {
  style: function (feature) {
    return {
	fillColor: getColor(feature.properties.density),
      color: "white",
      fillOpacity: 0.7,
      opacity: 1,
		weight: 2,
		dashArray: 4
    };
  },
  onEachFeature: function (feature, layer) {
	  var content
	  if (feature.properties.density === 1) {
	     content = feature.properties.density + " SIT Graduate Institute student came from " + feature.properties.name + " between 2013 and 2017."
	  } else { 
	     content = feature.properties.density + " SIT Graduate Institute students came from " + feature.properties.name + " between 2013 and 2017."
	  };
      layer.on({
        mouseover: function (e) {
		    var layer = e.target;
			
		    layer.setStyle({
		        weight: 5,
		        color: '#666',
		        dashArray: '',
		        fillOpacity: 0.7
		    });
			/*layer.bindPopup(content,customOptions);
			this.openPopup();*/
			

		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
			


          },
        mouseout: function (e) {
		    sitgistates.resetStyle(e.target);
			
			
		   


          },
        click: function (e) {
			  map.fitBounds(e.target.getBounds());
              $("#hover-title").html(feature.properties.name);
              $("#hover-info").html(content);
              $("#hoverModal").modal("show");

          }
      });
  }
});
$.getJSON("data/sit-gi-states.geojson", function (data) {
  sitgistates.addData(data);
});





/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
	disableClusteringAtZoom: 7
});

/* Empty layer placeholder to add to layer control for listening when to add/remove eilschools to markerClusters layer */
var eilschoolsLayer = L.geoJson(null);
var eilschools = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/eil-school.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Number of students</th><td>" + "could theoretically add this" + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/eil-school.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      eilschoolsSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS1,
        source: "EILSchools",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/eil-sending-schools.geojson", function (data) {
  eilschools.addData(data);
  map.addLayer(eilschoolsLayer);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove sitsaschools to markerClusters layer */
var sitsaschoolLayer = L.geoJson(null);
var sitsaschools = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/sit-sa-school.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Number of students</th><td>" + "could theoretically add this" + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/sit-sa-school.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      sitsaschoolSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "SITSASchools",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/sit-sa-sending-schools.geojson", function (data) {
  sitsaschools.addData(data);
});

var corner1 = L.latLng(5.499550, -167.276413),
corner2 = L.latLng(83.162102, -20.233040);

map = L.map("map", {
  zoom: 4,
  maxBounds: L.latLngBounds(corner1, corner2),
  center: [45.8283, -104.5795],
  layers: [cartoLight, eilstates, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === eilschoolsLayer) {
    markerClusters.addLayer(eilschools);
    syncSidebar();
  }
  if (e.layer === sitsaschoolLayer) {
    markerClusters.addLayer(sitsaschools);
    syncSidebar();
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === eilschoolsLayer) {
    markerClusters.removeLayer(eilschools);
    syncSidebar();
  }
  if (e.layer === sitsaschoolLayer) {
    markerClusters.removeLayer(sitsaschools);
    syncSidebar();
  }
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
  syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'>Developed by <a href='https://twitter.com/wbend' target='_blank'>Ben Dalton</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "fa fa-location-arrow",
  metric: false,
  strings: {
    title: "My location",
    popup: "You are within {distance} {unit} from this point",
    outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  /*"Street Map": cartoLight,
  "Aerial Imagery": usgsImagery*/
    "Experiment in International Living": eilstates,
	"SIT Study Abroad": sitstates,
	"SIT Graduate Institute": sitgistates
};

var groupedOverlays = {
  "Sending Schools": {
    "<img src='assets/img/eil-school.png' width='24' height='28'>&nbsp;Experiment in International Living": eilschoolsLayer,
    "<img src='assets/img/sit-sa-school.png' width='24' height='28'>&nbsp;SIT Study Abroad": sitsaschoolLayer
  }/* ,
  "States of Origin": {
    "Experiment in International Living": eilstates,
	"SIT Study Abroad": sitstates,
	"SIT Graduate Institute": sitgistates
  }*/
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
  if (e.which == 13) {
    e.preventDefault();
  }
});

$("#featureModal").on("hidden.bs.modal", function (e) {
  $(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  sizeLayerControl();
  /* Fit map to eilstates bounds */
  /* map.fitBounds(eilstates.getBounds()); */
  /* featureList = new List("features", {valueNames: ["feature-name"]}); */
  /* featureList.sort("feature-name", {order:"asc"}); */

  var eilschoolsBH = new Bloodhound({
    name: "EILSchools",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: eilschoolsSearch,
    limit: 10
  });

  var sitsaschoolsBH = new Bloodhound({
    name: "SITSASchools",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: sitsaschoolSearch,
    limit: 10
  });

  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  eilschoolsBH.initialize();
  sitsaschoolsBH.initialize();
  geonamesBH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, 
   {
    name: "EILSchools",
    displayKey: "name",
    source: eilschoolsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/eil-school.png' width='24' height='28'>&nbsp;Experiment Schools</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "SITSASchools",
    displayKey: "name",
    source: sitsaschoolsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/sit-sa-school.png' width='24' height='28'>&nbsp;SIT Study Abroad Schools</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;Locations</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "eilstates") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "EILSchools") {
      if (!map.hasLayer(eilschoolsLayer)) {
        map.addLayer(eilschoolsLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "SITSASchools") {
      if (!map.hasLayer(sitsaschoolLayer)) {
        map.addLayer(sitsaschoolLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
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
