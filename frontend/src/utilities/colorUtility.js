const ECO_NAME_THEMES = {
    'North American': ['lightpink', 'pink', 'hotpink', 'deeppink'], // add more shades of pink as needed
    'Colorado Plateau': ['burlywood', 'tan', 'peru', 'sienna'], // add more shades of brown as needed
    'Inter-Mountain': ['gold', 'goldenrod', 'darkgoldenrod', 'orange', 'darkorange'], // add more shades of gold as needed
    'Rocky Mountain': ['lightgreen', 'limegreen', 'forestgreen', 'green', 'darkgreen'], // add more shades of green as needed
  };
  
  const ECOLOGY_COLORS = {
    'Barren': 'peachpuff',
    'Land-Use': 'lightyellow',
    'Agricultural': 'lightcoral',
    'Streams': 'lightblue',
    'Impoundments': 'gray',
  };
  
  const SPECIAL_ECO_NAME_COLORS = {
    'Semi-natural vegetation': 'gold',
    'Mixed Vegetation': 'lightyellow' // a super light shade of yellow
  };
  
  
  // ... Previous Definitions ...

  export const assignColorToVegetation = (geoData) => {
    let colorMapping = {};
    let legendStructure = {};
    let colorAssignedCount = {};

    geoData.features.forEach(feature => {
        const vegCName = feature.properties.VEG_CNAME;
        const ecoName = feature.properties.ECO_NAME;
        const ecology = feature.properties.ECOLOGY;
        
        let assignedColor;
        
        const ecoNameThemeKey = Object.keys(ECO_NAME_THEMES).find(key => ecoName.includes(key));
        
        if (ecoNameThemeKey) {
            if (!legendStructure[ecoNameThemeKey]) {
                legendStructure[ecoNameThemeKey] = {
                    assignedColors: [],
                    vegCNames: []
                };
                colorAssignedCount[ecoNameThemeKey] = 0; // Initialize count for this theme
            }
            
            const colorIndex = colorAssignedCount[ecoNameThemeKey] % ECO_NAME_THEMES[ecoNameThemeKey].length;
            assignedColor = ECO_NAME_THEMES[ecoNameThemeKey][colorIndex];
            colorAssignedCount[ecoNameThemeKey] += 1; // Update count for this theme
            
            if (!legendStructure[ecoNameThemeKey].vegCNames.includes(vegCName)) {
                legendStructure[ecoNameThemeKey].vegCNames.push(vegCName);
            }
        } else if (SPECIAL_ECO_NAME_COLORS[ecoName]) {
            assignedColor = SPECIAL_ECO_NAME_COLORS[ecoName];
        } else {
            assignedColor = ECOLOGY_COLORS[ecology] || 'black';
        }
        
        colorMapping[vegCName] = assignedColor;
    });
    
    return { colorMapping, legendStructure };
};

