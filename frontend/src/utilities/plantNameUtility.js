// utility.js
const plantNames = [
'pinyon',
'Juniper',
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
    // ... other plant names
  ];
  
  function extractPlantName(vegCName) {
    let foundName = '';
    plantNames.forEach((name) => {
      const regex = new RegExp(`\\b${name}\\b`, 'i'); // 'i' makes it case insensitive
      if (regex.test(vegCName)) {
        foundName = name; // if a match is found, assign it to foundName
      }
    });
    return foundName;
  }
  
  export default extractPlantName;