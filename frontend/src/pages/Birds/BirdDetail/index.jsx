import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import * as birdService from '../../../utilities/bird-service';
import { Link } from 'react-router-dom'
import {
  Card, CardContent, Typography, Divider, Container, Button,
  CardMedia, Box
} from '@mui/material';
import '@fontsource/roboto/300.css'; // Importing specific weight
import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight

export default function BirdDetail() {
  const [bird, setBird] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchBird() {
      try {
        const data = await birdService.getBird(id);
        setBird(data);
      } catch (error) {
        console.error('Error fetching bird details:', error);
      }
    }

    fetchBird();
  }, [id]);

  if (!bird) return <Container maxWidth="sm"><Typography>Loading...</Typography></Container>;

  return (
    <Container maxWidth="md">
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={bird.imageURL}
          alt={bird.speciesName}
          
        />
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom style={{ fontWeight: 500 }}>
            {bird.speciesName} ({bird.scientificName})
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>Family:</strong> {bird.family}
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>Weight:</strong> {bird.weight.min}oz - {bird.weight.max}oz
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>Wingspan:</strong> {bird.wingspan} inches
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>Distinctive Features:</strong> {bird.distinctiveFeatures}
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>Best Time to Spot:</strong> {bird.bestTimeToSpot}
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>Conservation Status:</strong> {bird.conservationStatus}
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>Diet:</strong> {bird.diet}
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>Audio:</strong>
          </Typography>
          <audio controls style={{ width: '100%', outline: 'none' }}>
            <source src={bird.audioURL} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>

          <Box mt={2} textAlign='right' sx={{ flexBasis: '100%' }}>
            <Button variant='outlined' component={Link} to='/birds'>
              Go Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
