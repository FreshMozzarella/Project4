import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as animalService from '../../../utilities/animal-service';

export default function AnimalDetail(){
    const [animal, setAnimal] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
      async function fetchAnimal() {
        try {
          const data = await animalService.getAnimal(id);
          setAnimal(data);
        } catch(error) {
          console.error("Error fetching animal", error);
        }
      }
      fetchAnimal();
    }, [id]);
    
    if (!animal) return <div>Loading...</div>;
    
    return (
      <div>
        <p><strong>Name:</strong> {animal.name}</p>
        <p><strong>Scientific Name:</strong> {animal.scientificName}</p>
        <img src={animal.imageURL} alt={animal.name} style={{width: '300px', height: '300px'}}/>
        <p><strong>Family:</strong> {animal.family}</p>
        <p><strong>Average weight:</strong> {animal.averageWeightInPounds} lbs</p>
        <p><strong>Description: </strong> {animal.description}</p>
        <p><strong>Diet: </strong> {animal.diet}</p>
        <p><strong>Habitat: </strong> {animal.habitat}</p>
        <p><strong>Behavior: </strong> {animal.behavior}</p>
        <p><strong>Conservation Status: </strong> {animal.conservationStatus}</p>
        <p><strong>Best time to spot: </strong> {animal.bestTimeToSee}</p>
        <p><strong>Locations: </strong></p>
        <ul>
        {animal.location.map((location, index) => (
          <li key={index}>{location}</li>
        ))}
      </ul>
        <p><strong>Interesting fact: </strong> {animal.interestingFact}</p>
      </div>
    );
}