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
        "all": 254,
        "country": null,
        "degree": null,
        "gender": null,
        "host": null,
        "label": null
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": 155,
        "host": null,
        "label": "Female"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": 99,
        "host": null,
        "label": "Male"
    },
    {
        "all": null,
        "country": 11,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Russian Federation"
    },
    {
        "all": null,
        "country": 8,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Kazakhstan"
    },
    {
        "all": null,
        "country": 7,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Burma"
    },
    {
        "all": null,
        "country": 7,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "China"
    },
    {
        "all": null,
        "country": 7,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Kyrgyzstan"
    },
    {
        "all": null,
        "country": 7,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Uzbekistan"
    },
    {
        "all": null,
        "country": 7,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Indonesia"
    },
    {
        "all": null,
        "country": 7,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Venezuela"
    },
    {
        "all": null,
        "country": 7,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Vietnam"
    },
    {
        "all": null,
        "country": 6,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Haiti"
    },
    {
        "all": null,
        "country": 6,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Honduras"
    },
    {
        "all": null,
        "country": 6,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Nicaragua"
    },
    {
        "all": null,
        "country": 6,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "El Salvador"
    },
    {
        "all": null,
        "country": 6,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Panama"
    },
    {
        "all": null,
        "country": 6,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Philippines"
    },
    {
        "all": null,
        "country": 6,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Ukraine"
    },
    {
        "all": null,
        "country": 5,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Algeria"
    },
    {
        "all": null,
        "country": 5,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "India"
    },
    {
        "all": null,
        "country": 5,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Tajikistan"
    },
    {
        "all": null,
        "country": 5,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Cambodia"
    },
    {
        "all": null,
        "country": 5,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Dominican Republic"
    },
    {
        "all": null,
        "country": 5,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Guatemala"
    },
    {
        "all": null,
        "country": 5,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Lebanon"
    },
    {
        "all": null,
        "country": 5,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Malaysia"
    },
    {
        "all": null,
        "country": 5,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Saudi Arabia"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Costa Rica"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Egypt"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Korea, Republic of"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Laos"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Tunisia"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Armenia"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Bahrain"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Bangladesh"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Jordan"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Moldova"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Mongolia"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Morocco"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Palestinian Territories (Gaza)"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Thailand"
    },
    {
        "all": null,
        "country": 4,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Zimbabwe"
    },
    {
        "all": null,
        "country": 3,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Kenya"
    },
    {
        "all": null,
        "country": 3,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Mozambique"
    },
    {
        "all": null,
        "country": 3,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Pakistan"
    },
    {
        "all": null,
        "country": 3,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Turkmenistan"
    },
    {
        "all": null,
        "country": 3,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Belarus"
    },
    {
        "all": null,
        "country": 3,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Mauritania"
    },
    {
        "all": null,
        "country": 3,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Nepal"
    },
    {
        "all": null,
        "country": 3,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Niger"
    },
    {
        "all": null,
        "country": 3,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Paraguay"
    },
    {
        "all": null,
        "country": 2,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Palestinian Territories (WB)"
    },
    {
        "all": null,
        "country": 2,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Azerbaijan"
    },
    {
        "all": null,
        "country": 2,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Georgia"
    },
    {
        "all": null,
        "country": 2,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Israel"
    },
    {
        "all": null,
        "country": 2,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Serbia"
    },
    {
        "all": null,
        "country": 1,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Kuwait"
    },
    {
        "all": null,
        "country": 1,
        "degree": null,
        "gender": null,
        "host": null,
        "label": "Oman"
    },
    {
        "all": null,
        "country": null,
        "degree": 22,
        "gender": null,
        "host": null,
        "label": "English"
    },
    {
        "all": null,
        "country": null,
        "degree": 10,
        "gender": null,
        "host": null,
        "label": "Computer Science"
    },
    {
        "all": null,
        "country": null,
        "degree": 9,
        "gender": null,
        "host": null,
        "label": "International Relations"
    },
    {
        "all": null,
        "country": null,
        "degree": 8,
        "gender": null,
        "host": null,
        "label": "Economics"
    },
    {
        "all": null,
        "country": null,
        "degree": 7,
        "gender": null,
        "host": null,
        "label": "Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 7,
        "gender": null,
        "host": null,
        "label": "Business Administration"
    },
    {
        "all": null,
        "country": null,
        "degree": 7,
        "gender": null,
        "host": null,
        "label": "Law"
    },
    {
        "all": null,
        "country": null,
        "degree": 6,
        "gender": null,
        "host": null,
        "label": "Chemical Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 5,
        "gender": null,
        "host": null,
        "label": "Business"
    },
    {
        "all": null,
        "country": null,
        "degree": 5,
        "gender": null,
        "host": null,
        "label": "Architecture"
    },
    {
        "all": null,
        "country": null,
        "degree": 5,
        "gender": null,
        "host": null,
        "label": "Civil Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 5,
        "gender": null,
        "host": null,
        "label": "Foreign Languages"
    },
    {
        "all": null,
        "country": null,
        "degree": 4,
        "gender": null,
        "host": null,
        "label": "Finance"
    },
    {
        "all": null,
        "country": null,
        "degree": 4,
        "gender": null,
        "host": null,
        "label": "English Language and Literature"
    },
    {
        "all": null,
        "country": null,
        "degree": 4,
        "gender": null,
        "host": null,
        "label": "Computer Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 4,
        "gender": null,
        "host": null,
        "label": "Sociology"
    },
    {
        "all": null,
        "country": null,
        "degree": 3,
        "gender": null,
        "host": null,
        "label": "Accounting"
    },
    {
        "all": null,
        "country": null,
        "degree": 3,
        "gender": null,
        "host": null,
        "label": "Mechanical Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 3,
        "gender": null,
        "host": null,
        "label": "Business Management"
    },
    {
        "all": null,
        "country": null,
        "degree": 3,
        "gender": null,
        "host": null,
        "label": "Communications"
    },
    {
        "all": null,
        "country": null,
        "degree": 3,
        "gender": null,
        "host": null,
        "label": "International Studies"
    },
    {
        "all": null,
        "country": null,
        "degree": 3,
        "gender": null,
        "host": null,
        "label": "Environmental Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 3,
        "gender": null,
        "host": null,
        "label": "Psychology"
    },
    {
        "all": null,
        "country": null,
        "degree": 3,
        "gender": null,
        "host": null,
        "label": "Biology"
    },
    {
        "all": null,
        "country": null,
        "degree": 3,
        "gender": null,
        "host": null,
        "label": "English Literature"
    },
    {
        "all": null,
        "country": null,
        "degree": 3,
        "gender": null,
        "host": null,
        "label": "International Economics"
    },
    {
        "all": null,
        "country": null,
        "degree": 3,
        "gender": null,
        "host": null,
        "label": "Software Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "Electrical Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "Public Administration"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "Medicine and Nursing"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "Social Studies"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "Mathematics"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "Environmental Sciences"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "English Education"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "Modern Languages"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "International Law"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "Liberal Arts"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "Nutrition"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "Food Science"
    },
    {
        "all": null,
        "country": null,
        "degree": 2,
        "gender": null,
        "host": null,
        "label": "International Finance"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Civil Engineering & English"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "English/Linguistics"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Administration and Business"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Political Sciences and International Relations"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Industrial Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Commerce"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Business Information Technology"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Radio, Television and Cinema"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Animal Science"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Teaching English as a Foreign Language"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Education and Languages"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "English Linguistics"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Engineering Technology"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "English / TESL"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "English and Journalism"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Digital Communications"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Finance and Accounting"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Biological Sciences"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Economics and Business"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Social Sciences"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Entrepreneurship"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Journalism"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Applied Mathematics"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "English Interpretation and Translation"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Medicine"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Humanities"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Law and Political Science"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Economic and Management Science"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Business Economics"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "International Affairs"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "English Language Teaching"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Logistics and Customs"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Journalism and Mass Communiction"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Educational Psychology"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Marketing and Advertisement"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Agriculture"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Foreign Languages in English Orientation"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Languages and Mathematics"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Electrical Industrial Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Computer Systems Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Physics & Mathematics"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Biosciences"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Marketing"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Translation Studies"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Management"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "English and French"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Mass Media & Journalism"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Nursing"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Political Science and Diplomacy"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Human Rights and International Law"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Chemistry"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Rural Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Engineering - Product Design"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Applied Informatics"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "International Journalism"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Renewable Energy"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Microbiology"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "International Development"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Early Childhood Bilingual Education"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Airport Management"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "English/French"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Logistics"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Tourism Enterprises Management"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Agricultural Science"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Political and Social Science"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Physical Therapy"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Linguistics and Translation"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Education"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Filmmaking"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Visual And Digital production"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Linguistics and Philology"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "International Communications"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Tourism"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Geology"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Business Information Systems"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Pharmacy"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "International Business"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Agribusiness"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Biomedical Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Womens & Gender Studies"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Journalism & Media Studies"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Civil and Water Engineering"
    },
    {
        "all": null,
        "country": null,
        "degree": 1,
        "gender": null,
        "host": null,
        "label": "Natural Resources Management"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 5,
        "label": "University of Southern Indiana"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 5,
        "label": "University of Utah"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 5,
        "label": "North Dakota State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 5,
        "label": "University of Arkansas"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 5,
        "label": "University of Wyoming"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 5,
        "label": "Wright State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 5,
        "label": "Saginaw Valley State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 5,
        "label": "West Virginia University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 5,
        "label": "Tennessee Tech University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "University of Missouri - Columbia"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "Florida Gulf Coast University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "Utica College"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "West Liberty University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "Humboldt State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "Augustana University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "Lewis-Clark State College"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "University of Evansville"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "St. Cloud State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "Emporia State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "University of Tennessee, Knoxville"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "Cal State Bakersfield"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "Minnesota State Mankato"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 4,
        "label": "Kent State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Maryville College"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Millikin University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "U. Wisconsin - Eau Claire"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Fairleigh Dickinson University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Pittsburg State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Carroll College"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Illinois State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Ball State"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "American University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Presbyterian College"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "University of Mississippi"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Western Washington University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "CSU, San Marcos"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Missouri State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Endicott College"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "University of Memphis"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Montclair State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Murray State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Wayne State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Chatham University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Old Dominion University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Wilson College"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "University of Montana"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "North Central College"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "University of Central Missouri"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Northern Michigan University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Barnard College"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Grand Valley State"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "CSU, Monterey Bay"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "East Tennessee State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Marymount University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "Nazareth College"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "University of Maine"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 3,
        "label": "University of Kansas"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "U. Wisconsin - Superior"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "University of New Hampshire"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "University of Minnesota, TC"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "SUNY-Plattsburgh"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "East Tennessee State U."
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "Mercyhurst University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "Gadsden State"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "The University of Texas at Austin"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "Xavier University of Louisiana"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "Boston Met College"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "Mount Mercy University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "St. Catherine University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "Indiana U. of Pennsylvania"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "Oklahoma State Institute of Tech"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "University of Delaware"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "University of the Incarnate Word"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "SUNY - Cobleskill"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 2,
        "label": "Depauw University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "Univeristy of Wisconsin, Eau Claire"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "Indiana Univeristy of Pennsylvania"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "University of Minnesota, Twin - Cities"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "University Of Minnesota - Twin Cities"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "Oklahoma State University of Technology"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "U. Wisconsin - Stout"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "California State Univeristy, San Marcos"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "Lincoln University of PA"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "Snow College"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "Missourri State University"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "University of Wisconsin - Eau Claire"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "Lincoln University of Pennsylvania"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "California State Univeristy, Monterey Bay"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "SUNY - Plattsburgh"
    },
    {
        "all": null,
        "country": null,
        "degree": null,
        "gender": null,
        "host": 1,
        "label": "University of Wisconsin - Stout"
    }
];

var total = d3.sum(data, function(d) {
	return d3.sum(d3.values(d));
});
pi = 3.141592653589793238462643383279502884197169;

var width = 700,
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

var textTopContent = "254"
textBottomContent = "2015-16 UGRAD students"
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
	}  else if (document.getElementById("gender").checked) {
		textTop.text(d3.select(this).datum().data.gender)
			.attr("y", -10);
		textBottom.text(d3.select(this).datum().data.label)
			.attr("y", 20);
		textBottomBottom.text("")
			.attr("y", 35);
	} else if (document.getElementById("degree").checked) {
		textTop.text(d3.select(this).datum().data.degree)
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
	else if (document.getElementById("host").checked) {
			textTop.text(d3.select(this).datum().data.host)
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
		textTop.text("254")
			.attr("y", -10);
		textBottom.text("2015-16 UGRAD students")
			.attr("y", 20);
		}  else if (document.getElementById("gender").checked) {
			textTop.text("Gender")
				.attr("y", -10);
			textBottom.text("")
				.attr("y", 20);
			textBottomBottom.text("")
		} else if (document.getElementById("degree").checked) {
			textTop.text("123")
				.attr("y", -10);
			textBottom.text("majors")
				.attr("y", 20);
			textBottomBottom.text("")
		} else if (document.getElementById("country").checked) {
			textTop.text("56")
				.attr("y", -10);
			textBottom.text("countries of origin")
				.attr("y", 20);
			textBottomBottom.text("")
		} 
		else if (document.getElementById("host").checked) {
					textTop.text("90")
						.attr("y", -10);
					textBottom.text("host institutions")
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
		textTopContent = "254"
		textBottomContent = "2015-16 UGRAD students"
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
	} else if (value == "degree") {
		textTopContent = "123"
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
		textTopContent = "56"
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
	}
	else if (value == "host") {
			textTopContent = "90"
			textBottomBottomContent = "host institutions"
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
