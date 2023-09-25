import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PlantDisplay(){
    const [plant, setPlant] = useState(null);
    const [error, setError] = useState(null);
    const { plantName } = useParams();
    useEffect(() => {
      let isMounted = true;
      const fetchPlant = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/plant/get-plant/coconut`); // corrected
          if(!response.ok) {
            throw new Error('Failed to fetch plant data');
          }
          const data = await response.json();
          console.log('Fetched Data: ', data)
          if (isMounted) setPlant(data.data[0]);
        } catch (error) {
          console.error('Error fetching plant data', error);
          setError(error.message);
        }
      };
    
        fetchPlant();
      }, []);
    
      return (
        <div>
          {error ? (
            <p>Error: {error}</p>
          ) : plant ? (
            <div>
              <h1>{plant.common_name}</h1>
              <p>{plant.family}</p>
              <img src={plant.image_url} alt={plant.common_name} />
            </div>
          ) : (
            'Loading...'
          )}
        </div>
      );
    }