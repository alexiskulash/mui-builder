import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{ color: 'text.secondary' }}
    >
      {'More content to come'}
    </Typography>
  );
}

type Route = 'home' | 'components' | 'about';

function useHashRoute(): [Route, (r: Route) => void] {
  const parse = (): Route => {
    const h = window.location.hash.replace(/^#\/?/, '');
    if (h.startsWith('components')) return 'components';
    if (h.startsWith('about')) return 'about';
    return 'home';
  };
  const [route, setRoute] = React.useState<Route>(parse);
  React.useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  const navigate = (r: Route) => {
    const path = r === 'home' ? '#/' : `#/${r}`;
    if (window.location.hash !== path) window.location.hash = path;
    setRoute(r);
  };
  return [route, navigate];
}





function DashboardSection() {
  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" sx={{ mb: 1, textAlign: 'center' }}>
        Dashboard
      </Typography>
    </Box>
  );
}

function ComponentsSection() {
  return <Box sx={{ my: 6 }} />;
}

function AboutSection() {
  return <Box sx={{ my: 6 }} />;
}

export default function App() {
  const [route, navigate] = useHashRoute();
  return (
    <Box>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Starter Template
          </Typography>
          <Button color="primary" onClick={() => navigate('home')} href="#/">Home</Button>
          <Button color="primary" onClick={() => navigate('components')} href="#/components">ABOUT</Button>
          <Button color="primary" onClick={() => navigate('about')} href="#/about">Login</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        {route === 'home' && <DashboardSection />}
        {route === 'components' && <ComponentsSection />}
        {route === 'about' && <AboutSection />}
        <Copyright />
      </Container>
    </Box>
  );
}
