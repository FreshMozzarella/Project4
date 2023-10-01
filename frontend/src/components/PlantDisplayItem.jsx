import React, { useEffect, useState } from 'react';
import './PlantDisplayItem.css';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
function PlantDisplayItem({ plantName }) {
  const [plantData, setPlantData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const TREFLE_BASE_URL = 'https://trefle.io';
  const isSpecialCase = ['not a plant', 'not enough plant data'].includes(plantName.toLowerCase());
  useEffect(() => {
    if (isSpecialCase || !plantName) return;
    setPlantData(null);
    if (!plantName) return;
    
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/plant/get-plant-info/${encodeURIComponent(plantName)}`;
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
  }, [plantName, isSpecialCase]);
  
  if (isSpecialCase) return <Card><CardContent><Typography variant="body2">{plantName}</Typography></CardContent></Card>;
  if (isLoading) return <Card><CardContent><Typography variant="body2">Loading...</Typography></CardContent></Card>;
  if (error) return <Card><CardContent><Typography variant="body2">Error: {error}</Typography></CardContent></Card>;
  if (!plantData) return <Card><CardContent><Typography variant="body2">No data available for {plantName}</Typography></CardContent></Card>;

  return (
    <Card sx={{height: '100%'}}>
      <CardMedia
        component="img"
        image={plantData.plantData?.image_url || 'default_image_url'}
        alt={plantName}
        sx={{ objectFit: 'cover', maxHeight: '200px' }}
      />
      <CardContent>
      <Typography variant="h6">{plantData.plantData?.common_name || 'N/A'}</Typography>
      <Typography variant="body2">Description: {plantData.observations || 'No observations available'}</Typography>
      <Typography variant="body2">Family: {plantData.plantData?.family_common_name || 'N/A'}</Typography>
      <Typography variant="body2">Scientific Name: {plantData.plantData?.scientific_name || 'N/A'}</Typography>
      <Typography variant="body2">Genus: {plantData.plantData?.genus || 'N/A'}</Typography>
      <Typography variant="body2">Growth Form: {plantData.specifications?.growth_form || 'N/A'}</Typography>
      <Typography variant="body2">Growth Habit: {plantData.specifications?.growth_habit || 'N/A'}</Typography>
      <Typography variant="body2">Growth Rate: {plantData.specifications?.growth_rate || 'N/A'}</Typography>

      {plantData.plantData?.links?.plant && (
        <Typography variant="body2">
          Info URL: 
          <a 
            href={`${TREFLE_BASE_URL}${plantData.plantData.links.plant}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </Typography>
      )}
      </CardContent>
    </Card>
  );

}

export default PlantDisplayItem;
