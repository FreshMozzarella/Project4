// utility.js
const plantNames = [
'pinyon',
'Juniper',
'Gamble Oak',
'Gambel Oak',
'Big sagebrush',
'Rabbitbrush',
'Greenleaf Manzanita',
'Ponderosa Pine',
"James' Gelleta",
'Fremont Cottonwood',
'Sand sagebrush',
'Quaking Aspen',
'Cheatgrass',
'Cattail',
'Bulrush',
'White fir',
'Bigtooth Maple',
'Black Sagebrush',
'Mountain mahogany',
'Douglas-fir',
'Douglas fir',
'Littleleaf Mountain Mahogany',
'Mountain Snowberry',
'Kentucky Bluegrass',
'Snakeweed',
'Boxelder',
'Sandbar Willow',
'Emory Seepwillow',
'Tamarisk',
'Honey Mesquite',
'Arrow-weed',
'Single-leaf Ash',
'Utah Serviceberry'
    // ... other plant names
  ];
  
 // plantNameUtility.js (or wherever you have defined extractPlantName)
function extractPlantName(vegCName) {
    console.log('Input Phrase:', vegCName); // Log to see what vegCName is received by the function
    
    // Iterate over each plant name and check if it is included in vegCName.
    for (const name of plantNames) {
      // Converting both to lowercase to make the comparison case-insensitive.
      if (vegCName.toLowerCase().includes(name.toLowerCase())) {
        console.log('Extracted Name:', name); // Log the name that has been extracted
        return name; // Return the extracted name if a match is found
      }
    }
    
    console.log('No Match Found'); // Log when no match is found
    return ''; // Return an empty string if no match is found
  }
  
  
  export default extractPlantName;