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
    // Fetch Token from Trefle API
    const tokenResponse = await fetch('https://trefle.io/api/auth/claim', {
      method: 'post',
      body: JSON.stringify({
        origin: 'http://localhost:3000', // your frontend address
        token: YOUR_TREFLE_TOKEN
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const { token } = await tokenResponse.json();
    const { plantName } = req.params;
    // Retrieve the type from query parameters and default it to 'common' if it's not provided
    const type = req.query.type || 'common'; 
    
    // Construct the URL to fetch plant data from the Trefle API based on the type
    let plantApiUrl;
    if (type === 'scientific') {
      plantApiUrl = `https://trefle.io/api/v1/plants?token=${token}&filter[scientific_name]=${plantName}`;
    } else { // default to 'common' 
      plantApiUrl = `https://trefle.io/api/v1/plants/search?q=${plantName}&token=${token}`;
    }
    
    // Fetch Plant Data with the acquired token
    const plantResponse = await fetch(plantApiUrl);
    const plantData = await plantResponse.json();
    
    console.log('Plant Name: ', plantName);
    console.log('Plant Data: ', plantData);
    res.json(plantData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
