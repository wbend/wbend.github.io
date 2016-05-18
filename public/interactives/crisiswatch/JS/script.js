//By @wbend with help from @trnels

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
	zoomControl: false,
	maxZoom: 5,
	minZoom: 2
})
	.setView([15.621389, 20.881944], 3);
map.attributionControl.addAttribution("CrisisWatch | The Monthly Conflict Situation Report, <a href='http://www.crisisgroup.org/en/publication-type/crisiswatch.aspx' target='_blank'>About</a>, <a href='mailto:media@crisisgroup.org' target='_blank'>Contact</a>");


$(function() {
	$("#home")
		.button()
		.click(function(event) {
			map.setView([15.621389, 20.881944], 3);
			perma.update();
		});
	$("#africa")
		.button()
		.click(function(event) {
			map.setView([-4.621389, 30.881944], 4);
		});
	$("#asia")
		.button()
		.click(function(event) {
			map.setView([15.621389, 110.881944], 3);
		});
	$("#europe")
		.button()
		.click(function(event) {
			map.setView([40.621389, 40.881944], 5);
		});
	$("#latinamerica")
		.button()
		.click(function(event) {
			map.setView([0.621389, -65.881944], 4);
		});
	$("#middleeast")
		.button()
		.click(function(event) {
			map.setView([35.621389, 45.881944], 4);
		});
});

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
		maxDate: (new Date(2014, 8 - 1)),
		minDate: (new Date(2013, 9 - 1))
	});

});

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 3,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}

	info.update(layer.feature.properties);
}

function clickFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 3,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}

	perma.update(layer.feature.properties);
}

function mobileFeature(e) {
	var layer = e.target;
	layer.setStyle({});
	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}

	info.update(layer.feature.properties);
}

function resetHighlight(e) {
	geojson.resetStyle(e.target);
	info.update();
}

function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
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
			'<h2>' + props.Place + '</h2><p>' + props.Update + '</p>' : '<h2>Mouse over a country for an update</h2>');
};

var divScroll = $('#tooltip-content');
setInterval(function() {
	var pos = divScroll.scrollTop();
	divScroll.scrollTop(pos + 2);
}, 300)

//info.addTo(map);
map.addLayer(info);



var perma = L.control();
perma.onAdd = function(map) {
	this._div = L.DomUtil.create('div', 'perma');
	this.update();
	document.getElementById('perma-content').appendChild(this._div);
};
perma.update = function(props) {
		this._div.innerHTML =
		(props ?
			'<h3>Click on a country for more &mdash; ' + props.Place + ' | <a href="' + props.Archive + '" target="_blank">CrisisWatch Database</a></h3><p><a href="' + props.URLOne + '" target="_blank">' + props.HeadlineOne + '</a>' + '</p><p><a href="' + props.URLTwo + '" target="_blank">' + props.HeadlineTwo + '</a></p>' : '<h3>Click on a country for more</h3>');
};

map.addLayer(perma);


