
import Main from './components/Main';
import React, { useState } from 'react';
import { Typography, Divider, createTheme, ThemeProvider, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css'; // Importing specific weight
import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight
function App() {
  const [mode, setMode] = useState('light');
  const theme = createTheme({
    palette: {
      mode: mode, // This is the key for enabling color mode
      primary: mode === 'light' ? {
        main: '#43a047', // primary main color in light mode
        contrastText: '#ffffff', // contrast text color in light mode
      } : {
        main: '#c8e6c9', // primary main color in dark mode
        contrastText: '#000000', // contrast text color in dark mode
      },
    },
  });
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  return (
    
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <Typography variant='h1' align='center' style={{fontFamily: 'Roboto', fontWeight: '500'}}>Explore Zion National Park</Typography>
      <Button color="primary" onClick={toggleMode}>Light/Dark mode</Button>
      <Divider variant='fullWidth' textAlign='center'/>
      <Main />
      </ThemeProvider>
  );
}

export default App;
