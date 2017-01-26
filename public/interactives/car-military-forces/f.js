function toggle() {

	var ele = document.getElementById("legend");

	var text = document.getElementById("displayText");

	if(ele.style.display == "block") {

    		ele.style.display = "none";

		text.innerHTML = "show";

  	}

	else {

		ele.style.display = "block";

		text.innerHTML = "hide";

	}
var elef = document.getElementById("Frenchlegend");

	var text = document.getElementById("displayText");

	if(elef.style.display == "none") {

    		elef.style.display = "block";

		text.innerHTML = "hide";

  	}

	else {

		elef.style.display = "none";

		text.innerHTML = "show";

	}
var elet = document.getElementById("frenchTitle");

	if(elet.style.display == "none") {

    		elet.style.display = "block";

		text.innerHTML = "hide";

  	}

	else {

		elet.style.display = "none";

		text.innerHTML = "show";

	}
	
	
} 

function checktoggle() {

var textboxid = document.getElementById('checktoggle');

if (textboxid.innerHTML === "Faites glisser pour voir l'ordre des villes conquises par la Seleka jusqu'Ã  la prise de Bangui") {textboxid.innerHTML = "Slide to see the order of towns captured by the Seleka before the takeover of Bangui";}

else {textboxid.innerHTML = "Faites glisser pour voir l'ordre des villes conquises par la Seleka jusqu'Ã  la prise de Bangui";}

}





var tooltip=function(){

 var id = 'tt';

 var top = 3;

 var left = 3;

 var maxw = 400;

 var speed = 10;

 var timer = 20;

 var endalpha = 95;

 var alpha = 0;

 var tt,t,c,b,h;

 var ie = document.all ? true : false;

 return{

  show:function(v,w){

   if(tt == null){

    tt = document.createElement('div');

    tt.setAttribute('id',id);

    t = document.createElement('div');

    t.setAttribute('id',id + 'top');

    c = document.createElement('div');

    c.setAttribute('id',id + 'cont');

    b = document.createElement('div');

    b.setAttribute('id',id + 'bot');

    tt.appendChild(t);

    tt.appendChild(c);

    tt.appendChild(b);

    document.body.appendChild(tt);

    tt.style.opacity = 0;

    tt.style.filter = 'alpha(opacity=0)';

    document.onmousemove = this.pos;

   }

   tt.style.display = 'block';

   c.innerHTML = v;

   tt.style.width = w ? w + 'px' : 'auto';

   if(!w && ie){

    t.style.display = 'none';

    b.style.display = 'none';

    tt.style.width = tt.offsetWidth;

    t.style.display = 'block';

    b.style.display = 'block';

   }

  if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}

  h = parseInt(tt.offsetHeight) + top;

  clearInterval(tt.timer);

  tt.timer = setInterval(function(){tooltip.fade(1)},timer);

  },

  pos:function(e){

   var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;

   var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;

   tt.style.top = (u - h) + 'px';

   tt.style.left = (l + left) + 'px';

  },

  fade:function(d){

   var a = alpha;

   if((a != endalpha && d == 1) || (a != 0 && d == -1)){

    var i = speed;

   if(endalpha - a < speed && d == 1){

    i = endalpha - a;

   }else if(alpha < speed && d == -1){

     i = a;

   }

   alpha = a + (i * d);

   tt.style.opacity = alpha * .01;

   tt.style.filter = 'alpha(opacity=' + alpha + ')';

  }else{

    clearInterval(tt.timer);

     if(d == -1){tt.style.display = 'none'}

  }

 },

 hide:function(){

  clearInterval(tt.timer);

   tt.timer = setInterval(function(){tooltip.fade(-1)},timer);

  }

 };

}();



var map;

// var layers = [];

//var layerl0;

function initialize() {

map = new google.maps.Map(document.getElementById('map-canvas'), {

center: new google.maps.LatLng(6.730076, 20.387192),

zoom: 6,
navigationControl: true,

		streetViewControl:false,

mapTypeId: google.maps.MapTypeId.ROADMAP

});




layer = new google.maps.FusionTablesLayer({

query: {

select: "col1",

from: "1_EnQ1123owEDbo0TAOV0EOM9ji6AN5UOHDaLIGs"

},



//styles: [{

 // markerOptions: {

 //   labelContent: "$425K"

 // }

//}],



map: map,

styleId: 2,

templateId: 2

});

var Bangui = new MarkerWithLabel({
       position: new google.maps.LatLng(4.362073, 18.554951),
	   clickable: false,
	   map: map,
       labelContent: "Bangui",
 //      labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
	//   labelStyle: {opacity: 1},
       icon: {}
     });  
	 
	 
var Ndele = new MarkerWithLabel({
       position: new google.maps.LatLng(8.409291, 20.649391),
	   clickable: false,
	   map: map,
       labelContent: "Ndele",
 //      labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
//	   labelStyle: {opacity: 0.75},
       icon: {}
     });  

var Ouadda = new MarkerWithLabel({
       position: new google.maps.LatLng(8.071807, 22.399578),
	   clickable: false,
	   map: map,
       labelContent: "Ouadda",
   //    labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
	//   labelStyle: {opacity: 0.75},
       icon: {}
     });  

var SamOuandja = new MarkerWithLabel({
       position: new google.maps.LatLng(8.528637, 23.25123),
	   clickable: false,
	   map: map,
       labelContent: "Sam Ouandja",
 //      labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
	//   labelStyle: {opacity: 1},
       icon: {}
     });  

var Bamingui = new MarkerWithLabel({
       position: new google.maps.LatLng(7.550549, 20.179396),
	   clickable: false,
	   map: map,
       labelContent: "Bamingui",
 //      labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
	//   labelStyle: {opacity: 0.75},
       icon: {}
     });  

var Mbres = new MarkerWithLabel({
       position: new google.maps.LatLng(6.669680, 19.796376),
	   clickable: false,
	   map: map,
       labelContent: "Mbres",
 //      labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
//	   labelStyle: {opacity: 0.75},
       icon: {}
     });  

var Bria = new MarkerWithLabel({
       position: new google.maps.LatLng(6.538676, 21.992054),
	   clickable: false,
	   map: map,
       labelContent: "Bria",
 //      labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
//	   labelStyle: {opacity: 0.75},
       icon: {}
     });  

var Kabo = new MarkerWithLabel({
       position: new google.maps.LatLng(7.689557, 18.620281),
	   clickable: false,
	   map: map,
       labelContent: "Kabo",
  //     labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
//	   labelStyle: {opacity: 0.75},
       icon: {}
     });  

var Batangafo = new MarkerWithLabel({
       position: new google.maps.LatLng(7.308155, 18.291893),
	   clickable: false,
	   map: map,
       labelContent: "Batangafo",
  //     labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
//	   labelStyle: {opacity: 0.75},
       icon: {}
     });  

var Ippy = new MarkerWithLabel({
       position: new google.maps.LatLng(6.264366, 21.198206),
	   clickable: false,
	   map: map,
       labelContent: "Ippy",
  //     labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
	//   labelStyle: {opacity: 0.75},
       icon: {}
     });  	 
	 
var Bambari = new MarkerWithLabel({
       position: new google.maps.LatLng(5.762033, 20.670776),
	   clickable: false,
	   map: map,
       labelContent: "Bambari",
 //      labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
//	   labelStyle: {opacity: 0.75},
       icon: {}
     });  

var KagaBandoro = new MarkerWithLabel({
       position: new google.maps.LatLng(6.998270, 19.178352),
	   clickable: false,
	   map: map,
       labelContent: "Kaga Bandoro",
  //     labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
//	   labelStyle: {opacity: 0.75},
       icon: {}
     });  
var Sibut = new MarkerWithLabel({
       position: new google.maps.LatLng(5.735133, 19.083424),
	   clickable: false,
	   map: map,
       labelContent: "Sibut",
 //      labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
	//   labelStyle: {opacity: 0.75},
       icon: {}
     });  
var Damara = new MarkerWithLabel({
       position: new google.maps.LatLng(4.956579, 18.699117),
	   clickable: false,
	   map: map,
       labelContent: "Damara",

       labelClass: "labels",
	//   labelStyle: {opacity: 1},
       icon: {}
     });  
var Paoua = new MarkerWithLabel({
       position: new google.maps.LatLng(7.180607, 16.464386),
	   clickable: false,
	   map: map,
       labelContent: "Paoua",
 //      labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
//	   labelStyle: {opacity: 0.75},
       icon: {}
     });  
var Birao = new MarkerWithLabel({
       position: new google.maps.LatLng(10.293301, 22.782383),
	   clickable: false,
	   map: map,
       labelContent: "Birao",
   //    labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
//	   labelStyle: {opacity: 0.75},
       icon: {}
     });  
var Mboki = new MarkerWithLabel({
       position: new google.maps.LatLng(5.315535, 25.957003),
	   clickable: false,
	   map: map,
       labelContent: "Mboki",
  //     labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
	//   labelStyle: {opacity: 0.75},
       icon: {}
     });  
var Obo = new MarkerWithLabel({
       position: new google.maps.LatLng(5.396163, 26.491899),
	   clickable: false,
	   map: map,
       labelContent: "Obo",
   //    labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
//	   labelStyle: {opacity: 0.75},
       icon: {}
     });  
var Djema = new MarkerWithLabel({
       position: new google.maps.LatLng(6.046101, 25.325831),
	   clickable: false,
	   map: map,
       labelContent: "Djema",
//       labelAnchor: new google.maps.Point(22, 0),
       labelClass: "labels",
//	   labelStyle: {opacity: 0.75},
       icon: {}
     });  
var CAR = new MarkerWithLabel({
       position: new google.maps.LatLng(7.776309, 22.894650),
	   clickable: false,
	   map: map,
       labelContent: "Central<br \>African<br \>Republic",
//       labelAnchor: new google.maps.Point(22, 0),
       labelClass: "mainlabel",
//	   labelStyle: {opacity: 0.75},
       icon: {}
     });  	 



  var style = [
  {
    "featureType": "administrative.country",
    "elementType": "labels.text",
    "stylers": [
      { "visibility": "simplified" },
	      ]
  },
  
  {

    "stylers": [

      { "hue": "#ffbb00" }

    ]

  }
  
];



  var styledMapType = new google.maps.StyledMapType(style, {

    map: map,

    name: 'Styled Map'

  });



  map.mapTypes.set('map-style', styledMapType);

  map.setMapTypeId('map-style');

  

  $(function() {


    $('#slider').slider({

        max: 11,

        min: 0,

        step: 1,

        value: 11,

        slide: function(event, ui) {
		
var increment = ui.value;
var infobox
if (increment === 1){
infobox = "Date: 10-12-2012";
}
else if (increment === 2) {
infobox = "Date: 15-12-2012";
}
else if (increment === 3) {
infobox = "Date: 16 & 17-12-2012";
}
else if (increment === 4) {
infobox = "Date: 18-12-2012";
}
else if (increment === 5) {
infobox = "Date: 19-12-2012";
}
else if (increment === 6) {
infobox = "Date: 20-12-2012";
}
else if (increment === 7) {
infobox = "Date: 22-12-2012";
}
else if (increment === 8) {
infobox = "Date: 23-12-2012";
}
else if (increment === 9) {
infobox = "Date: 25-12-2012";
}
else if (increment === 10) {
infobox = "Date: 29-12-2012";
}
else if (increment === 11) {
infobox = "Date: 24-3-2013";
}
else {
infobox = "Date: 11-2012";
};
			

                       layer.setOptions({

                query: {

                    select: 'col1',

                    from: '1_EnQ1123owEDbo0TAOV0EOM9ji6AN5UOHDaLIGs',

                    where: 'col3 <= ' +  ui.value

                }

								

            });		
document.getElementById('infobox').innerHTML = infobox;
document.getElementById('dateHolder').innerHTML = " ";
			

        }

    });

});

  

  

  



  



  

  

      }









google.maps.event.addDomListener(window, 'load', initialize);








