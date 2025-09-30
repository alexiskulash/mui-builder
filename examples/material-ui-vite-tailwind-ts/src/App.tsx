import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

function Sparkline({ data, stroke = '#1976d2' }: { data: number[]; stroke?: string }) {
  const width = 120;
  const height = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * (width - 4) + 2;
      const y = height - 2 - ((d - min) / Math.max(1, max - min)) * (height - 4);
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}

function StatCard(props: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'flat';
  series: number[];
}) {
  const color = props.trend === 'up' ? 'success' : props.trend === 'down' ? 'error' : 'default';
  const stroke = props.trend === 'up' ? '#2e7d32' : props.trend === 'down' ? '#d32f2f' : '#6b7280';
  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {props.title}
            </Typography>
            <Typography variant="h5" sx={{ mt: 0.5 }}>
              {props.value}
            </Typography>
            <Chip size="small" color={color} label={props.change} sx={{ mt: 1 }} />
          </Box>
          <Sparkline data={props.series} stroke={stroke} />
        </Stack>
      </CardContent>
    </Card>
  );
}

function createRow(
  id: number,
  customer: string,
  product: string,
  amount: string,
  status: 'Paid' | 'Pending' | 'Refunded',
  date: string,
) {
  return { id, customer, product, amount, status, date };
}

const rows = [
  createRow(1, 'Eleanor Pena', 'Pro subscription', '$120.00', 'Paid', '2025-03-10'),
  createRow(2, 'Cody Fisher', 'Consulting hours', '$480.00', 'Paid', '2025-03-09'),
  createRow(3, 'Jacob Jones', 'Team plan', '$960.00', 'Pending', '2025-03-09'),
  createRow(4, 'Savannah Nguyen', 'One-time setup', '$350.00', 'Refunded', '2025-03-08'),
  createRow(5, 'Courtney Henry', 'Enterprise plan', '$2,500.00', 'Paid', '2025-03-07'),
];

function DashboardSection() {
  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Overview of your product metrics and recent activity.
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value="18,240"
            change="+4.2% vs last 7 days"
            trend="up"
            series={[12, 13, 13, 14, 15, 17, 16, 18]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Orders"
            value="1,286"
            change="+1.1% vs last 7 days"
            trend="up"
            series={[140, 142, 139, 141, 143, 146, 145, 148]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue"
            value="$64,920"
            change="-0.8% vs last 7 days"
            trend="down"
            series={[62, 64, 63, 64, 63, 65, 64, 64]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Conversion"
            value="3.7%"
            change="+0.2pp vs last 7 days"
            trend="flat"
            series={[3.5, 3.6, 3.7, 3.6, 3.7, 3.7, 3.7, 3.7].map((n) => n * 10)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardHeader title="Recent Orders" subheader="Latest 5 payments" />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <TableContainer component={Paper as any} sx={{ borderRadius: 0, boxShadow: 'none' }}>
                <Table size="small" aria-label="recent orders table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id} hover>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.customer}</TableCell>
                        <TableCell>{row.product}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            color={
                              row.status === 'Paid'
                                ? 'success'
                                : row.status === 'Pending'
                                ? 'warning'
                                : 'default'
                            }
                            label={row.status}
                          />
                        </TableCell>
                        <TableCell>{row.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader title="Performance" subheader="This week" />
            <Divider />
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Uptime</Typography>
                  <Typography>99.97%</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Avg. Response</Typography>
                  <Typography>214 ms</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Errors</Typography>
                  <Typography>0.12%</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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
