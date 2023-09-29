
import React, { useState, useEffect } from 'react';
export default function NPS(){
    const [data, setData] = useState({
        events: [],
        alerts: [],
        thingstodo: []
      });
      const [error, setError] = useState(null);
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/plant`
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${BASE_URL}/allParkInfo`);
            if (!response.ok) throw new Error('Network response was not ok' + response.statusText);
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
          }
        };
    
        fetchData();
      }, []);
    return (
<div>
  <h1>National Park Information</h1>
  
  {error && <p>{error}</p>}
  
  <h2>Events</h2>
  <ul>
    {data.events.map(event => (
      <li key={event.title}>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <p>From: {event.datestart} to {event.dateend}</p>
        <p>Hours: {event.times.join(', ')}</p>
        <p>Is it free? : {event.isfree}</p>
        <p>Fee info: {event.feeinfo}</p>
        <p>Images:</p>
        {event.images.map((image, index) => (
          <img key={index} src={image.url} alt={event.title} width="100" height="100" />
        ))}
        <p>Exact location: {event.longitude} - {event.latitude}</p>
      </li>
    ))}
  </ul>

  <h2>Alerts</h2>
  <ul>
    {data.alerts.map(alert => (
      <li key={alert.title}>
        <a href={alert.url} target="_blank" rel="noopener noreferrer">{alert.title}</a>
        <p>{alert.description}</p>
      </li>
    ))}
  </ul>

  <h2>Things To Do</h2>
  <ul>
    {data.thingstodo.map(thing => (
      <li key={thing.title}>
        <a href={thing.url} target="_blank" rel="noopener noreferrer">{thing.title}</a>
        <p>{thing.description}</p>
        {thing.images.map((image, index) => (
          <img key={index} src={image.url} alt={thing.title} width="100" height="100" />
        ))}
        <p>Average duration of activity: {thing.duration}</p>
        <p>Activities: {thing.activities.join(', ')}</p>
        <p>Fee: {thing.feeDescription}</p>
        <p>Seasons available: {thing.season.join(', ')}</p>
        <p>Are pets allowed? : {thing.arePetsPermitted}</p>
        <p>Exact location: {thing.longitude} - {thing.latitude}</p>
      </li>
    ))}
  </ul>
</div>
  );
}