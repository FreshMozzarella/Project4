import React, { useState, useEffect } from 'react';
import './AirQuality.css'
import {
  Container,
  Typography,
  Divider,
  Box,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  weatherIcons,
  convertToFahrenheit,
  convertMsToMph,
  getAqiRating,
  getDirection,
} from '../utilities/WeatherUtility';

export default function AirQuality() {
  const [data, setData] = useState(null);
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/plant`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/nearestStation`);
        if (!response.ok) throw new Error('Network response was not ok' + response.statusText);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const {
    aqius,
    mainus,
  } = data.current.pollution;

  const {
    tp,
    pr,
    hu,
    ws,
    wd,
    ic,
  } = data.current.weather;

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" 
          gutterBottom 
          style={{ fontWeight: 500 }}
          textAlign='center'>
            Air Quality
          </Typography>
          <Divider variant="middle" />
          <Box mt={2} mb={2} display='flex' flexDirection='column' alignItems='center'>
            <CardMedia
              component="img"
              height="140"
              image={weatherIcons[ic]?.icon || '#'}
              alt={weatherIcons[ic]?.description || 'Weather icon'}
              sx={{ 
                width: '100%', // width is 100% of the container
                maxHeight: '150px', // Limiting Maximum height to fit the container, can adjust as per need
                objectFit: 'contain' // The image will scale while maintaining its aspect ratio
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {weatherIcons[ic]?.description || 'Weather description'}
            </Typography>
          </Box>
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>AQI (US):</strong> {aqius} - {getAqiRating(aqius)}
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>Temperature:</strong> {tp} °C / {convertToFahrenheit(tp)} °F
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>Pressure:</strong> {pr} hPa ({pr >= 1000 ? 'Normal' : 'Low'})
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}> {/* will use Typography component that mimics a p component which uses a bottom margin with a fontWeight style of 300 */}
            <strong>Humidity:</strong> {hu} %
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>Wind Speed:</strong> {ws} m/s / {convertMsToMph(ws)} mph
          </Typography>
          <Divider variant="middle" />
          <Typography variant="body1" component="p" gutterBottom style={{ fontWeight: 300 }}>
            <strong>Wind Direction:</strong> {wd}° {getDirection(wd)}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}


