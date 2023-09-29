import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as birdService from '../../utilities/bird-service';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Pagination, Grid, Link, Box } from '@mui/material';
import '@fontsource/roboto/300.css'; // Importing specific weight
import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight

export default function Birds() {
  const [birds, setBirds] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchBirds() {
      try {
        const data = await birdService.getBirds();
        setBirds(data);
      } catch (error) {
        console.error('Error fetching bird list:', error);
      }
    }

    fetchBirds();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom component="div" style={{ fontFamily: 'Roboto', fontWeight: 500 }}>
        Common Birds in the Area:
      </Typography>

      <Grid container spacing={3}>
        {birds.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((bird) => (
          <Grid item xs={12} sm={6} md={4} key={bird._id}>
            <Card sx={{ maxWidth: 345 }}>
              <RouterLink to={`/birds/${bird._id}`} style={{ textDecoration: 'none' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={bird.imageURL}
                    alt={bird.speciesName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{ color: 'black', fontWeight: 300 }}>
                      {bird.speciesName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontWeight: 400 }}>
                      ({bird.scientificName})
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </RouterLink>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box display='flex' justifyContent='center' mb={6} mt={6}>
  <Pagination 
    count={Math.ceil(birds.length / itemsPerPage)} 
    variant="outlined" 
    shape="rounded" 
    page={page} 
    onChange={handleChange} 
  />
</Box>
    </div>
  );
}
