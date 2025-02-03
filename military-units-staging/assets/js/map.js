// map.js

const mapboxLight = L.tileLayer('https://api.mapbox.com/styles/v1/michaeltheredline/clpdewtiw003n01r70mtp6tai/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWljaGFlbHRoZXJlZGxpbmUiLCJhIjoiY2xkeHAyNXVpMGpicjNxcGszN3Fic21idSJ9.QlQEMKHfuwVQgoKgaSs9SQ', {
  attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: 'mapbox/streets-v11',
  accessToken: 'pk.eyJ1IjoibWljaGFlbHRoZXJlZGxpbmUiLCJhIjoiY2xkeHAyNXVpMGpicjNxcGszN3Fic21idSJ9.QlQEMKHfuwVQgoKgaSs9SQ'
});

const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

function initMap() {
  const corner1 = L.latLng(30, 45),
        corner2 = L.latLng(60, 93);

  const map = L.map("map", {
      zoom: 6,  // Adjusted zoom level
      maxBounds: L.latLngBounds(corner1, corner2),
      center: [41.3775, 64.5853],  // Centered between Tajikistan and Uzbekistan
      layers: [satelliteLayer],
      zoomControl: false,
      attributionControl: false
  });

  map.on("layeradd", () => updateAttribution(map));
  map.on("layerremove", () => updateAttribution(map));

  return map;
}

const baseLayers = {
  "Topographical": mapboxLight,
  "Satellite": satelliteLayer
};