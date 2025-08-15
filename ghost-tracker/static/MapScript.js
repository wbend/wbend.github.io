
// Initialize and add the map
function initMap() {
  // initail values 
  // get the URL
  var url = new URL(window.location.href);
  // make sure that all parameters were provided 
  var paraFound = url.searchParams.has("latt") && url.searchParams.has("long") && url.searchParams.has("radius") && url.searchParams.has("startDate") && url.searchParams.has("endDate") && url.searchParams.has("numebrOfPosts");
  // if they exist, then set the values of them to the new page to keep the same search query
  if(paraFound){

    // get the query parameters from the URL and set the corresponding field in the HTML page 
  	var myLatlng = {lat:  parseFloat(url.searchParams.get("latt")) , lng: parseFloat(url.searchParams.get("long")) };
    document.getElementById('latt').value = myLatlng.lat; 
    document.getElementById('long').value = myLatlng.lng;
    document.getElementById('radiusSize').value= url.searchParams.get("radius"); 
    document.getElementById('numebrOfPosts').value= url.searchParams.get("numebrOfPosts"); 

  }
  // if the URL did not have the values (either it is the index.HTML page or the user did not provide all the parameters), set the fields to the default values
  else{

    // set the  latt and long the center of Syria
  	var myLatlng = {lat: 34.8021, lng: 38.9968};
  	document.getElementById('latt').value =myLatlng.lat;
  	document.getElementById('long').value  =myLatlng.lng;
  }


  // create the map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: myLatlng
  });


var gmarkers = []; // a list of the markers on the map
var gmCircle = []; // set of the circles on the map
// To place a circle when the page loaded for the first time
placeMarker(map,map.getCenter());
map.setZoom(6);

///////// This part was taken from GOOGLE's develpoers page to set a search bar on the map "https://developers.google.com/maps/documentation/javascript/examples/places-searchbox" /////

// Create the search box and link it to the UI element.
var input = document.getElementById('pac-input');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
  searchBox.setBounds(map.getBounds());
});

var markers = [];
// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
searchBox.addListener('places_changed', function() {
  var places = searchBox.getPlaces();

  if (places.length == 0) {
    return;
  }

  // Clear out the old markers.
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];

  // For each place, get the icon, name and location.
  var bounds = new google.maps.LatLngBounds();
  places.forEach(function(place) {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
});

///////// End of part taken from GOOGLE's develpoers page /////


google.maps.event.addListener(map, 'click', function(event) { // when click the map, place a marker 
  placeMarker(map, event.latLng);
});



function placeMarker(map, location) { //show only one marker

  if (gmarkers && gmarkers.length) {
      //delete the old marker and Circle
      gmarkers[0].setMap(null);
      gmarkers.pop();
      gmCircle[0].setMap(null);
      gmCircle.pop();
    }
    
  // create a marker that is on the center of the clicked location 
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  // set the center of the map to be the clicked location 
  map.setCenter(location);
  // push the marker to the list
  gmarkers.push(marker);

  // change the latt and long fields to the new values from the click
  document.getElementById('latt').value =location.lat();

  document.getElementById('long').value =location.lng();

  // get the value of the radius from the field
  var getValue = parseInt(document.getElementById('radiusSize').selectedOptions[0].value);
  // create the circle
  var circle = new google.maps.Circle({
  map: map,
  radius: getValue, 
  strokeOpacity: 0.5,
  strokeWeight: 1,
  fillColor: "#0C69C7",
  fillOpacity: 0.35,
  draggable: true,
  transparent: true
});

  // adjust the map's zoom according to the radius of the circle
  if (getValue == 100)
    map.setZoom(17);
  else if (getValue == 800)
    map.setZoom(14);
  else if (getValue == 2000)
    map.setZoom(13);
  else if (getValue == 6000)
    map.setZoom(11);
  else if (getValue == 50000)
    map.setZoom(8);
  else
    map.setZoom(8);

//  place the circle on the map
circle.bindTo('center', marker, 'position');
gmCircle.push(circle); // to add it to the list to delete it after


google.maps.event.addListener(circle, 'dragend', function(event) { // when circle get dragged
  placeMarker(map, marker.getPosition());
});
google.maps.event.addListener(circle, 'click', function(event) { // when a new location is selected inside the circle
  placeMarker(map, event.latLng);

});


var selectRadius = document.getElementById('radiusSize'); 
selectRadius.addEventListener('change',function () { // to change the radius when the user only change the radius not the location of the circle 
  placeMarker(map, marker.getPosition());
  } ,false) ; 

var submitButton = document.getElementById('submit-button');

// when the submit button is clicked, get the information from the field in the HTML page and create a URL query for these values to be used in the search and in the next page to keep the values
submitButton.addEventListener("click", function(){
	document.getElementById("inForm").action = '/result?' +"latt="+document.getElementById('latt').value+"&long="+document.getElementById('long').value+"&radius="+document.getElementById('radiusSize').selectedOptions[0].value+"&startDate="+document.getElementById("start").value+"&endDate="+document.getElementById("end").value+"&numebrOfPosts="+document.getElementById("numebrOfPosts").value;

});

}
}
