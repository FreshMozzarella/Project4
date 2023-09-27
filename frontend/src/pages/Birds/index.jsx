import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as birdService from '../../utilities/bird-service';

export default function Birds(){
    const [birds, setBirds] = useState([]);

  useEffect(() => {
    async function fetchBirds() {
      try {
        const data = await birdService.getBirds();
        setBirds(data);
      } catch (error) {
        console.error('Error fetching bird list:', error);
      }
    }
    
    fetchBirds();
  }, []);
  
    return (
        <div>
        <h1>Bird List</h1>
        <ul>
          {birds.map(bird => (
            <li key={bird._id}>
              <Link to={`/birds/${bird._id}`}>
                {bird.speciesName} ({bird.scientificName})
              </Link>
              <img 
              src={bird.imageURL} 
              alt={bird.speciesName}
              style={{width: '200px', height: '200px'}}
              />
            </li>
          ))}
        </ul>
      </div>
    )
}