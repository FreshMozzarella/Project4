import NavBar from "./NavBar"
import NavContainerMain from "./NavContainerMain"
import './NavContainer.css'
import { Container, Grid, Box } from '@mui/material';
export default function NavContainer(){
    return (
        <Container>
            <Box mb={2}>
               <NavBar />
            </Box>
            <Box>
               <NavContainerMain />
            </Box>
        </Container>
    )
    }
    