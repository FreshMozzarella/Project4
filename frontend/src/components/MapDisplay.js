import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

function MapDisplay() {
  const [geoData, setGeoData] = useState(null);
  const [colorMapping, setColorMapping] = useState({});

  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

const uniqueColorCount = Object.keys(colorMapping).length;
console.log(`Unique colors used: ${uniqueColorCount}`);


const layerStyle = (feature) => {
  let color = colorMapping[feature.properties.VEG_NAME];
  
  // If the color is not yet defined for this vegetation name, generate it
  if (!color) {
    color = stringToColor(feature.properties.VEG_NAME);
    
    // Save the color to the mapping
    setColorMapping(prevMapping => ({ ...prevMapping, [feature.properties.VEG_NAME]: color }));
  }

  return {
    fillColor: color,
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
};

const onEachFeature = (feature, layer) => {
    // Attach click event to each feature
    layer.on({
      click: (e) => onAreaClick(e, feature)
    });
  }
  
  const onAreaClick = (event, feature) => {
    const { VEG_NAME, ECOLOGY, PHYSIO, COMMENT1, COMMENT2 } = feature.properties;

    const displayMessage = `
    Vegetation Name: ${VEG_NAME}
    Ecology: ${ECOLOGY}
    Physical Structure: ${PHYSIO}
    Comments: ${COMMENT1}. ${COMMENT2}
    `;
    
    alert(displayMessage);
  };
  
  useEffect(() => {
    // Fetch the geojson data on component mount
    fetch("/mapdata/zionveg.geojson")
      .then(response => response.json())
      .then(data => setGeoData(data));
  }, []);

  return (
    <MapContainer center={[37.3, -113.1]} zoom={15} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoData && <GeoJSON data={geoData} style={layerStyle} onEachFeature={onEachFeature} />}
    </MapContainer>
  );
}

export default MapDisplay;