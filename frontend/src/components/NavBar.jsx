import { Tabs, Tab } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();
  const tabNames = ['/', '/birds', '/animals'];
  const currentIndex = tabNames.indexOf(location.pathname);

  return (
    <Tabs value={currentIndex} indicatorColor="primary" textColor="primary" variant="fullWidth">
      <Tab label="About" component={Link} to="/" />
      <Tab label="View Birds" component={Link} to="/birds" />
      <Tab label="View Animals" component={Link} to="/animals" />
    </Tabs>
  );
}
