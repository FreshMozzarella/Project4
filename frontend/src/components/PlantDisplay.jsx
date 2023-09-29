import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PlantDisplayItem from './PlantDisplayItem';

export default function PlantDisplay({vegCName, secondVegCName}) {
  return (
    <Grid container spacing={2} sx={{ height: '100%', overflow: 'auto' }}>
    <Grid item xs={12} md={6}>
      {vegCName ? <PlantDisplayItem plantName={vegCName} /> : (
        <Box sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.1)',
          textAlign: 'center',
          padding: '1rem'
        }}>
          <Typography variant="body1">
            Click on a colored layer to learn more about plant data
          </Typography>
        </Box>
      )}
    </Grid>
    <Grid item xs={12} md={6}>
      {secondVegCName ? <PlantDisplayItem plantName={secondVegCName} /> : (
        <Box sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.1)',
          textAlign: 'center',
          padding: '1rem'
        }}>
          <Typography variant="body1">
            Click on a colored layer to learn more about plant data
          </Typography>
        </Box>
      )}
    </Grid>
  </Grid>
);
}