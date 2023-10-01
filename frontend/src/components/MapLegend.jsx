import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

function MapLegend({ legendStructure, colorMapping }) {
  if (!legendStructure || !colorMapping) {
    return <Box>Loading legend...</Box>;
  }
  
  return (
    <Box 
      sx={{ 
        p: 1, 
        border: '1px solid #ccc',
        overflowY: 'auto',
      }}
    >
      {Object.entries(legendStructure).map(([ecoName, { vegCNames }]) => (
        <Box key={ecoName} sx={{ mb: 2 }}> {/* Replaces .eco-name-section */}
          <Typography variant="h6" gutterBottom textAlign='center'>{ecoName}</Typography>
          <Grid container spacing={1}>
            {vegCNames.map(vegCName => (
              <Grid item xs={6} key={vegCName}>
                <Box
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 0.5, // Replaces margin-bottom in .legend-item
                    flexWrap: 'wrap',
                  }}
                >
                  <Box
                    sx={{ 
                      width: 20, // From .legend-color
                      height: 20, // From .legend-color
                      mr: 1, // Replaces margin-right in .legend-color
                      backgroundColor: colorMapping[vegCName],
                    }}
                  />
                  <Typography variant="body2" noWrap>
                    {vegCName}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default MapLegend;
