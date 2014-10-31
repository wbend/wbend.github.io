

var data = [{"label":"Health/Medicine","value":17.5,"respondents":null,"decade":null,"all":null},{"label":"International","value":14.7,"respondents":null,"decade":null,"all":null},{"label":"Education","value":12.6,"respondents":null,"decade":null,"all":null},{"label":"JD","value":7.8,"respondents":null,"decade":null,"all":null},{"label":"Environmental Science, Conservation, or Ecology-related","value":6.9,"respondents":null,"decade":null,"all":null},{"label":"Liberal Arts","value":6,"respondents":null,"decade":null,"all":null},{"label":"MPA, MPP or nonprofit management","value":5.3,"respondents":null,"decade":null,"all":null},{"label":"Social Science (not Anthropology)","value":5,"respondents":null,"decade":null,"all":null},{"label":"Business or MBA","value":4.5,"respondents":null,"decade":null,"all":null},{"label":"Arts","value":3.9,"respondents":null,"decade":null,"all":null},{"label":"Anthropology","value":3.3,"respondents":null,"decade":null,"all":null},{"label":"MSW","value":3.2,"respondents":null,"decade":null,"all":null},{"label":"Psychology/Counseling","value":2.5,"respondents":null,"decade":null,"all":null},{"label":"General science","value":2.5,"respondents":null,"decade":null,"all":null},{"label":"Peacebuilding","value":1.4,"respondents":null,"decade":null,"all":null},{"label":"Geography","value":1,"respondents":null,"decade":null,"all":null},{"label":"Religion","value":0.9,"respondents":null,"decade":null,"all":null},{"label":"Engineering","value":0.5,"respondents":null,"decade":null,"all":null},{"label":"Other","value":0.3,"respondents":null,"decade":null,"all":null},{"label":"IT","value":0.2,"respondents":null,"decade":null,"all":null},{"label":null,"value":null,"respondents":2,"decade":"1980-1989","all":null},{"label":null,"value":null,"respondents":18,"decade":"1990-1999","all":null},{"label":null,"value":null,"respondents":61,"decade":"2000-2009","all":null},{"label":null,"value":null,"respondents":19,"decade":"2010-2011","all":null},{"label":null,"value":null,"respondents":null,"decade":null,"all":2107}];

var total = d3.sum(data, function(d) {
    return d3.sum(d3.values(d));
});

var width = 1000,
    height = 500,
    radius = Math.min(width, height) / 2;
 
var color = d3.scale.category20();		//builtin range of colors
 
var pie = d3.layout.pie()
    .value(function(d) { return d.all; })
    .sort(null);
 
var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);
	
var arcOver = d3.svg.arc()
    .innerRadius((radius - 100) + 5)
    .outerRadius((radius - 20) + 5);	

var textTopContent = "2,107"
	textBottomContent = "alumni"
	textQuoteLineOneContent = ""
	textQuoteLineTwoContent = ""
	textQuoteLineThreeContent = ""

 
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
    .attr("y", 20),
textQuoteLineOne = svg.append("text")
    .attr("dy", "0em")
    .attr("dx", "-25em")
    .style("text-anchor", "right")
    .attr("class", "textQuote")
    .text(textQuoteLineOneContent)
	.attr("y", -30);
textQuoteLineTwo = svg.append("text")
    .attr("dy", "0em")
    .attr("dx", "-25em")
    .style("text-anchor", "right")
    .attr("class", "textQuote")
    .text(textQuoteLineTwoContent)
	.attr("y", 0);
textQuoteLineThree = svg.append("text")
    .attr("dy", "0em")
    .attr("dx", "-25em")
    .style("text-anchor", "right")
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
	textTop.text(d3.select(this).datum().data.value + "%")
        .attr("y", -10);
	textBottom.text(d3.select(this).datum().data.label)
        .attr("y", 20);
	}else if (document.getElementById("all").checked){
		textTop.text(" ")
	        .attr("y", -10);
		textBottom.text("(Click a different value.)")
	        .attr("y", 0);
		}
		 else if (document.getElementById("decade").checked){
	textTop.text(d3.select(this).datum().data.respondents + "%")
        .attr("y", -10);
	textBottom.text("studied abroad " + d3.select(this).datum().data.decade)
        .attr("y", 20);
	}
	
	})
.on("mouseout", function(d) {
    d3.select(this).transition()
        .duration(100)
        .attr("d", arc);
		if (document.getElementById("degree").checked){
	textTop.text("1,377")
        .attr("y", -10);
    textBottom.text("with advanced degrees");
}
else if (document.getElementById("all").checked){
		textTop.text("2,107")
        .attr("y", -10);
		textBottom.text("alumni")
	        .attr("y", 20);
		}
		else if (document.getElementById("decade").checked){
			textTop.text("4")
		        .attr("y", -10);
		    textBottom.text("decades");}
	});
					





d3.selectAll("input")
.on("change", change);

function change() {
  var value = this.value;
  pie.value(function(d) { return d[value]; }); // change the value function
  path = path.data(pie); // compute the new angles
  path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
  if(value === "respondents"){
	  textTopContent = "4"
	  textBottomContent = "decades"
  	  textQuoteLineOneContent = ""
  	  textQuoteLineTwoContent = ""
  	  textQuoteLineThreeContent = ""
	  textTop.text(textTopContent)
	  textBottom.text(textBottomContent)
	  textQuoteLineOne.text(textQuoteLineOneContent)
	  textQuoteLineTwo.text(textQuoteLineTwoContent)
	  textQuoteLineThree.text(textQuoteLineThreeContent)
  }
  else if (value == "value"){
	  textTopContent = "1,377"
	  textBottomContent = "advanced degrees"
  	  textQuoteLineOneContent = ""
  	  textQuoteLineTwoContent = ""
  	  textQuoteLineThreeContent = ""
	  textTop.text(textTopContent)
	  textBottom.text(textBottomContent)
	  textQuoteLineOne.text(textQuoteLineOneContent)
	  textQuoteLineTwo.text(textQuoteLineTwoContent)
	  textQuoteLineThree.text(textQuoteLineThreeContent)
  }
  else if (value == "all"){
	  textTopContent = "2,107"
	  textBottomContent = "alumni"
  	textQuoteLineOneContent = ""
  	textQuoteLineTwoContent = ""
  	textQuoteLineThreeContent = ""
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


 