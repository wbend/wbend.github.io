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
var data = [
    {
        "all": 220,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": null,
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "East Asia and the Pacific (WHA)",
        "major": null,
        "region": 56
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Western Hemisphere (WHA)",
        "major": null,
        "region": 82
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Near East, South Asia (NESA)",
        "major": null,
        "region": 25
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Serbia and Montenegro (SAM)",
        "major": null,
        "region": 57
    },
    {
        "all": null,
        "country": null,
        "gender": 120,
        "hostinstitution": null,
        "label": "male",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": 100,
        "hostinstitution": null,
        "label": "female",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 6,
        "label": "American University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 3,
        "label": "Augustana College",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 1,
        "label": "Barnard College",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 1,
        "label": "Bennett College",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 5,
        "label": "California State - Monterey Bay",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 4,
        "label": "California State - San Marcos",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "Carroll College",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 6,
        "label": "Chatham University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "Depauw University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 3,
        "label": "East Tennessee State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 4,
        "label": "Emporia State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 3,
        "label": "Endicott College",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 3,
        "label": "Fairleigh Dickinson University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 3,
        "label": "Florida Gulf Coast University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 6,
        "label": "Grand Valley State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 7,
        "label": "Humboldt State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 1,
        "label": "Illinois Institute of Technology",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 5,
        "label": "Illinois State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "Juniata College",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 6,
        "label": "Kent State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 4,
        "label": "Lincoln University of Pennsylvania",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "Millikin University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 4,
        "label": "Minnesota State University Mankato",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 6,
        "label": "Missouri State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "Montclair State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "Murray State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 4,
        "label": "Nazareth College",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "North Central College",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "North Dakota State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "Northwest College",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 4,
        "label": "Old Dominion University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 3,
        "label": "Presbyterian College",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 6,
        "label": "Saginaw Valley State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 5,
        "label": "Snow College",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 5,
        "label": "St. Catherine University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "St. Cloud State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 3,
        "label": "SUNY- Cobleskill",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 5,
        "label": "Tennessee Tech University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 9,
        "label": "University of Arkansas",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 4,
        "label": "University of Evansville",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 1,
        "label": "University of Hawaii - Hilo",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 8,
        "label": "University of Minnesota - Twin Cities",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "University of Mississippi",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 9,
        "label": "University of Missouri - Columbia",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 5,
        "label": "University of Southern Indiana",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "University of Tennessee - Knoxville",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "University of Texas - Austin",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "University of the Incarnate Word",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 6,
        "label": "University of Utah",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 5,
        "label": "University of Wisconsin - Eau Claire",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 6,
        "label": "University of Wyoming",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 7,
        "label": "Utica College",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 1,
        "label": "Virginia Commonwealth University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 5,
        "label": "Wayne State University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 4,
        "label": "West Liberty University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 4,
        "label": "Western Washington University",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": 2,
        "label": "Xavier University of Louisiana",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "International Relations",
        "major": 14,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Political Science",
        "major": 6,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "American Studies",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Business Administration",
        "major": 17,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "English Language and Literature",
        "major": 17,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "TESL",
        "major": 22,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Architecture",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Media Management",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Graphic Design",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Physical Education",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Social Work",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Supply Chain Management",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Mass Communications",
        "major": 8,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Biology",
        "major": 3,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Finance",
        "major": 4,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Civil Engineering",
        "major": 3,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "International Business",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Journalism",
        "major": 3,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Economics",
        "major": 4,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Pre-Medicine",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Environmental Science",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Education",
        "major": 3,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Public Relations",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Accounting",
        "major": 6,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Film Studies",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Hospitality and Tourism Management",
        "major": 3,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Chemistry",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Environmental Engineering",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Business Management",
        "major": 6,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Public Relations",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Public Health",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Community Development",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Environmental Management",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Sociology",
        "major": 5,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Software Engineering",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Anthropology",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Statistics and Mathematics",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Mechanical Engineering",
        "major": 3,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Industrial Engineering",
        "major": 8,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Development Studies",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Information Technology",
        "major": 3,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Theater Management and Production",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Computer Science",
        "major": 4,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Audio-Visual Media",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Agriculture",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Food Science Technology",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Electrical Engineering",
        "major": 8,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Mathematics",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Social Sciences",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Psychology",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Nutrition",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Mass Communications",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Physics",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Computer Engineering",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Agronomy",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Education",
        "major": 5,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Pre-Law",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Pre-Law",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "International Business",
        "major": 2,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "French Language and Literature",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Sociology",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Computer Animation",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Pharmaceutical Chemistry",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Mining Engineering",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Robotic Engineering",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Economics",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Chemical Technology",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Broadcast Journalism",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Social Entrepreneurship",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Business Management",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Global Logistics",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Chemical Engineering",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "International Relations",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": null,
        "gender": null,
        "hostinstitution": null,
        "label": "Urban Planning",
        "major": 1,
        "region": null
    },
    {
        "all": null,
        "country": 4,
        "gender": null,
        "hostinstitution": null,
        "label": "Mongolia",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 6,
        "gender": null,
        "hostinstitution": null,
        "label": "Egypt",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 4,
        "gender": null,
        "hostinstitution": null,
        "label": "Morocco",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 2,
        "gender": null,
        "hostinstitution": null,
        "label": "Nigeria",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 7,
        "gender": null,
        "hostinstitution": null,
        "label": "Montenegro",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 6,
        "gender": null,
        "hostinstitution": null,
        "label": "Guatemala",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 8,
        "gender": null,
        "hostinstitution": null,
        "label": "China",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 6,
        "gender": null,
        "hostinstitution": null,
        "label": "Honduras",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 7,
        "gender": null,
        "hostinstitution": null,
        "label": "Venezuela",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 4,
        "gender": null,
        "hostinstitution": null,
        "label": "Thailand",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 8,
        "gender": null,
        "hostinstitution": null,
        "label": "Burma",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 4,
        "gender": null,
        "hostinstitution": null,
        "label": "Cambodia",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 18,
        "gender": null,
        "hostinstitution": null,
        "label": "Serbia",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 7,
        "gender": null,
        "hostinstitution": null,
        "label": "Vietnam",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 5,
        "gender": null,
        "hostinstitution": null,
        "label": "India",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 5,
        "gender": null,
        "hostinstitution": null,
        "label": "Lebanon",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 6,
        "gender": null,
        "hostinstitution": null,
        "label": "Nicaragua",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 4,
        "gender": null,
        "hostinstitution": null,
        "label": "Bangladesh",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 4,
        "gender": null,
        "hostinstitution": null,
        "label": "Palestinian Territories",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 1,
        "gender": null,
        "hostinstitution": null,
        "label": "Zambia",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 6,
        "gender": null,
        "hostinstitution": null,
        "label": "Dominican Republic",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 7,
        "gender": null,
        "hostinstitution": null,
        "label": "Haiti",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 7,
        "gender": null,
        "hostinstitution": null,
        "label": "El Salvador",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 6,
        "gender": null,
        "hostinstitution": null,
        "label": "Costa Rica",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 4,
        "gender": null,
        "hostinstitution": null,
        "label": "Jordan",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 5,
        "gender": null,
        "hostinstitution": null,
        "label": "Tunisia",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 4,
        "gender": null,
        "hostinstitution": null,
        "label": "Korea",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 4,
        "gender": null,
        "hostinstitution": null,
        "label": "Philippines",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 5,
        "gender": null,
        "hostinstitution": null,
        "label": "Bahrain",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 3,
        "gender": null,
        "hostinstitution": null,
        "label": "Nepal",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 5,
        "gender": null,
        "hostinstitution": null,
        "label": "Oman",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 4,
        "gender": null,
        "hostinstitution": null,
        "label": "Laos",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 1,
        "gender": null,
        "hostinstitution": null,
        "label": "Mauritania",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 5,
        "gender": null,
        "hostinstitution": null,
        "label": "Pakistan",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 5,
        "gender": null,
        "hostinstitution": null,
        "label": "Yemen",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 5,
        "gender": null,
        "hostinstitution": null,
        "label": "Indonesia",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 4,
        "gender": null,
        "hostinstitution": null,
        "label": "Israel",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 6,
        "gender": null,
        "hostinstitution": null,
        "label": "Panama",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 1,
        "gender": null,
        "hostinstitution": null,
        "label": "South Africa",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 4,
        "gender": null,
        "hostinstitution": null,
        "label": "Malaysia",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 1,
        "gender": null,
        "hostinstitution": null,
        "label": "Mozambique",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 1,
        "gender": null,
        "hostinstitution": null,
        "label": "Libya",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 1,
        "gender": null,
        "hostinstitution": null,
        "label": "Kenya",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 3,
        "gender": null,
        "hostinstitution": null,
        "label": "Saudi Arabia",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 3,
        "gender": null,
        "hostinstitution": null,
        "label": "Algeria",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 1,
        "gender": null,
        "hostinstitution": null,
        "label": "Zimbabwe",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 1,
        "gender": null,
        "hostinstitution": null,
        "label": "Uganda",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 1,
        "gender": null,
        "hostinstitution": null,
        "label": "Niger",
        "major": null,
        "region": null
    },
    {
        "all": null,
        "country": 1,
        "gender": null,
        "hostinstitution": null,
        "label": "Ghana",
        "major": null,
        "region": null
    }
];

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

var textTopContent = "220"
textBottomContent = "2014-15 UGRAD students"
textBottomBottomContent = ""
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
	if (document.getElementById("all").checked) {
		textTop.text(" ")
			.attr("y", -10);
		textBottom.text("(Click a different value.)")
			.attr("y", 0);
	} else if (document.getElementById("region").checked) {
		textTop.text(d3.select(this).datum().data.region)
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.label)
			.attr("y", 20);
	} else if (document.getElementById("gender").checked) {
		textTop.text(d3.select(this).datum().data.gender)
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.label)
			.attr("y", 20);
		textBottomBottom.text("")
			.attr("y", 35);
	} else if (document.getElementById("hostinstitution").checked) {
		textTop.text(d3.select(this).datum().data.hostinstitution)
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.label)
			.attr("y", 20);
		textBottomBottom.text("")
			.attr("y", 35);
	} else if (document.getElementById("major").checked) {
		textTop.text(d3.select(this).datum().data.major)
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.label)
			.attr("y", 20);
		textBottomBottom.text("")
			.attr("y", 35);
	} else if (document.getElementById("country").checked) {
		textTop.text(d3.select(this).datum().data.country)
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.label)
			.attr("y", 20);
		textBottomBottom.text("")
			.attr("y", 35);
	}
})
	.on("mouseout", function(d) {
		d3.select(this).transition()
			.duration(100)
			.attr("d", arc);
		if (document.getElementById("all").checked) {
		textTop.text("220")
			.attr("y", -10);
		textBottom.text("2014-15 UGRAD students")
			.attr("y", 20);
		} else if (document.getElementById("region").checked) {	
			textTop.text("4")
				.attr("y", -10);
			textBottom.text("regions");
		} else if (document.getElementById("gender").checked) {
			textTop.text("Gender")
				.attr("y", -10);
			textBottom.text("")
				.attr("y", 20);
			textBottomBottom.text("an advanced degree")
		} else if (document.getElementById("hostinstitution").checked) {
			textTop.text("57")
				.attr("y", -10);
			textBottom.text("host institutions")
				.attr("y", 20);
			textBottomBottom.text("")
		} else if (document.getElementById("major").checked) {
			textTop.text("74")
				.attr("y", -10);
			textBottom.text("majors")
				.attr("y", 20);
			textBottomBottom.text("")
		} else if (document.getElementById("country").checked) {
			textTop.text("49")
				.attr("y", -10);
			textBottom.text("countries of origin")
				.attr("y", 20);
			textBottomBottom.text("")
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
	if  (value == "all") {
		textTopContent = "220"
		textBottomContent = "2014-15 UGRAD students"
		textBottomBottomContent = ""
		textQuoteLineOneContent = ""
		textQuoteLineTwoContent = ""
		textQuoteLineThreeContent = ""
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)
		pie.startAngle(-180 * (pi / 180))
		pie.endAngle(180 * (pi / 180))
	}
	else if (value === "region") {
		textTopContent = "4"
		textBottomContent = "regions"
		textQuoteLineOneContent = ""
		textQuoteLineTwoContent = ""
		textQuoteLineThreeContent = ""
		textBottomBottomContent = ""
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)

	} else if (value == "gender") {
		textTopContent = "Gender"
		textBottomContent = ""
		textBottomBottomContent = ""
		textQuoteLineOneContent = ""
		textQuoteLineTwoContent = ""
		textQuoteLineThreeContent = ""
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)
	} else if (value == "hostinstitution") {
		textTopContent = "57"
		textBottomContent = "host institutions"
		textBottomBottomContent = ""
		textQuoteLineOneContent = ""
		textQuoteLineTwoContent = ""
		textQuoteLineThreeContent = ""
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)
	} else if (value == "major") {
		textTopContent = "74"
		textBottomContent = "majors"
		textBottomBottomContent = ""
		textQuoteLineOneContent = ""
		textQuoteLineTwoContent = ""
		textQuoteLineThreeContent = ""
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textQuoteLineOne.text(textQuoteLineOneContent)
		textBottomBottom.text(textBottomBottomContent)
		textQuoteLineTwo.text(textQuoteLineTwoContent)
		textQuoteLineThree.text(textQuoteLineThreeContent)
	} else if (value == "country") {
		textTopContent = "49"
		textBottomBottomContent = "countries of origin"
		textBottomContent = ""
		textQuoteLineOneContent = ""
		textQuoteLineTwoContent = ""
		textQuoteLineThreeContent = ""
		textTop.text(textTopContent)
		textBottom.text(textBottomContent)
		textBottomBottom.text(textBottomBottomContent)
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
