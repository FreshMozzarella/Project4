import React, { useEffect, useState } from 'react';
import './PlantDisplayItem.css';

function PlantDisplayItem({ plantName }) {
  const [plantData, setPlantData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const TREFLE_BASE_URL = 'https://trefle.io';
  useEffect(() => {
    setPlantData(null);
    if (!plantName) return;
    
    const apiUrl = `http://localhost:4000/plant/get-plant-info/${encodeURIComponent(plantName)}`;
    setIsLoading(true);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setPlantData(data);
      })
      .catch((error) => {
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
        src={plantData.plantData?.image_url || 'default_image_url'} 
        alt={plantName}
        style={{ width: '300px', height: '300px' }} 
      />
      <div>{plantData.plantData.common_name}</div>
      <div>Description: 
        {plantData.plantData?.observations || 'No observations available'}
      </div>
      <div>Family: {plantData.plantData?.family_common_name || 'N/A'}</div>
      <div>Scientific Name: {plantData.plantData?.scientific_name || 'N/A'}</div>
      <div>Genus: {plantData.plantData?.genus || 'N/A'}</div>
      <div>Growth Form: {plantData.specifications?.growth_form || 'N/A'}</div>
      <div>Growth Habit: {plantData.specifications?.growth_habit || 'N/A'}</div>
      <div>Growth Rate: {plantData.specifications?.growth_rate || 'N/A'}</div>
      {/* Similar for other fields you want to display */}
      
      <div>Info URL: 
        <a 
          href={plantData.plantData?.links?.plant ? `${TREFLE_BASE_URL}${plantData.plantData.links.plant}` : '#'} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

export default PlantDisplayItem;
