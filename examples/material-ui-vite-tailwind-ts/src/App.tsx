import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import PopoverMenu from './PopoverMenu';
import ProTip from './ProTip';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{ color: 'text.secondary' }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
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

function HomeSection() {
  return (
    <Box
      sx={{
        my: 6,
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 },
        textAlign: 'center',
        borderRadius: 3,
        background: 'linear-gradient(180deg, hsl(210, 20%, 98%) 0%, #fff 100%)',
      }}
    >
      <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
        Material UI Starter Template
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4 }}>
        A clean, light starting point for future prototypes.
      </Typography>
      <ProTip />
      <Divider sx={{ my: 2 }} />
      <Copyright />
    </Box>
  );
}

function ComponentsSection() {
  return (
    <Box sx={{ my: 6 }}>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, maxWidth: 560, mx: 'auto', mb: 4 }}>
        <Stack spacing={2} alignItems="stretch">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Try the components:
          </Typography>
          <Slider
            className="my-1"
            defaultValue={30}
            classes={{ active: 'shadow-none' }}
            slotProps={{ thumb: { className: 'hover:shadow-none' } }}
          />
          <Stack direction="row" spacing={1} justifyContent="center">
            <PopoverMenu />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

function AboutSection() {
  return (
    <Box sx={{ my: 6, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        About
      </Typography>
      <Typography color="text.secondary">
        This starter helps you spin up quick prototypes with Material UI and Vite.
      </Typography>
    </Box>
  );
}

export default function App() {
  const [route, navigate] = useHashRoute();
  return (
    <Box>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Material UI Starter Template
          </Typography>
          <Button color="primary" onClick={() => navigate('home')} href="#/">Home</Button>
          <Button color="primary" onClick={() => navigate('components')} href="#/components">Components</Button>
          <Button color="primary" onClick={() => navigate('about')} href="#/about">About</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        {route === 'home' && <HomeSection />}
        {route === 'components' && <ComponentsSection />}
        {route === 'about' && <AboutSection />}
      </Container>
    </Box>
  );
}
