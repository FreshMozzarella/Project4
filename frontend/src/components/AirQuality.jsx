import React, { useState, useEffect } from 'react';
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
    <div>
      <h2>Air Quality</h2>
      <p>AQI (US): {aqius} - {getAqiRating(aqius)}</p>
      <h2>Weather</h2>
      <img src={weatherIcons[ic]?.icon || '#'} alt={weatherIcons[ic]?.description || 'Weather icon'} />
      <p>{weatherIcons[ic]?.description || 'Weather description'}</p>
      <p>Temperature: {tp} °C / {convertToFahrenheit(tp)} °F</p>
      <p>Pressure: {pr} hPa ({pr >= 1000 ? 'Normal' : 'Low'})</p>
      <p>Humidity: {hu} %</p>
      <p>Wind Speed: {ws} m/s / {convertMsToMph(ws)} mph</p>
      <p>Wind Direction: {wd}° {getDirection(wd)}</p>
    </div>
  );
}


