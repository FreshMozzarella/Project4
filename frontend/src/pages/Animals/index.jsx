import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as animalService from '../../utilities/animal-service'; 

export default function Animals(){
    const [animals, setAnimals] = useState([]);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const fetchedAnimals = await animalService.getAnimals();
          setAnimals(fetchedAnimals);
        } catch(error) {
          console.error("Error fetching animals", error);
        }
      }
      fetchData();
    }, []);
    
    return (
      <div>
        {animals.map(animal => (
          <div key={animal._id}>
            <img src={animal.imageURL} alt={animal.name} 
            style={{width: '200px', height: '200px'}}/>
            <p>{animal.name}</p>
            <p>{animal.scientificName}</p>
            <Link to={`/animals/${animal._id}`}>See Details</Link>
          </div>
        ))}
      </div>
    );
}