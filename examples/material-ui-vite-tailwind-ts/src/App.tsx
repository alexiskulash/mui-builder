import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
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

export default function App() {
  return (
    <Container maxWidth="md">
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

        <ProTip />
        <Divider sx={{ my: 2 }} />
        <Copyright />
      </Box>
    </Container>
  );
}
