import {Routes, Route} from 'react-router-dom'
import './NavContainerMain.css'
import Birds from '../pages/Birds/'
import BirdDetail from '../pages/Birds/BirdDetail/'
import Animals from '../pages/Animals/'
import AnimalDetail from '../pages/Animals/AnimalDetail/'
import About from '../pages/About/'
import { Container, Box } from '@mui/material';

export default function NavContainerMain() {
  return (
    <Container>
      <Box p={2}>
        <Routes>
          <Route path='/' element={<About />} />
          <Route path='/birds' element={<Birds />} />
          <Route path='/birds/:id' element={<BirdDetail />} />
          <Route path='/animals' element={<Animals />} />
          <Route path='/animals/:id' element={<AnimalDetail />} />
        </Routes>
      </Box>
    </Container>
  );
}
