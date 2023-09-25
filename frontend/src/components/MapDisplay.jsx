import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import './MapDisplay.css'

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

  useEffect(() => {
    if (geoData) {
      const newColorMapping = {...colorMapping};

      geoData.features.forEach(feature => {
        const name = feature.properties.VEG_NAME;
        if (!newColorMapping[name]) {
          newColorMapping[name] = stringToColor(name);
        }
      });

      setColorMapping(newColorMapping);
    }
  }, [geoData]);

  const layerStyle = (feature) => {
    const color = colorMapping[feature.properties.VEG_NAME] || '#000000'; // default to black if no color assigned
    return {
      fillColor: color,
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: (e) => onAreaClick(e, feature)
    });
  }

  const onAreaClick = (event, feature) => {
    const properties = feature.properties;
    let displayMessage = 'Properties:\n';
  
    // Iterating over all properties and appending to the display message
    for (const key in properties) {
      if (Object.hasOwnProperty.call(properties, key)) {
        const value = properties[key];
        displayMessage += `${key}: ${value}\n`;
      }
    }
    
    alert(displayMessage);
  };
  useEffect(() => {
    fetch("/mapdata/zionveg.geojson")
      .then(response => response.json())
      .then(data => setGeoData(data));
  }, []);

  return (
    <MapContainer className='map-container' center={[37.3, -113.1]} zoom={15}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoData && <GeoJSON data={geoData} style={layerStyle} onEachFeature={onEachFeature} />}
    </MapContainer>
  );
}

export default MapDisplay;
