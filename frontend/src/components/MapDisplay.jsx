import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, ScaleControl } from 'react-leaflet';
import './MapDisplay.css'
import MapLegend from './MapLegend';
import { assignColorToVegetation } from '../utilities/colorUtility';
import extractPlantName from '../utilities/plantNameUtility'
import { Container, Modal, Typography, Box } from '@mui/material';
function MapDisplay({ vegCName, setVegCName, secondVegCName, setSecondVegCName, setColorMapping, colorMapping, setLegendStructure }) {
  const [geoData, setGeoData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

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
    const selectedArea = {
      name: properties.VEG_NAME || '',
      commonName: properties.VEG_CNAME || '',
      ecology: properties.ECOLOGY || '',
      group: properties.GROUP || '',
      formation: properties.FORMATION || '',
      comments: `${properties.COMMENT1 || ''} ${properties.COMMENT2 || ''}`.trim(),
    };
    setSelectedArea(selectedArea);
    setModalOpen(true);

    // New Logic for Extracting and Sanitizing the plant names.
    if (properties && properties.VEG_CNAME) {
      const phrases = properties.VEG_CNAME.split('/');
      
      phrases.forEach((phrase, index) => {
        
        const plantName = extractPlantName(phrase);
        

        // If plantName includes comma, split it into two different names.
        if (plantName.includes(',')) {
          const [firstPlant, secondPlant] = plantName.split(', ');
          setVegCName(firstPlant.trim());
          setSecondVegCName(secondPlant.trim());
        } else {
          // If there is only one plantName, set it to the appropriate state variable based on the index.
          if (index === 0) setVegCName(plantName);
          else if (index === 1) setSecondVegCName(plantName);
        }
      });
    }
  };

  const closeModal = () => setModalOpen(false);
  useEffect(() => {
    fetch("https://zionnp.s3.amazonaws.com/Map-data/testzionveg(1).json")
      .then(response => response.json())
      .then(data => {
        const { colorMapping, legendStructure } = assignColorToVegetation(data);
        
        setColorMapping(colorMapping);
        setLegendStructure(legendStructure);
        setGeoData(data);  // Setting geoData state here for GeoJSON rendering
      });
  }, []);

  return (<Container
    sx={{
      width: '50vw', // 50% of Viewport Width. Adjust as needed
      height: '50vh', // 80% of Viewport Height. Adjust as needed
      position: 'relative', // To help position inner elements like MapLegend
      overflow: 'hidden',
      flex: 1, // To clip off any overflowing content
    }}>
    <MapContainer
      className='map-container'
      center={[37.3, -113.1]}
      zoom={15}
      minZoom={10}
      maxZoom={18}
      maxBounds={[
        [37.1120777114917004, -113.2526723447929982], // southwest corner
        [37.5263590017140984, -112.8271737053120063]  // northeast corner
      ]}
      style={{ height: '100%', width: '100%' }}
    >
      <ResizeMap />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ScaleControl position="bottomleft" />
      {geoData && <GeoJSON data={geoData} style={layerStyle} onEachFeature={onEachFeature} />}
    </MapContainer>
    <Modal open={modalOpen} onClose={closeModal}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        width: '80%',
        maxWidth: '500px',
        outline: 'none',
      }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
    Name: <span style={{ fontWeight: 'normal' }}>{selectedArea?.name}</span>
  </Typography>
  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
    Common Name: <span style={{ fontWeight: 'normal' }}>{selectedArea?.commonName}</span>
  </Typography>
  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
    Ecology: <span style={{ fontWeight: 'normal' }}>{selectedArea?.ecology}</span>
  </Typography>
  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
    Group: <span style={{ fontWeight: 'normal' }}>{selectedArea?.group}</span>
  </Typography>
  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
    Formation: <span style={{ fontWeight: 'normal' }}>{selectedArea?.formation}</span>
  </Typography>
  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
    Comments: <span style={{ fontWeight: 'normal' }}>{selectedArea?.comments}</span>
  </Typography>
      </Box>
    </Modal>
  </Container>

  );
}

export default MapDisplay;
