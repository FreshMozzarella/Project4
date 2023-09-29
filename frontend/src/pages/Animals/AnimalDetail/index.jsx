
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Container, Divider, Box, Button, List, ListItem, CardMedia } from '@mui/material';
import * as animalService from '../../../utilities/animal-service';

export default function AnimalDetail() {
  const [animal, setAnimal] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchAnimal() {
      try {
        const data = await animalService.getAnimal(id);
        setAnimal(data);
      } catch (error) {
        console.error("Error fetching animal", error);
      }
    }
    fetchAnimal();
  }, [id]);

  if (!animal) return <Container maxWidth="lg"><Typography>Loading...</Typography></Container>;

  return (
    <Container maxWidth="md">
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={animal.imageURL}
          alt={animal.name} />

        <CardContent>
          <Typography variant="h4" component='div' gutterBottom sx={{ flexBasis: '100%', textAlign: 'center', fontWeight: '500' }}>
            {animal.name} ({animal.scientificName})
          </Typography>
          <Divider variant="middle" />

          <Typography variant='body1' component="p" gutterBottom style={{ fontWeight: 300 }}><strong>Family: </strong> {animal.family}</Typography>
          <Divider variant="middle" />

          <Typography variant='body1' component="p" gutterBottom style={{ fontWeight: 300 }}><strong>Average Weight: </strong> {animal.averageWeightInPounds} lbs</Typography>
          <Divider variant="middle" />


          <Typography variant='body1' component="p" gutterBottom style={{ fontWeight: 300 }}><strong>Habitat: </strong> {animal.habitat}</Typography>
          <Divider variant="middle" />


          <Typography variant='body1' component="p" gutterBottom style={{ fontWeight: 300 }}><strong>Conservation Status: </strong> {animal.conservationStatus}</Typography>
          <Divider variant="middle" />

          <Divider variant="middle" />
          <Typography variant='body1' component="p" gutterBottom style={{ fontWeight: 300 }}><strong>Best Time to Spot: </strong> {animal.bestTimeToSee}</Typography>



          <Typography variant='body1' component="p" gutterBottom style={{ fontWeight: 300 }}><strong>Diet: </strong> {animal.diet}</Typography>
          <Divider variant="middle" />


          <Typography variant='body1' component="p" gutterBottom style={{ fontWeight: 300 }}><strong>Behavior: </strong> {animal.behavior}</Typography>
          <Divider variant="middle" />


          <Typography variant='body1' component="p" gutterBottom style={{ fontWeight: 300 }}><strong>Description: </strong> {animal.description}</Typography>
          <Divider variant="middle" />


          <Typography variant='body1' component="p" gutterBottom style={{ fontWeight: 300 }}><strong>Interesting fact: </strong> {animal.interestingFact}</Typography>
          <Divider variant="middle" />

          <Typography variant='body1' component="p" gutterBottom style={{ fontWeight: 300 }}><strong>Locations: </strong></Typography>
          <List>
            {animal.location.map((location, index) => (
              <ListItem key={index}>
                <Typography variant='body1' component="p" gutterBottom style={{ fontWeight: 300 }}>{location}</Typography>
              </ListItem>
            ))}
          </List>
          <Divider variant="middle" />


          <Box mt={2} textAlign='right' sx={{ flexBasis: '100%' }}>
          <Button variant='outlined' component={Link} to='/animals'>
              Go Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
