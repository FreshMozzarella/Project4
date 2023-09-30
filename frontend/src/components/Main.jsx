import React, { useState } from 'react';
import { Container, Grid, Box } from '@mui/material';
import MapDisplay from './MapDisplay';
import PlantDisplay from './PlantDisplay'
import MapLegend from './MapLegend';
import NavContainer from './NavContainer';
import AirQuality from './AirQuality';
import Footer from './Footer';
import NPS from './NPS';
import './Main.css'

export default function Main() {
    const [colorMapping, setColorMapping] = useState({});
    const [legendStructure, setLegendStructure] = useState({});
    const [vegCName, setVegCName] = useState('');
    const [secondVegCName, setSecondVegCName] = useState('');

    return (
        <Container maxWidth={false} sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Grid container spacing={0} sx={{ flex: '1', overflow: 'auto', minHeight: '0' }}>
                {/* Left Column */}
                <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', overflow: 'auto', minHeight: '0', height: '100%' }}>
                    <Box sx={{ mb: 2, overflow: 'auto' }}>
                        <AirQuality />
                    </Box>
                    <Box sx={{ flex: '1', overflow: 'auto' }}>
                        <PlantDisplay vegCName={vegCName} secondVegCName={secondVegCName} />
                    </Box>
                </Grid>
                
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: '0' }}>
                    <Box sx={{ flexShrink: 0, overflow: 'auto' }}>
                        <MapDisplay
                            setColorMapping={setColorMapping}
                            setLegendStructure={setLegendStructure}
                            colorMapping={colorMapping}
                            setVegCName={setVegCName}
                            setSecondVegCName={setSecondVegCName}
                        />
                    </Box>
                    <Box sx={{ flexShrink: 0, overflow: 'auto' }}>
                        <NavContainer />
                    </Box>
                </Grid>


                {/* Right Column */}
                <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', overflow: 'auto', minHeight: '0' }}>
                    <Box sx={{ mb: 2 }}>
                        <NPS />
                    </Box>
                    <Box sx={{ flex: '1', overflow: 'auto' }}>
                        <MapLegend
                            colorMapping={colorMapping}
                            legendStructure={legendStructure}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </Container>
    );
}
