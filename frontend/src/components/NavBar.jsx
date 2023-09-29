import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
export default function NavBar(){
    return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Link to='/' underline='none' color='inherit'>About</Link>
            </Grid>
            <Grid item xs={4}>
              <Link to='/birds' underline='none' color='inherit'>View Birds</Link>
            </Grid>
            <Grid item xs={4}>
              <Link to='/animals' underline='none' color='inherit'>View Animals</Link>
            </Grid>
          </Grid>
        </Box>
      );
}