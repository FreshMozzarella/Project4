import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import './PlantDisplayItem.css';

function PlantDisplayItem({ plantName }) {
  const [plantData, setPlantData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!plantName) return;
    
    const apiUrl = `http://localhost:4000/plant/get-plant-info/${encodeURIComponent(plantName)}`;
    setIsLoading(true);
    
    fetch(apiUrl)
      .then(response => {
        console.log('API Response Status:', response.status);
        return response.text();
      })
      .then((data) => {
        setPlantData(data);
      })
      .then(text => {
        console.log('API Response Body:', text);
      })
      .catch(error => {
        console.error('API Error:', error);
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
        src={plantData.image} 
        alt={plantName}
        style={{ width: '300px', height: '300px' }}  
      />
      <div>Description:</div>
      {/* Set the description and sanitize it with DOMPurify */}
      <div 
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(plantData.description || '') }}
      />
      <div>Info URL: <a href={plantData.info_url || '#'} target="_blank" rel="noopener noreferrer">Learn More</a></div>
    </div>
  );
}

export default PlantDisplayItem;
