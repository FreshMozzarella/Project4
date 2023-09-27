import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as birdService from '../../../utilities/bird-service';

export default function BirdDetail(){
    const [bird, setBird] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchBird() {
      try {
        const data = await birdService.getBird(id);
        setBird(data);
      } catch (error) {
        console.error('Error fetching bird details:', error);
      }
    }

    fetchBird();
  }, [id]);

  if (!bird) return <div>Loading...</div>;

  return (
    <div>
      <h1>{bird.speciesName} ({bird.scientificName})</h1>
      <img  
      src={bird.imageURL} 
      alt={bird.speciesName} 
        style={{height: '300px', width: '300px'}}
      />
      <p><strong>Family:</strong> {bird.family}</p>
      <p><strong>Weight:</strong> {bird.weight.min}oz - {bird.weight.max}oz</p>
      <p><strong>Wingspan:</strong> {bird.wingspan}inches</p>
      <p><strong>Features:</strong></p>
      <p>{bird.distinctiveFeatures}</p>
      <p><strong>Best time to spot:</strong> {bird.bestTimeToSpot}</p>
      <p><strong>Conservation Status:</strong> {bird.conservationStatus}</p>
      <p><strong>Diet:</strong> {bird.diet}</p>
      <p><strong>Audio:</strong></p>
      <audio controls>
        <source src={bird.audioURL} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}