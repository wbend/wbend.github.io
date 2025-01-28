// utils.js

function sizeLayerControl() {
    $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
  }
  
  function getCountryColor(feature) {
    const tags = feature.properties.tags;
    let countryName = tags['name:en'] || tags['int_name'] || tags['name'];
  
    // If the country name is in the native language, map it to English
    const nativeToEnglish = {
      'Қазақстан': 'Kazakhstan',
      'Кыргызстан': 'Kyrgyzstan',
      'Ўзбекистон': 'Uzbekistan',
      'Тоҷикистон': 'Tajikistan',
      'Türkmenistan': 'Turkmenistan'
    };
  
    countryName = nativeToEnglish[countryName] || countryName;
  
    switch(countryName) {
      case 'Kazakhstan': return '#0078ff';
      case 'Kyrgyzstan': return '#dc0201';
      case 'Uzbekistan': return '#07b9d7';
      case 'Tajikistan': return '#147233';
      case 'Turkmenistan': return '#f3d306';
      default: return '#808080';
    }
  }
  
  const categories = {
    
    "Air Defence Site": "MAP PIN - BLUE - AIRDEF - (AIRDEF).png",
    "Airbase": "MAP PIN - BLUE - AIRBASE - (AIRBASE).png",
    "Base (Large)": "MAP PIN - RED - 1 STAR (BIG).png",
    "Outpost (Medium)": "MAP PIN - RED - 2 STAR (SMALL) - (MED BASE).png",
    "Observation (Small)": "MAP PIN - RED - 2 STAR (SMALL) - (LGE BASE) - BIGGER WHITE.png",
    "Foreign Base": "MAP PIN - FLAG - FOREIGN BASE.png",
    "Admin Building": "MAP PIN - YELLOW - (ADMIN).png",
    "Industry": "MAP PIN - YELLOW - (INDUSTRY).png",
    "Training Ground": "MAP PIN - YELLOW - (TRAINING).png",
    "Naval Location": "MAP PIN - GREEN - ANCHOR - (NAVAL BASE).png",
    "POI": "MAP PIN - ORANGE - DOWN ARROW - POI.png"
  };
  
  function updateAttribution(map) {
    $.each(map._layers, function(index, layer) {
      if (layer.getAttribution) {
        $("#attribution").html((layer.getAttribution()));
      }
    });
  }

