import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';
import './Footer.css'

export default function Footer(){
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6, mt: 'auto' }}>
          <Container maxWidth="sm">
            <Typography variant="body1" align="center">
              Created by Your Name
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              <Link color="inherit" href="#" target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>{' '}
              |{' '}
              <Link color="inherit" href="#" target="_blank" rel="noopener noreferrer">
                Portfolio
              </Link>
            </Typography>
          </Container>
        </Box>
      );
}