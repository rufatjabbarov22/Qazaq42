import React from 'react';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import './StatisticsSection.css';

const StatCard = ({ number, label }) => {
  return (
    <Paper className="stat-card" elevation={4}>
      <Box className="stat-content">
        <CircularProgress variant="determinate" value={parseInt(number)} size={80} />
        <Typography variant="h3" component="h2" className="stat-number">
          {number}
        </Typography>
        <Typography variant="body1" className="stat-label">
          {label}
        </Typography>
      </Box>
    </Paper>
  );
};

const StatisticsSection = () => {
  return (
    <Box className="statistics-section">
      <Typography variant="h4" className="section-title">
        Proven Results
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <StatCard number="97%" label="Accuracy" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard number="30%" label="Water Savings" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard number="25%" label="Cost Reduction" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsSection;
