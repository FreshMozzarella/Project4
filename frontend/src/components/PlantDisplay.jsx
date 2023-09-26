import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlantDisplayItem from './PlantDisplayItem'
export default function PlantDisplay({vegCName, secondVegCName}){
  console.log('Received vegCName: ', vegCName);
  console.log('Received secondVegCName: ', secondVegCName);
    
      return (
    <div>
      {vegCName && <PlantDisplayItem plantName={vegCName} />}
      {secondVegCName && <PlantDisplayItem plantName={secondVegCName} />}
    </div>
      );
    }