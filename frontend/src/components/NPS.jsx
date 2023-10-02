import './NPS.css'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Modal, List, ListItem, Button, CardMedia, Tab, Tabs, Box, IconButton, Divider } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
export default function NPS() {
  const theme = useTheme();
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
      <Typography textAlign='center' variant="h3" component="h1">National Park Information</Typography>
      <Divider variant='middle' />
      <Tabs value={tabValue} onChange={handleTabChange} sx={{
        '& .MuiTabs-flexContainer': {
          display: 'flex',
          justifyContent: 'space-around',
        }
      }} >
        <Tab label="Alerts" value="alerts" variant="outlined" sx={{ flex: 1 }} />
        <Tab label="Events" value="events" sx={{ flex: 1 }} />
        <Tab label="Things To Do" value="thingstodo" sx={{ flex: 1 }} />
      </Tabs>

      {tabValue === 'alerts' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {data.alerts.map((alert) => (
            <div key={alert.title} sx={{ padding: '0px', margin: '0px', flex: '1 0 auto' }}>
              <Card sx={{ cursor: 'pointer', borderRadius: '8px', height: '70px' }} onClick={() => handleOpenModal(alert)}>
                <CardContent>
                  <Typography variant="h6" component="h3" style={{ fontSize: '14px', color: 'grey' }}>
                    {alert.title}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {tabValue === 'events' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {data.events.map((event) => (
            <div key={event.title} sx={{ padding: '0px', margin: '0px', flex: '1 0 auto' }}>
              <Card sx={{ cursor: 'pointer', borderRadius: '8px', height: '70px' }} onClick={() => handleOpenModal(event)}>
                <CardContent>
                  <Typography variant="h6" component="h3" style={{ fontSize: '14px', color: 'grey' }}>
                    {event.title}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {tabValue === 'thingstodo' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {data.thingstodo.map((thing) => (
            <div key={thing.title} sx={{ padding: '0px', margin: '0px', flex: '1 0 auto' }}>
              <Card sx={{ cursor: 'pointer', borderRadius: '8px', height: '70px' }} onClick={() => handleOpenModal(thing)}>
                <CardContent>
                  <Typography variant="h6" component="h3" style={{ fontSize: '14px', color: 'grey' }}>
                    {thing.title}
                  </Typography>
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

            {tabValue === 'alerts' && (
              <>
                {selectedItem?.url && <Typography variant="body2"><a href={selectedItem.url} target="_blank" rel="noopener noreferrer">link</a></Typography>}

              </>
            )}

            {tabValue === 'events' && (
              <>
                {selectedItem?.datestart && <Typography variant="body2">From: {selectedItem?.datestart} to {selectedItem?.dateend}</Typography>}
                {selectedItem?.times && (
                  <Typography variant="body2">
                    Hours:
                    {selectedItem.times.map((timeObj, index) => (
                      <span key={index}>
                        {timeObj.timestart} - {timeObj.timeend}
                        {index < selectedItem.times.length - 1 && ', '}
                      </span>
                    ))}
                  </Typography>
                )}
                {selectedItem?.isfree && <Typography variant="body2">Is it free?: {selectedItem?.isfree}</Typography>}
                {selectedItem?.feeinfo && <Typography variant="body2">Fee info: {selectedItem?.feeinfo}</Typography>}
              </>
            )}

            {tabValue === 'thingstodo' && (
              <>
                {selectedItem?.duration && <Typography variant="body2">Average duration of activity: {selectedItem?.duration}</Typography>}
                {selectedItem?.activities && <Typography variant="body2">Activities: {selectedItem?.activities.join(', ')}</Typography>}
                {selectedItem?.feeDescription && <Typography variant="body2">Fee: {selectedItem?.feeDescription}</Typography>}
                {selectedItem?.season && <Typography variant="body2">Seasons available: {selectedItem?.season.join(', ')}</Typography>}
                {selectedItem?.arePetsPermitted && <Typography variant="body2">Are pets allowed?: {selectedItem?.arePetsPermitted}</Typography>}
              </>
            )}

            {selectedItem?.longitude && <Typography variant="body2">Exact location: {selectedItem?.longitude} - {selectedItem?.latitude}</Typography>}
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
}




