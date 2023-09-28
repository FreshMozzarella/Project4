import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import './MapDisplay.css'
import MapLegend from './MapLegend';
import { assignColorToVegetation } from '../utilities/colorUtility';
import extractPlantName from '../utilities/plantNameUtility'

function MapDisplay({ vegCName, setVegCName, secondVegCName, setSecondVegCName, setColorMapping, colorMapping, setLegendStructure }) {
  const [geoData, setGeoData] = useState(null);

  const layerStyle = (feature) => {
    const color = colorMapping[feature.properties.VEG_CNAME] || '#000000'; // default to black if no color assigned
    return {
      fillColor: color,
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  };

  const ResizeMap = () => {
    const map = useMap();
    useEffect(() => {
      map._onResize(); // Or, you could also try map.invalidateSize() if _onResize does not work.
    }, [map]); // Re-run effect when map changes
    return null;
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: (e) => onAreaClick(e, feature)
    });
  }

  const onAreaClick = (event, feature) => {
    const properties = feature.properties;
    let displayMessage = 'Properties:\n';
    
    // Existing Logic to display properties
    for (const key in properties) {
      if (Object.hasOwnProperty.call(properties, key)) {
        const value = properties[key];
        displayMessage += `${key}: ${value}\n`;
      }
    }
    alert(displayMessage);
    console.log("vegCName in MapDisplay:", vegCName);
   console.log("secondVegCName in MapDisplay:", secondVegCName);
    // New Logic for Extracting and Sanitizing the plant names.
if (properties && properties.VEG_CNAME) {
  const phrases = properties.VEG_CNAME.split('/');
  console.log('Phrases:', phrases);
  phrases.forEach((phrase, index) => {
    console.log('Current Phrase:', phrase); 
    const plantName = extractPlantName(phrase);
    console.log('Extracted Plant Name:', plantName); // Log here to debug
    if (plantName) {
      if(index === 0) setVegCName(plantName);
      else if(index === 1) setSecondVegCName(plantName);
    }
  });
}
    
};

  useEffect(() => {
    fetch("https://zionnp.s3.amazonaws.com/Map-data/testzionveg(1).json")
        .then(response => response.json())
        .then(data => {
            const { colorMapping, legendStructure } = assignColorToVegetation(data);
            console.log('Assigned Color Mapping: ', colorMapping);
      console.log('Assigned Legend Structure: ', legendStructure);
            setColorMapping(colorMapping);
            setLegendStructure(legendStructure);
            setGeoData(data);  // Setting geoData state here for GeoJSON rendering
        });
  }, []);
  
  return (
    <MapContainer 
    className='map-container' 
    center={[37.3, -113.1]} 
    zoom={15} 
    minZoom={10} 
    maxZoom={18} 
    maxBounds={[
    [37.1120777114917004, -113.2526723447929982], // southwest corner
    [37.5263590017140984, -112.8271737053120063]  // northeast corner
  ]}>
      <ResizeMap /> 
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoData && <GeoJSON data={geoData} style={layerStyle} onEachFeature={onEachFeature} />}
    </MapContainer>
    
  );
}

export default MapDisplay;
