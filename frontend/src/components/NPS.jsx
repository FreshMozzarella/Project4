import './NPS.css'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Modal, List, ListItem, Button, CardMedia, Tab, Tabs, Box, IconButton } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
export default function NPS() {
  const BASE_URL = `${process.env.REACT_APP_BASE_URL}/plant`
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({ events: [], alerts: [], thingstodo: [] });
  const [selectedItem, setSelectedItem] = useState(null);
  const [tabValue, setTabValue] = useState('alerts');

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setOpenModal(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
    <Box>
      <Typography variant="h3" component="h1">National Park Information</Typography>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Alerts" value="alerts" />
        <Tab label="Events" value="events" />
        <Tab label="Things To Do" value="thingstodo" />
      </Tabs>


      {tabValue === 'alerts' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {data.alerts.map((alert) => (
            <div key={alert.title} sx={{ padding: '0px', margin: '0px', flex: '1 0 auto' }}>
              <Card sx={{ borderRadius: '8px', height: '70px' }}>
                <CardContent>
                  <Typography variant="h6" component="h3" style={{ fontSize: '14px', color: 'grey' }}>
                    {alert.title}
                  </Typography>
                  <IconButton onClick={() => handleOpenModal(alert)}>
                    <InfoSharpIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card>
          <CardContent>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: selectedItem?.description }} />
          </CardContent>
        </Card>
      </Modal>


      {tabValue === 'events' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {data.events.map((event) => (
            <div key={event.title} sx={{ padding: '0px', margin: '0px', flex: '1 0 auto' }}>
              <Card sx={{ borderRadius: '8px', height: '70px' }}>
                <CardContent>
                  <Typography variant="h6" component="h3" style={{ fontSize: '14px', color: 'grey' }}>
                    {event.title}
                  </Typography>
                  <IconButton onClick={() => handleOpenModal(event)}>
                    <InfoSharpIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card>
          {/* add images */}
          <CardContent>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: selectedItem?.description }} />
            {selectedItem?.datestart && <Typography variant="body2">From: {selectedItem?.datestart} to {selectedItem?.dateend}</Typography>}
            {selectedItem?.times && <Typography variant="body2">Hours: {Object.values(selectedItem?.times).join(', ')}</Typography>}
            {selectedItem?.isfree && <Typography variant="body2">Is it free?: {selectedItem?.isfree}</Typography>}
            {selectedItem?.feeinfo && <Typography variant="body2">Fee info: {selectedItem?.feeinfo}</Typography>}
            {selectedItem?.longitude && <Typography variant="body2">Exact location: {selectedItem?.longitude} - {selectedItem?.latitude}</Typography>}
          </CardContent>
        </Card>
      </Modal>



      {tabValue === 'thingstodo' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {data.thingstodo.map((thing) => (
            <div key={thing.title} sx={{ padding: '0px', margin: '0px', flex: '1 0 auto' }}>
              <Card sx={{ borderRadius: '8px', height: '70px' }}>
                <CardContent>
                  <Typography variant="h6" component="h3" style={{ fontSize: '14px', color: 'grey' }}>
                    {thing.title}
                  </Typography>
                  <IconButton onClick={() => handleOpenModal(thing)}>
                    <InfoSharpIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card>
          {/* add images when we figure out how to find the right path */}
          <CardContent>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: selectedItem?.description }} />
            {selectedItem?.duration && <Typography variant="body2">Average duration of activity: {selectedItem?.duration}</Typography>}
            {selectedItem?.activities && <Typography variant="body2">Activities: {selectedItem?.activities.join(', ')}</Typography>}
            {selectedItem?.feeDescription && <Typography variant="body2">Fee: {selectedItem?.feeDescription}</Typography>}
            {selectedItem?.season && <Typography variant="body2">Seasons available: {selectedItem?.season.join(', ')}</Typography>}
            {selectedItem?.arePetsPermitted && <Typography variant="body2">Are pets allowed?: {selectedItem?.arePetsPermitted}</Typography>}
            {selectedItem?.longitude && <Typography variant="body2">Exact location: {selectedItem?.longitude} - {selectedItem?.latitude}</Typography>}
          </CardContent>
        </Card>
      </Modal>

    </Box>
  );
}


