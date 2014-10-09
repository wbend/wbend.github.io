
/*=============================================================
    Authour URI: www.binarytheme.com
    License: Commons Attribution 3.0

    http://creativecommons.org/licenses/by/3.0/

    100% To use For Personal And Commercial Use.
    IN EXCHANGE JUST GIVE US CREDITS AND TELL YOUR FRIENDS ABOUT US
   
    ========================================================  */


jQuery(function($) {

    /*==========================================
    CUSTOM SCRIPTS
    =====================================================*/

    // CUSTOM LINKS SCROLLING FUNCTION 

    $('a[href*=#]').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
       && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target
            || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body')
                .animate({ scrollTop: targetOffset }, 800); //set scroll speed here
                return false;
            }
        }
    });

    /*==========================================
  PARALLAX SCRIPTS
   =====================================================*/

    
    $('.parallax').scrolly({ bgParallax: true });

    /*==========================================
    WRITE  YOUR  SCRIPTS BELOW
    =====================================================*/

});


var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;
 
var color = d3.scale.category20();
 
var pie = d3.layout.pie()
    .value(function(d) { return d.count; })
    .sort(null);
 
var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);
 
var svg = d3.select("#viz").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
  //place chart in center of viewport
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

/*jshint multistr: true */
var tsvData = "degree	count	oranges\n\
Health/Medicine	241	7\n\
International/Intercultural	203	8\n\
Education	174	5\n\
JD or other law-related degree	107	4\n\
Environmental Science, Conservation, or Ecology-related	95	1\n\
Liberal Arts	82	5\n\
MPA, MPP or nonprofit management	73	3\n\
Social Science (not Anthropology)	69	9\n\
Business or MBA	62	9\n\
Arts	54	7\n\
Anthropology	45	6\n\
MSW	44	6\n\
Psychology/Counseling	35	8\n\
General science	34	4\n\
Peacebuilding	19	9\n\
Geography	14	5\n\
Religion	12	9\n\
Engineering	7	7\n\
Other	4	4";

var data = d3.tsv.parse(tsvData);

console.log(data);



var path = svg.datum(data).selectAll("path")
.data(pie)
.enter().append("path")
.attr("fill", function(d, i) { return color(i); })
.attr("d", arc)
.each(function(d) { this._current = d;})
    .on("mouseover", function (d) {
    d3.select("#tooltip")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px")
        .style("opacity", 1)
        .select("#value")
        .text(d.value);
})
    .on("mouseout", function () {
    // Hide the tooltip
    d3.select("#tooltip")
        .style("opacity", 0);;
}); // store the initial angles



d3.selectAll("input")
.on("change", change);

function change() {
  var value = this.value;
  pie.value(function(d) { return d[value]; }); // change the value function
  path = path.data(pie); // compute the new angles
  path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}


 