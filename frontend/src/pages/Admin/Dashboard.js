import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import ReportIcon from '@mui/icons-material/Report';
import TimelineIcon from '@mui/icons-material/Timeline';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const Dashboard = ({ onNavigate }) => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [activeDevices, setActiveDevices] = useState(0);
  const [recentSignups, setRecentSignups] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setActiveUsers(15);
      setActiveDevices(7);
      setRecentSignups(['User1', 'User2', 'User3', 'User4', 'User5']);
      setDeviceStatus([
        { name: 'Device A', status: 'Online' },
        { name: 'Device B', status: 'Offline' },
        { name: 'Device C', status: 'Offline' },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  // Data for activity line chart
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'User Signups',
        data: [12, 19, 3, 5, 2, 3, 12],
        borderColor: '#4CAF50',
        borderWidth: 2,
        pointBackgroundColor: '#4CAF50',
        pointBorderColor: '#fff',
      },
      {
        label: 'Device Activity',
        data: [8, 11, 6, 10, 12, 7, 15],
        borderColor: '#FF9800',
        borderWidth: 2,
        pointBackgroundColor: '#FF9800',
        pointBorderColor: '#fff',
      },
    ],
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f0f0',
          color: '#fff',
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        color: '#000',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Key Metrics Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: '20px',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <PeopleIcon
              sx={{ fontSize: 60, color: '#4CAF50', marginRight: '15px' }}
            />
            <Box>
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4">{activeUsers}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: '20px',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <DeviceHubIcon
              sx={{ fontSize: 60, color: '#FF9800', marginRight: '15px' }}
            />
            <Box>
              <Typography variant="h6">Active Devices</Typography>
              <Typography variant="h4">{activeDevices}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              padding: '20px',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TimelineIcon
              sx={{ fontSize: 60, color: '#2196F3', marginRight: '15px' }}
            />
            <Box>
              <Typography variant="h6">System Health</Typography>
              <Typography variant="h4">Good</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Weekly Activity Overview */}
      <Box mt={5}>
        <Paper sx={{ padding: '20px', backgroundColor: '#fff' }}>
          <Typography variant="h5" gutterBottom>
            Weekly Activity Overview
          </Typography>
          <Line data={chartData} />
        </Paper>
      </Box>


      {/* Quick Access Section */}
      <Box mt={5}>
        <Typography variant="h5" align="center" gutterBottom>
          Quick Access
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<PeopleIcon />}
            onClick={() => onNavigate('users')}
          >
            Manage Users
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeviceHubIcon />}
            onClick={() => onNavigate('devices')}
          >
            Manage Devices
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<ReportIcon />}
            onClick={() => onNavigate('reports')}
          >
            View Reports
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;