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

	$('a[href*=#]').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body')
					.animate({
						scrollTop: targetOffset
					}, 800); //set scroll speed here
				return false;
			}
		}
	});


	/*==========================================
  PARALLAX SCRIPTS
   =====================================================*/


	$('.parallax').scrolly({
		bgParallax: true
	});

	/*==========================================
    WRITE  YOUR  SCRIPTS BELOW
    =====================================================*/

});

//this gets ugly
var data = [{
	"label": "Health/Medicine",
	"value": 17.5,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "International/Intercultural",
	"value": 14.7,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Education",
	"value": 12.6,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "JD or other law-related",
	"value": 7.8,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Env. Science, Conservation, or Ecology",
	"value": 6.9,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Liberal Arts",
	"value": 6,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "MPA, MPP or NPO management",
	"value": 5.3,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Social Science",
	"value": 5,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Business or MBA",
	"value": 4.5,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Arts",
	"value": 3.9,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Anthropology",
	"value": 3.3,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "MSW",
	"value": 3.2,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Psychology/Counseling",
	"value": 2.5,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "General science",
	"value": 2.5,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Peacebuilding",
	"value": 1.4,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Geography",
	"value": 1,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Religion",
	"value": 0.9,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Engineering",
	"value": 0.5,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "Other",
	"value": 0.3,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": "IT",
	"value": 0.2,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": null,
	"value": null,
	"respondents": 2,
	"decade": "1980-1989",
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": null,
	"value": null,
	"respondents": 18,
	"decade": "1990-1999",
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": null,
	"value": null,
	"respondents": 61,
	"decade": "2000-2009",
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": null,
	"value": null,
	"respondents": 19,
	"decade": "2010-2011",
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": null
}, {
	"label": null,
	"value": null,
	"respondents": null,
	"decade": null,
	"all": 2107,
	"job": 72,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": "influenced"
}, {
	"label": null,
	"value": null,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": 28,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": "not influenced"
}, {
	"label": null,
	"value": null,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": 81,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": "gained sense of social responsibility"
}, {
	"label": null,
	"value": null,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": 19,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": "did not gain sense of social responsibility"
}, {
	"label": null,
	"value": null,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": 78,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": "influenced"
}, {
	"label": null,
	"value": null,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": 22,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": "not influenced"
}, {
	"label": null,
	"value": null,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": 99,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": "earned advanced degrees"
}, {
	"label": null,
	"value": null,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": 1,
	"engage": null,
	"highereddecision": null,
	"highereddecisionlabel": "did not earn advanced degrees"
}, {
	"label": null,
	"value": null,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": 59,
	"highereddecision": null,
	"highereddecisionlabel": "continue to engage"
}, {
	"label": null,
	"value": null,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": 41,
	"highereddecision": null,
	"highereddecisionlabel": "do not continue to engage"
}, {
	"label": null,
	"value": null,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": 64,
	"highereddecisionlabel": "influenced"
}, {
	"label": null,
	"value": null,
	"respondents": null,
	"decade": null,
	"all": null,
	"job": null,
	"career": null,
	"healthjob": null,
	"healthdegrees": null,
	"engage": null,
	"highereddecision": 36,
	"highereddecisionlabel": "not influenced"
}];

var total = d3.sum(data, function(d) {
	return d3.sum(d3.values(d));
});
pi = 3.141592653589793238462643383279502884197169;

var width = 1000,
	height = 500,
	radius = Math.min(width, height) / 2;

var color = d3.scale.category20(); //builtin range of colors

var pie = d3.layout.pie()
	.value(function(d) {
		return d.all;
	})
	.sort(null)
	.startAngle(-180 * (pi / 180))
	.endAngle(180 * (pi / 180));

var arc = d3.svg.arc()
	.innerRadius(radius - 100)
	.outerRadius(radius - 20);

var arcOver = d3.svg.arc()
	.innerRadius((radius - 100) + 5)
	.outerRadius((radius - 20) + 5);

var textTopContent = "2,107"
textBottomContent = "alumni"
textBottomBottomContent = ""
textQuoteLineOneContent = "We asked 2,107 alumni of SIT"
textQuoteLineTwoContent = "study abroad programs how their"
textQuoteLineThreeContent = "time overseas affected their lives."


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
	textBottomBottom = svg.append("text")
		.attr("dy", ".35em")
		.style("text-anchor", "middle")
		.attr("class", "textBottom")
		.text(textBottomBottomContent)
		.attr("y", 35),
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
	.attr("fill", function(d, i) {
		return color(i);
	})
	.attr("d", arc)
	.each(function(d) {
		this._current = d;
	}) // store the initial angles
.on("mouseover", function(d) {
	d3.select(this).transition()
		.duration(200)
		.attr("d", arcOver)
	if (document.getElementById("degree").checked) {
		textTop.text(d3.select(this).datum().data.value + "%")
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.label)
			.attr("y", 20);
	} else if (document.getElementById("all").checked) {
		textTop.text(" ")
			.attr("y", -10);
		textBottom.text("(Click a different value.)")
			.attr("y", 0);
	} else if (document.getElementById("highereddecision").checked) {
		textTop.text(d3.select(this).datum().data.highereddecision + "%")
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.highereddecisionlabel)
			.attr("y", 20);
		textBottomBottom.text("")
			.attr("y", 35);
	} else if (document.getElementById("job").checked) {
		textTop.text(d3.select(this).datum().data.job + "%")
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.highereddecisionlabel)
			.attr("y", 20);
		textBottomBottom.text("")
			.attr("y", 35);
	} else if (document.getElementById("healthjob").checked) {
		textTop.text(d3.select(this).datum().data.healthjob + "%")
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.highereddecisionlabel)
			.attr("y", 20);
		textBottomBottom.text("")
			.attr("y", 35);
	} else if (document.getElementById("career").checked) {
		textTop.text(d3.select(this).datum().data.career + "%")
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.highereddecisionlabel)
			.attr("y", 20);
		textBottomBottom.text("")
			.attr("y", 35);
	} else if (document.getElementById("healthdegrees").checked) {
		textTop.text(d3.select(this).datum().data.healthdegrees + "%")
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.highereddecisionlabel)
			.attr("y", 20);
		textBottomBottom.text("")
			.attr("y", 35);
	} else if (document.getElementById("engage").checked) {
		textTop.text(d3.select(this).datum().data.engage + "%")
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.highereddecisionlabel)
			.attr("y", 20);
		textBottomBottom.text("")
			.attr("y", 35);
	} else if (document.getElementById("decade").checked) {
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
		if (document.getElementById("degree").checked) {
			textTop.text("1,377")
				.attr("y", -10);
			textBottom.text("with advanced degrees");
		} else if (document.getElementById("all").checked) {
			textTop.text("2,107")
				.attr("y", -10);
			textBottom.text("alumni")
				.attr("y", 20);
		} else if (document.getElementById("highereddecision").checked) {
			textTop.text("64%")
				.attr("y", -10);
			textBottom.text("influenced to pursue")
				.attr("y", 20);
			textBottomBottom.text("an advanced degree")
		} else if (document.getElementById("job").checked) {
			textTop.text("72%")
				.attr("y", -10);
			textBottom.text("influenced career choice")
				.attr("y", 20);
			textBottomBottom.text("")
		} else if (document.getElementById("healthjob").checked) {
			textTop.text("78%")
				.attr("y", -10);
			textBottom.text("influenced career choice")
				.attr("y", 20);
			textBottomBottom.text("for alumni of health programs")
		} else if (document.getElementById("career").checked) {
			textTop.text("78%")
				.attr("y", -10);
			textBottom.text("gained a sense of social responsibility")
				.attr("y", 20);
			textBottomBottom.text("or interest in social issues")
		} else if (document.getElementById("healthdegrees").checked) {
			textTop.text("78%")
				.attr("y", -10);
			textBottom.text("of health program alumni")
				.attr("y", 20);
			textBottomBottom.text("earned advanced degrees")
		} else if (document.getElementById("engage").checked) {
			textTop.text("78%")
				.attr("y", -10);
			textBottom.text("continue to engage")
				.attr("y", 20);
			textBottomBottom.text("")
		} else if (document.getElementById("decade").checked) {
			textTop.text("4")
				.attr("y", -10);
			textBottom.text("decades");
		}
	});



d3.selectAll("input")
	.on("change", change);

function change() {
	var value = this.value;
	pie.value(function(d) {
		return d[value];
	}); // change the value function
	if (value == "xxx") {
		pie.startAngle(-117.6364499288094 * (pi / 180))
		pie.endAngle(117.6364499288094 * (pi / 180))
	} else {
		pie.startAngle(-180 * (pi / 180))
		pie.endAngle(180 * (pi / 180))
	}

	path = path.data(pie); // compute the new angles
	path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
	if (value === "respondents") {
		textTopContent = "4"
		textBottomContent = "decades"
		textQuoteLineOneContent = "Alumni responses represented"
		textQuoteLineTwoContent = "four decades of SIT history."
		textQuoteLineThreeContent = ""
		textBottomBottomContent = ""
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)

	} else if (value == "job") {
		textTopContent = "72%"
		textBottomContent = "influenced career choice"
		textBottomBottomContent = ""
		textQuoteLineOneContent = "72% said their study abroad"
		textQuoteLineTwoContent = "experience influenced"
		textQuoteLineThreeContent = "their choice of career."
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)
	} else if (value == "highereddecision") {
		textTopContent = "64%"
		textBottomContent = "influenced to pursue"
		textBottomBottomContent = "an advanced degree"
		textQuoteLineOneContent = "64% said their study abroad"
		textQuoteLineTwoContent = "influenced them to pursue"
		textQuoteLineThreeContent = "an advanced degree."
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)
	} else if (value == "healthjob") {
		textTopContent = "78%"
		textBottomBottomContent = "for health program alumni"
		textBottomContent = "influenced career choice"
		textBottomBottomContent = "for alumni of health programs"
		textQuoteLineOneContent = "But 78% of health program alumni"
		textQuoteLineTwoContent = "said study abroad influenced"
		textQuoteLineThreeContent = "their choice of career."
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)
	} else if (value == "career") {
		textTopContent = "81%"
		textBottomBottomContent = "or interest in social issues"
		textBottomContent = "gained a sense of social responsibility"
		textQuoteLineOneContent = "81% said that study abroad"
		textQuoteLineTwoContent = "imparted an interest in social"
		textQuoteLineThreeContent = "issues that influenced their careers."
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)
	} else if (value == "healthdegrees") {
		textTopContent = "99%"
		textBottomContent = "of health program alumni"
		textBottomBottomContent = "earned advanced degrees"
		textQuoteLineOneContent = "Nearly every alumnus of"
		textQuoteLineTwoContent = "a health program now has"
		textQuoteLineThreeContent = "an advanced degree."
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)
	} else if (value == "engage") {
		textTopContent = "59%"
		textBottomBottomContent = ""
		textBottomContent = "continue to engage"
		textBottomBottomContent = ""
		textQuoteLineOneContent = "59% said they continue to"
		textQuoteLineTwoContent = "engage with issues that they"
		textQuoteLineThreeContent = "studied abroad."
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)
	} else if (value == "value") {
		textTopContent = "1,377"
		textBottomContent = "with advanced degrees"
		textBottomBottomContent = ""
		textQuoteLineOneContent = "1,377 held advanced degrees,"
		textQuoteLineTwoContent = "much higher than U.S."
		textQuoteLineThreeContent = "national averages."
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)
	} else if (value == "all") {
		textTopContent = "2,107"
		textBottomContent = "alumni"
		textBottomBottomContent = ""
		textQuoteLineOneContent = "We asked 2,107 alumni of SIT"
		textQuoteLineTwoContent = "study abroad programs how their"
		textQuoteLineThreeContent = "time overseas affected their lives."
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)
		pie.startAngle(-180 * (pi / 180))
		pie.endAngle(180 * (pi / 180))
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
