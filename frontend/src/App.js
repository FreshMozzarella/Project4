
import Main from './components/Main';
import React from 'react';
import { Typography, Divider } from '@mui/material';
import '@fontsource/roboto/300.css'; // Importing specific weight
import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight
function App() {
  return (
    <div className="App">
      <Typography variant='h1' align='center' style={{fontFamily: 'Roboto', fontWeight: '500'}}>Explore Zion National Park</Typography>
      <Divider variant='fullWidth' textAlign='center'/>
      <Main />
    </div>
  );
}

export default App;
