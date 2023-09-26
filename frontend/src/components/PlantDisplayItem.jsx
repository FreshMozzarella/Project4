import React, { useEffect, useState } from 'react';
import './PlantDisplayItem.css'

function PlantDisplayItem({ plantName }) {
  const [plantData, setPlantData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log('Received Plant Name: ', plantName);

  useEffect(() => {
    // Skip the API call if plantName is not provided
    if (!plantName) return;
    
    // Form the URL to make the API call
   // PlantDisplayItem.jsx
const apiUrl = `http://localhost:4000/plant/get-plant-info/${encodeURIComponent(plantName)}?type=common`;

    console.log('Hitting URL: ', apiUrl);  
    setIsLoading(true);
    
    console.log('API URL: ', apiUrl);
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        // Assuming the first item in the data array is the correct plant.
        if (data && data.data && data.data.length > 0) setPlantData(data.data[0]);
        console.log('Plant Data State: ', plantData);
      })
      .catch(error => {
        setError(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
        
      });
  }, [plantName]);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!plantData) return <div>No data available for {plantName}</div>;
  
  return (
    <div className="plant-display-item">
      <img 
      src={plantData.image_url} 
      alt={plantData.common_name || plantData.scientific_name}
      style={{ width: '300px', height: '300px' }}  
      />
      <div>Common Name: {plantData.common_name || 'Unknown'}</div>
      <div>Scientific name: {plantData.scientific_name || 'Unknown'}</div>
      <div>Family Common Name: {plantData.family_common_name || 'Unknown'}</div>
      <div>Is it edible? : {plantData.edible || 'Unknown'}</div>
      <div></div>
    </div>
  );
}

export default PlantDisplayItem;

