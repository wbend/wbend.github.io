
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

var data = [{"label":"Health/Medicine","value":241,"respondents":2,"decade":"1980 & 1989"},{"label":"International/Intercultural","value":203,"respondents":18,"decade":"1990  & 1999"},{"label":"Education","value":174,"respondents":61,"decade":"2000 & 2009"},{"label":"JD or other law-related","value":107,"respondents":19,"decade":"2010 & 2011"},{"label":"Environmental Science, Conservation, or Ecology-related","value":95,"respondents":null,"decade":null},{"label":"Liberal Arts","value":82,"respondents":null,"decade":null},{"label":"MPA, MPP or nonprofit management","value":73,"respondents":null,"decade":null},{"label":"Social Science (not Anthropology)","value":69,"respondents":null,"decade":null},{"label":"Business or MBA","value":62,"respondents":null,"decade":null},{"label":"Arts","value":54,"respondents":null,"decade":null},{"label":"Anthropology","value":45,"respondents":null,"decade":null},{"label":"MSW","value":44,"respondents":null,"decade":null},{"label":"Psychology/Counseling","value":35,"respondents":null,"decade":null},{"label":"General science","value":34,"respondents":null,"decade":null},{"label":"Peacebuilding","value":19,"respondents":null,"decade":null},{"label":"Geography","value":14,"respondents":null,"decade":null},{"label":"Religion","value":12,"respondents":null,"decade":null},{"label":"Engineering","value":7,"respondents":null,"decade":null},{"label":"Other","value":4,"respondents":null,"decade":null}];

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

var textTopContent = total + " respondents held advanced degrees."
	textBottomContent = "Mouse over the graph for details."
	textQuoteLineOneContent = "\"Study abroad alumni achieve bachelor’s degrees"
	textQuoteLineTwoContent = "and advanced degrees at higher rates than"
	textQuoteLineThreeContent = "non-study abroad students.\""

 
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
    .text(textTopContent)
    .attr("y", -10),
textBottom = svg.append("text")
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .attr("class", "textBottom")
    .text(textBottomContent)
    .attr("y", 10),
textQuoteLineOne = svg.append("text")
    .attr("dy", "-13em")
    .attr("dx", "-30em")
    .style("text-anchor", "left")
    .attr("class", "textQuote")
    .text(textQuoteLineOneContent)
	.attr("y", -10);
textQuoteLineTwo = svg.append("text")
    .attr("dy", "-13em")
    .attr("dx", "-30em")
    .style("text-anchor", "left")
    .attr("class", "textQuote")
    .text(textQuoteLineTwoContent)
	.attr("y", 10);
textQuoteLineThree = svg.append("text")
    .attr("dy", "-13em")
    .attr("dx", "-30em")
    .style("text-anchor", "left")
    .attr("class", "textQuote")
    .text(textQuoteLineThreeContent)
	.attr("y", 30);			

console.log(data);
var value = this.value;

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
	if (document.getElementById("degree").checked){
	textTop.text(d3.select(this).datum().data.value + " respondents held a")
        .attr("y", -10);
	textBottom.text(d3.select(this).datum().data.label + " degree.")
        .attr("y", 10);
	} else if (document.getElementById("decade").checked){
	textTop.text(d3.select(this).datum().data.respondents + "% of respondents")
        .attr("y", -10);
	textBottom.text("studied abroad between " + d3.select(this).datum().data.decade + ".")
        .attr("y", 10);
	}
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
  if(value === "respondents"){
	  textTopContent = "Mouse over the graph"
	  textBottomContent = "to see a decade breakdown."
  	  textQuoteLineOneContent = "Though the alumni e-mails that SIT had in the system"
  	  textQuoteLineTwoContent = "were not evenly distributed across the years,"
  	  textQuoteLineThreeContent = "the response rate was fairly consistent by decade."
	  textTop.text(textTopContent)
	  textBottom.text(textBottomContent)
	  textQuoteLineOne.text(textQuoteLineOneContent)
	  textQuoteLineTwo.text(textQuoteLineTwoContent)
	  textQuoteLineThree.text(textQuoteLineThreeContent)
  }
  else if (value == "value"){
	  textTopContent = total + " respondents held advanced degrees."
	  textBottomContent = "Mouse over the graph for details."
  	  textQuoteLineOneContent = "\"Study abroad alumni achieve bachelor’s degrees"
  	  textQuoteLineTwoContent = "and advanced degrees at higher rates than"
  	  textQuoteLineThreeContent = "non-study abroad students.\""
	  textTop.text(textTopContent)
	  textBottom.text(textBottomContent)
	  textQuoteLineOne.text(textQuoteLineOneContent)
	  textQuoteLineTwo.text(textQuoteLineTwoContent)
	  textQuoteLineThree.text(textQuoteLineThreeContent)
  };
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


 