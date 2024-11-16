import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, CircularProgress, Box, Button } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip } from 'chart.js';
import PeopleIcon from '@mui/icons-material/People';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import TimelineIcon from '@mui/icons-material/Timeline';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  // Simulated placeholders for the data
  const activeUsers = '...'; // Placeholder
  const activeDevices = '...'; // Placeholder
  const recentSignups = Array(5).fill('...'); // Placeholder
  const deviceStatus = Array(3).fill({ name: '...', status: '...' }); // Placeholder

  // Chart placeholder data
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'User Signups',
        data: [0, 0, 0, 0, 0, 0, 0], // Placeholder
        borderColor: '#4CAF50',
        borderWidth: 2,
        pointBackgroundColor: '#4CAF50',
        pointBorderColor: '#fff',
      },
      {
        label: 'Device Activity',
        data: [0, 0, 0, 0, 0, 0, 0], // Placeholder
        borderColor: '#FF9800',
        borderWidth: 2,
        pointBackgroundColor: '#FF9800',
        pointBorderColor: '#fff',
      },
    ],
  };

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px', backgroundColor: '#333', display: 'flex', alignItems: 'center' }}>
            <PeopleIcon sx={{ fontSize: 60, color: '#4CAF50', marginRight: '15px' }} />
            <Box>
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4">{activeUsers}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px', backgroundColor: '#333', display: 'flex', alignItems: 'center' }}>
            <DeviceHubIcon sx={{ fontSize: 60, color: '#FF9800', marginRight: '15px' }} />
            <Box>
              <Typography variant="h6">Active Devices</Typography>
              <Typography variant="h4">{activeDevices}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '20px', backgroundColor: '#333', display: 'flex', alignItems: 'center' }}>
            <TimelineIcon sx={{ fontSize: 60, color: '#2196F3', marginRight: '15px' }} />
            <Box>
              <Typography variant="h6">System Health</Typography>
              <Typography variant="h4">Good</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Line Chart for User and Device Activity */}
      <Box mt={5}>
        <Paper sx={{ padding: '20px', backgroundColor: '#333' }}>
          <Typography variant="h5" gutterBottom>
            Weekly Activity Overview
          </Typography>
          <Line data={chartData} />
        </Paper>
      </Box>

      {/* Recent Activity and System Status */}
      <Grid container spacing={4} mt={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: '20px', backgroundColor: '#333' }}>
            <Typography variant="h5" gutterBottom>
              Recent User Signups
            </Typography>
            {recentSignups.map((user, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{ padding: '5px', backgroundColor: '#444', marginBottom: '5px', borderRadius: '5px' }}
              >
                {user}
              </Typography>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: '20px', backgroundColor: '#333' }}>
            <Typography variant="h5" gutterBottom>
              Device Status
            </Typography>
            {deviceStatus.map((device, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  padding: '5px',
                  backgroundColor: device.status === 'Online' ? '#2E7D32' : '#C62828',
                  color: '#fff',
                  marginBottom: '5px',
                  borderRadius: '5px',
                }}
              >
                {device.name} - {device.status}
              </Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Links */}
      <Box mt={5}>
        <Typography variant="h5" align="center" gutterBottom>
          Quick Access
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button variant="contained" color="primary" startIcon={<PeopleIcon />} href="/admin/users">
            Manage Users
          </Button>
          <Button variant="contained" color="secondary" startIcon={<DeviceHubIcon />} href="/admin/devices">
            Manage Devices
          </Button>
          <Button variant="contained" color="success" startIcon={<SystemUpdateAltIcon />} href="/admin/reports">
            View Reports
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
