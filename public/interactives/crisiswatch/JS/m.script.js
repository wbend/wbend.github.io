//Defines custom icon
var myIcon = L.icon({
	iconUrl: 'Images/fire-icon.svg',
	iconAnchor: [5, 25],
	popupAnchor: [0, -28]
});

var myotherIcon = L.icon({
	iconUrl: 'Images/blue_Dove.svg',
	iconSize: [40],
	iconAnchor: [5, 25],
	popupAnchor: [0, -28]
});

var map = L.mapbox.map('map', 'daltonwb.g67llj8f', {
	attributionControl:false,
	zoomControl: false,
	maxZoom: 5,
	minZoom: 2
})
	.setView([15.621389, 20.881944], 3);
	new L.Control.Zoom({position: 'topright'}).addTo(map);

//Unnecessary clustering functionality. Disabled at zoom 1, effectively turns it off.
var markers = L.markerClusterGroup({
	disableClusteringAtZoom: 1,
	spiderfyDistanceMultiplier: 2,
	singleMarkerMode: false
});

//Former method for getting initial layer on map
//var r = new Date();
//var o = r.getMonth();
//var rr = new Date();
//var oo = rr.getFullYear();
//var uniqueId = (o + 1) + "" + oo;
//var tempData = "geoJsonData" + uniqueId;
//geoJsonData = this[tempData];

var geoJsonLayer = L.geoJson(geoJsonData, {
	pointToLayer: function(feature, latlng) {
	if (feature.properties.Type == "Conflict"){
		return L.marker(latlng, {
			icon: myIcon,
			opacity:0.8
		});
	}
	else
	{return L.marker(latlng, {
			icon: myotherIcon,
			opacity:0.8
		});
		}
	}
	//Commented out bit that adds pop-up infowindows to the markers on mouseover.
	//,
	//onEachFeature: function(feature, layer) {
	//	layer.bindPopup("<strong>" + feature.properties.Place + "</strong>" + "<br>" +
	//		feature.properties.Event);
	//}
});
markers.addLayer(geoJsonLayer);
map.addLayer(markers);


markers.on('mouseover', function(e) {
	e.layer.openPopup();
});
markers.on('mouseout', function(e) {
	e.layer.closePopup();
});

//for clustering markers. Not used on this map, effectively disabled above. See note.
markers.on('clustermouseover', function(e) {
	var map = this._map;
	if (map.getMaxZoom() === map.getZoom()) {
		if (this.options.spiderfyOnMaxZoom) {
			e.layer.spiderfy();
		}
	} else if (this.options.zoomToBoundsOnClick) {
		//e.layer.zoomToBounds();
	}
});

function getColor(d) {
	return d === "Improved" ? '#58a6a6' :
		d === "Deteriorated" ? '#c34666' :
		'#ffdc84';
}

function style(feature) {
	return {
		fillColor: getColor(feature.properties.Status),
		weight: 1,
		opacity: 1,
		color: 'white',
		dashArray: '2',
		fillOpacity: 0.5
	};
}




$(function() {
	$("#datepicker").datepicker({
		onChangeMonthYear: function(year, month) {
			map.removeLayer(geojson);
			markers.removeLayer(geoJsonLayer);
			uniqueId = month + "" + year;
			stringData = "statesData" + uniqueId;
			statesData = eval(stringData);
			geojson = L.geoJson(statesData, {
				style: style,
				onEachFeature: onEachFeature,
			}).addTo(map);
			tempData = "geoJsonData" + uniqueId;
			geoJsonData = eval(tempData);
			geoJsonLayer = L.geoJson(geoJsonData, {
				pointToLayer: function(feature, latlng) {
					if (feature.properties.Type == "Conflict"){
						return L.marker(latlng, {
							icon: myIcon,
							opacity:0.8
										});
								}
					else
						{return L.marker(latlng, {
							icon: myotherIcon,
							opacity:0.8
										});
								}
	}
	//Again, commenting out code to add infowindows to markers. This would create popups for layers after switching. 
	//,
	//onEachFeature: function(feature, layer) {
	//	layer.bindPopup("<strong>" + feature.properties.Place + "</strong>" + "<br>" +
	//		feature.properties.Event);
	//}
});
markers.addLayer(geoJsonLayer);
map.addLayer(markers);
			
		},
		inline: true,
		maxDate: "0M",
		minDate: "-11M"
	});

});

var lastClickedLayer;
function clickFeature(e) {
    if(lastClickedLayer){
   geojson.resetStyle(lastClickedLayer);
}
    var layer = e.target;
        layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
        });

    info.update(layer.feature.properties);
	$("#mypanel").trigger("updatelayout");
    $("#mypanel").panel("open");
    lastClickedLayer = layer;
	        }



function onEachFeature(feature, layer) {
		layer.on({
			click: clickFeature
		});
}


var geojson = L.geoJson(statesData, {
	style: style,
	onEachFeature: onEachFeature,
}).addTo(map);



var info = L.control();

info.onAdd = function(map) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	document.getElementById('tooltip-content').appendChild(this._div);
};

info.update = function(props) {
	
		this._div.innerHTML =
		//    "<h4></h4>" + 
		(props ?
			'<h2>' + props.Place + '</h2><p>' + props.Update + '</p>' + '<p><a style="text-decoration:none;" href="' + props.URLOne + '" target="_blank">' + props.HeadlineOne + '</a>' + '</p><p><a style="text-decoration:none;" href="' + props.URLTwo + '" target="_blank">' + props.HeadlineTwo + '</a></p><p><a style="text-decoration:none;" href="' + props.Archive + '" target="_blank">CrisisWatch Database</a></p>' : '<h2>Tap a country for an update</h2>');
};

var divScroll = $('#tooltip-content');
setInterval(function() {
	var pos = divScroll.scrollTop();
	divScroll.scrollTop(pos + 2);
}, 300)

//info.addTo(map);
map.addLayer(info);


