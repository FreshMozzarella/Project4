const plantNames = [
  'Pinyon', 'Juniper', 'Gambel Oak', 'Big Sagebrush', 'Rabbitbrush', 
  'Greenleaf Manzanita', 'Ponderosa Pine', "James' Galleta", 'Fremont Cottonwood', 
  'Velvet Ash', 'Sand Sagebrush', 'Quaking Aspen', 'Cheatgrass', 'Cattail', 'Bulrush', 
  'White Fir', 'Bigtooth Maple', 'Black Sagebrush', 'Mountain Mahogany', 'Douglas-Fir', 
  'Littleleaf Mountain-Mahogany', 'Mountain Snowberry', 'Kentucky Bluegrass', 'Snakeweed', 
  'Boxelder', 'Sandbar Willow', 'Emory Seepwillow', 'Tamarisk', 'Honey Mesquite', 
  'Arrow-Weed', 'Single-Leaf Ash', 'Utah Serviceberry'
];

export default function extractPlantName(vegCName) {
    let extractedNames = [];
    
    // Checking for specific plant names
    for (const name of plantNames) {
      if (vegCName.toLowerCase().includes(name.toLowerCase())) {
        extractedNames.push(name);
      }
    }
    
    // If no plant names are found, check for specific conditions
    if(extractedNames.length === 0) {
      if (vegCName.toLowerCase().includes('formation') || 
          vegCName.toLowerCase().includes('sandstone') || 
          vegCName.toLowerCase().includes('transportation') || 
          vegCName.toLowerCase().includes('reservoir') || 
          vegCName.toLowerCase().includes('canal') || 
          vegCName.toLowerCase().includes('pond') || 
          vegCName.toLowerCase().includes('cinder cone') || 
          vegCName.toLowerCase().includes('cliff') || 
          vegCName.toLowerCase().includes('beach') ||
          vegCName.toLowerCase().includes('land')) {
        return 'not a plant';
      } 
      else if (vegCName.toLowerCase().includes('complex') || 
               vegCName.toLowerCase().includes('mosaic') || 
               vegCName.toLowerCase().includes('alliance') || 
               vegCName.toLowerCase().includes('shrubland') || 
               vegCName.toLowerCase().includes('vegetation')) {
        return 'not enough data';
      }
      
      return 'unclassified'; // default message for any other cases
    }
    console.log('extracted plant names: ',extractedNames)
    return extractedNames.join(', '); // Return the joined string of extracted names
}

// Example of usage:
console.log(extractPlantName('Pinyon - Juniper Woodland Complex')); // Output: Pinyon, Juniper
console.log(extractPlantName('Transportation, Communications, and Utilities')); // Output: not a plant
console.log(extractPlantName('Mixed Mountain Shrubland Complex')); // Output: not enough data
