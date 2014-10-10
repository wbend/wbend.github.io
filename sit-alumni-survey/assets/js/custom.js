
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

var data = [{"label":"Health/Medicine","value":241,"oranges":1},{"label":"International/Intercultural","value":203,"oranges":2},{"label":"Education","value":174,"oranges":3},{"label":"JD or other law-related","value":107,"oranges":4},{"label":"Environmental Science, Conservation, or Ecology-related","value":95,"oranges":5},{"label":"Liberal Arts","value":82,"oranges":6},{"label":"MPA, MPP or nonprofit management","value":73,"oranges":7},{"label":"Social Science (not Anthropology)","value":69,"oranges":8},{"label":"Business or MBA","value":62,"oranges":9},{"label":"Arts","value":54,"oranges":1},{"label":"Anthropology","value":45,"oranges":2},{"label":"MSW","value":44,"oranges":3},{"label":"Psychology/Counseling","value":35,"oranges":4},{"label":"General science","value":34,"oranges":5},{"label":"Peacebuilding","value":19,"oranges":6},{"label":"Geography","value":14,"oranges":7},{"label":"Religion","value":12,"oranges":8},{"label":"Engineering","value":7,"oranges":9},{"label":"Other","value":4,"oranges":0},{"label":"IT","value":3,"oranges":0}];

var total = d3.sum(data, function(d) {
    return d3.sum(d3.values(d));
});

var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;
 
var color = d3.scale.category20();		//builtin range of colors
 
var pie = d3.layout.pie()
    .value(function(d) { return d.value; })
    .sort(null);
 
var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);
	
var arcOver = d3.svg.arc()
    .innerRadius((radius - 100) + 5)
    .outerRadius((radius - 20) + 5);	
 
var svg = d3.select("#viz").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
  //place chart in center of viewport
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	
var textTop = svg.append("text")
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .attr("class", "textTop")
    .text(total + " respondents held advanced degrees.")
    .attr("y", -10),
textBottom = svg.append("text")
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .attr("class", "textBottom")
    .text("Mouse over the graph for details.")
    .attr("y", 10),
textQuoteLineOne = svg.append("text")
    .attr("dy", "-13em")
    .attr("dx", "-30em")
    .style("text-anchor", "left")
    .attr("class", "textQuote")
    .text("\"Study abroad alumni achieve bachelor’s degrees")
	.attr("y", -10);
textQuoteLineTwo = svg.append("text")
    .attr("dy", "-13em")
    .attr("dx", "-30em")
    .style("text-anchor", "left")
    .attr("class", "textQuote")
    .text("and advanced degrees at higher rates than")
	.attr("y", 10);
textQuoteLineThree = svg.append("text")
    .attr("dy", "-13em")
    .attr("dx", "-30em")
    .style("text-anchor", "left")
    .attr("class", "textQuote")
    .text("non-study abroad students.\"")
	.attr("y", 30);			

console.log(data);

var path = svg.datum(data).selectAll("path")
.data(pie)
.enter().append("path")
.attr("fill", function(d, i) { return color(i); })
.attr("d", arc)
.each(function(d) { this._current = d;})	// store the initial angles
.on("mouseover", function (d) {	
	d3.select(this).transition()
	    .duration(200)
        .attr("d", arcOver)
	textTop.text(d3.select(this).datum().data.value + " respondents held a")
        .attr("y", -10);
	textBottom.text(d3.select(this).datum().data.label + " degree.")
        .attr("y", 10);
	})
.on("mouseout", function(d) {
    d3.select(this).transition()
        .duration(100)
        .attr("d", arc);
	textTop.text(total + " respondents held advanced degrees.")
        .attr("y", -10);
        textBottom.text("Mouse over the graph for details.");
	});
					





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


 