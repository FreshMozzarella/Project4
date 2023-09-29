const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const { YOUR_TREFLE_TOKEN, IQ_AIR_API_KEY, NPS_API_KEY} = process.env;
let fetch;
import('node-fetch').then(module => { fetch = module.default; });

const TREFLE_BASE_URL = 'https://trefle.io';
const TREFLE_AUTH_URL = `${TREFLE_BASE_URL}/api/auth/claim`;

function constructUrl(base, endpoint, params = {}) {
  const url = new URL(`${base}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url;
}

router.get('/get-plant-info/:plantName', async (req, res) => {
  try {
    const plantName = req.params.plantName;
    console.log('Received request for plant: ', plantName);

    const tokenResponse = await fetch(TREFLE_AUTH_URL, {
      method: 'POST',
      body: JSON.stringify({ origin: 'http://localhost:3000', token: YOUR_TREFLE_TOKEN }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!tokenResponse.ok) throw new Error(`Error fetching token: ${tokenResponse.statusText}`);
    const { token } = await tokenResponse.json();

    const type = req.query.type || 'common';
    const endpoint = type === 'scientific' ? `/api/v1/plants` : `/api/v1/plants/search`;
    const params = type === 'scientific' ? { token, 'filter[scientific_name]': plantName } : { token, q: plantName };

    const plantUrl = constructUrl(TREFLE_BASE_URL, endpoint, params);
    const plantResponse = await fetch(plantUrl);
    if (!plantResponse.ok) throw new Error(`Error fetching plant data: ${plantResponse.statusText}`);

    const plantData = await plantResponse.json();
    if (!plantData.data || plantData.data.length === 0) return res.status(404).json({ error: 'No plant data found' });

    const plantInfo = plantData.data[0];
    const selfDetailUrl = constructUrl(TREFLE_BASE_URL, plantInfo.links.self, { token });
    const selfDetailResponse = await fetch(selfDetailUrl);

    if (selfDetailResponse.ok) {
      const selfDetailData = await selfDetailResponse.json();
      // Extract other required data from selfDetailData if needed
      // ...
    }

    const plantDetailUrl = constructUrl(TREFLE_BASE_URL, plantInfo.links.plant, { token });
    const plantDetailResponse = await fetch(plantDetailUrl);
    if (!plantDetailResponse.ok) throw new Error(`Error fetching detailed plant data: ${plantDetailResponse.statusText}`);

    const plantDetailData = await plantDetailResponse.json();
    if (!plantDetailData.data || !plantDetailData.data.main_species) throw new Error('Main species data is not available');

    const mainSpecies = plantDetailData.data.main_species;
    res.json({
      plantData: plantInfo,
      distribution: mainSpecies.distribution || {},
      specifications: mainSpecies.specifications || {},
      growth: mainSpecies.growth || {},
      observations: mainSpecies.observations || {}
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});


router.get('/nearestStation', async (req, res) => {
  const lat = 37.2982; // Latitude for Zion National Park, Utah
  const lon = -113.0263; // Longitude for Zion National Park, Utah
  const apiKey = IQ_AIR_API_KEY; // Your API key from IQAir
  
  try {
    
    const response = await fetch(`https://api.airvisual.com/v2/city?city=Cedar%20City&state=Utah&country=USA&key=${apiKey}`);
    if (!response.ok) {
        const errorDetail = await response.json(); // Parse the response body as JSON
        console.error('IQAir API Error Detail:', errorDetail); // Log the parsed response body
        return res.status(500).json({ error: 'Internal Server Error', detail: errorDetail });
    }
    const data = await response.json();
    res.json(data);
} catch (error) {
    console.error('Error fetching data from IQAir API:', error);
    res.status(500).send('Internal Server Error');
}

});


router.get('/allParkInfo', async (req, res) => {
  try {
    const parkCode = 'zion'; // Zion National Park Code
    const baseUrl = 'https://developer.nps.gov/api/v1';
    const eventsUrl = `${baseUrl}/events?parkCode=${parkCode}`;
    
    const response = await fetch(eventsUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': `${NPS_API_KEY}`, // Pass API key in 
        'User-Agent': req.headers['user-agent'],
      }
    });
    
    if (!response.ok) {
      console.error('NPS API Error: ', response.statusText);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    const data = await response.json();
    
    if (!data.data) return res.status(500).json({ error: 'No events data available' });

        // Fetch Alerts Data
        const alertsUrl = `${baseUrl}/alerts?parkCode=${parkCode}`;
        const alertsResponse = await fetch(alertsUrl, {
          method: 'GET',
          headers: {
            'X-Api-Key': `${NPS_API_KEY}`,
            'User-Agent': req.headers['user-agent'],
          }
        });
    
        if (!alertsResponse.ok) {
          console.error('NPS API Error on Alerts: ', alertsResponse.statusText);
          return res.status(500).json({ error: 'Internal Server Error on Alerts' });
        }
        const alertsData = await alertsResponse.json();

        // Fetch Alerts Data
        const thingsToDoUrl = `${baseUrl}/thingstodo?parkCode=${parkCode}`;
        const thingsToDoResponse = await fetch(thingsToDoUrl, {
          method: 'GET',
          headers: {
            'X-Api-Key': `${NPS_API_KEY}`,
            'User-Agent': req.headers['user-agent'],
          }
        });
    
        if (!thingsToDoResponse.ok) {
          console.error('NPS API Error on Alerts: ', thingsToDoResponse.statusText);
          return res.status(500).json({ error: 'Internal Server Error on Alerts' });
        }
        const thingsToDoData = await thingsToDoResponse.json();

       // Sanitize the HTML content in the descriptions

    // Process and sanitize data before sending to frontend
    const processedEvents = data.data.map(event => ({
      title: event.title,
      location: event.location,
      datestart: event.datestart,
      dateend: event.dateend,
      times: event.times,
      isfree: event.isfree,
      feeinfo: event.feeinfo,
      description: sanitizeHtml(event.description), // sanitize HTML content
      images: event.images,
      longitude: event.longitude,
      latitude: event.latitude,
    }));

    const processedAlerts = alertsData.data.map(alert => ({
      url: alert.url,
      title: alert.title,
      description: sanitizeHtml(alert.description), // sanitize HTML content if needed
    }));

    const processedThingsToDo = thingsToDoData.data.map(thingToDo => ({
      location: thingToDo.location,
      url: thingToDo.url,
      title: thingToDo.title,
      description: sanitizeHtml(thingToDo.longDescription), // sanitize HTML content
      duration: thingToDo.duration,
      activities: thingToDo.activities.map(activity => activity.name), // extracting the names of activities
      images: thingToDo.images.map(image => image.url), // extracting image urls
      feeDescription: thingToDo.feeDescription,
      season: thingToDo.season,
      arePetsPermitted: thingToDo.arePetsPermitted,
      latitude: thingToDo.latitude,
      longitude: thingToDo.longitude,
    }));

    res.json({
      events: processedEvents,
      alerts: processedAlerts,
      thingstodo: processedThingsToDo,
    });

  } catch (error) {
    console.error('Error fetching data from NPS API:', error);
    res.status(500).send('Internal Server Error');
  }
});





module.exports = router;
