require('dotenv').config();
const express = require ('express')
const router = express.Router()
const { FRONTEND, YOUR_TREFLE_TOKEN } = process.env

let fetch;

import('node-fetch').then(nodeFetch => {
    fetch = nodeFetch.default;
});

router.get('/get-plant/:plantName', async (req, res) => {
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

    // Fetch Plant Data with the acquired token
    const plantResponse = await fetch(`https://trefle.io/api/v1/plants/search?q=${req.params.plantName}&token=${token}`);
    const plantData = await plantResponse.json();

    res.json(plantData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router