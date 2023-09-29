import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, Container, Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import * as animalService from '../../utilities/animal-service';

export default function Animals() {
  const [animals, setAnimals] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedAnimals = await animalService.getAnimals();
        setAnimals(fetchedAnimals);
      } catch (error) {
        console.error("Error fetching animals", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

    return (
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom component="div" style={{ fontFamily: 'Roboto', fontWeight: 500 }}>
        Common Animals in the Area:
      </Typography>
        <Grid container spacing={3}>
          {animals.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((animal) => (
            <Grid item xs={12} sm={6} md={6} key={animal._id}> {/* Adjust Grid items for even distribution */}
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}> {/* Set Card height to 100% of Grid item */}
                <CardActionArea component={Link} to={`/animals/${animal._id}`} sx={{ flex: '1' }}>
                  <CardMedia
                    component="img"
                    height="200" 
                    image={animal.imageURL}
                    alt={animal.name}
                    sx={{ objectFit: 'cover' }} 
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {animal.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {animal.scientificName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box display='flex' justifyContent='center' mb={6} mt={6}>
          <Pagination count={Math.ceil(animals.length / itemsPerPage)} variant="outlined" shape="rounded" page={page} onChange={handleChange} />
        </Box>
      </Container>
    );
}
