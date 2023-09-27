require('dotenv').config();
const express = require ('express')
const router = express.Router()
const { FRONTEND, YOUR_TREFLE_TOKEN } = process.env

let fetch;

import('node-fetch').then(nodeFetch => {
    fetch = nodeFetch.default;
});

// Change the route to something more generic
router.get('/get-plant-info/:plantName', async (req, res) => {
  try {
    console.log('Received request for plant: ', req.params.plantName);

    // Fetch Token from Trefle API
    const tokenResponse = await fetch('https://trefle.io/api/auth/claim', {
      method: 'post',
      body: JSON.stringify({
        origin: 'http://localhost:3000',
        token: YOUR_TREFLE_TOKEN
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!tokenResponse.ok) {
      console.error('Error fetching token from Trefle API:', tokenResponse.statusText);
      return res.status(500).json({ error: 'Error fetching token from Trefle API' });
    }

    const { token } = await tokenResponse.json();
    const { plantName } = req.params;
    const type = req.query.type || 'common'; 

    let plantApiUrl;
    if (type === 'scientific') {
      plantApiUrl = `https://trefle.io/api/v1/plants?token=${token}&filter[scientific_name]=${plantName}`;
    } else {
      plantApiUrl = `https://trefle.io/api/v1/plants/search?q=${plantName}&token=${token}`;
    }

    // Fetch Plant Data with the acquired token
   // Fetch Plant Data with the acquired token
const plantResponse = await fetch(plantApiUrl);

if (!plantResponse.ok) {
    console.error('Error fetching plant data from Trefle API:', plantResponse.statusText);
    return res.status(500).json({ error: 'Error fetching plant data from Trefle API' });
}
    
const plantData = await plantResponse.json();

if (plantData && plantData.data && plantData.data[0]) {
  const plantInfo = plantData.data[0]; // accessing the first plant in the data array.
  const baseURL = 'https://trefle.io'; 
  const selfDetailUrl = `${baseURL}${plantInfo.links.self}?token=${token}`;
  const selfDetailResponse = await fetch(selfDetailUrl);
  if (!selfDetailResponse.ok) {
    console.error('Error fetching detailed plant data from Trefle API (self link):', selfDetailResponse.statusText);
    // return or continue based on whether you want to proceed to the next link if this one fails
  } else {
    const selfDetailData = await selfDetailResponse.json();
    console.log('Detailed Self Data: ', selfDetailData); // Log the entire selfDetailData to inspect its structure

    // If the desired properties are directly under selfDetailData.data, you can access them like this:
    const data = selfDetailData.data || {}; // Access the data property, fallback to an empty object if undefined
    
    const growth = data.growth || {};
    const specifications = data.specifications || {};
  
    console.log('Minimum Precipitation: ', growth.minimum_precipitation);
    console.log('Maximum Precipitation: ', growth.maximum_precipitation);
    console.log('Minimum Root Depth: ', growth.minimum_root_depth);
    console.log('Minimum Temperature: ', growth.minimum_temperature);
    console.log('Maximum Temperature: ', growth.maximum_temperature);
  
    console.log('Average Height: ', specifications.average_height);
    console.log('Maximum Height: ', specifications.maximum_height);
  }

  // Fetching and logging data from 'plant' link
  const plantDetailUrl = `${baseURL}${plantInfo.links.plant}?token=${token}`;
  const plantDetailResponse = await fetch(plantDetailUrl);
  if (!plantDetailResponse.ok) {
    console.error('Error fetching detailed plant data from Trefle API (plant link):', plantDetailResponse.statusText);
    return res.status(500).json({ error: 'Error fetching detailed plant data from Trefle API' });
  } else {
    const plantDetailData = await plantDetailResponse.json();
    console.log('Detailed Plant Data: ', plantDetailData);
    console.log('Growth Data: ', plantDetailData.data.main_species.growth);

    
    if (plantDetailData && plantDetailData.data && plantDetailData.data.main_species) {
      const mainSpecies = plantDetailData.data.main_species;
    
      const distribution = mainSpecies.distribution || {}; // Fallback to empty object if undefined
      const specifications = mainSpecies.specifications || {};
      const growth = mainSpecies.growth || {};
      const observations = mainSpecies.observations
      // Now, send the response back with these details
      res.json({
          plantData: plantInfo, // Or you can also send plantDetailData.data if you want to send all detailed data
          distribution: distribution,
          specifications: specifications,
          growth: growth,
         obeservations: observations
      });
    } else {
      console.error('Main species data is not available in the detailed plant data');
      res.status(500).json({ error: 'Main species data is not available in the detailed plant data' });
    }
  }
}

  
  
  console.log('Plant Name: ', plantName);

  } catch (error) {
    console.error('Error in /get-plant-info/:plantName route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router