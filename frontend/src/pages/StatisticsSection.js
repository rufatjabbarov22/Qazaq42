import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import './StatisticsSection.css';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'; // For "Accuracy"
import OpacityIcon from '@mui/icons-material/Opacity'; // For "Efficient Water Usage"
import AgricultureIcon from '@mui/icons-material/Agriculture'; // For "Improved Crop Yields"

const StatCard = ({ number, label, icon: Icon }) => {
  return (
    <Paper className="stat-card" elevation={4}>
      <Box className="stat-content">
        <Icon className="stat-icon" />
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
          <StatCard number="80%" label="Accuracy" icon={PrecisionManufacturingIcon} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard number="35%" label="Efficient Water Usage" icon={OpacityIcon} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard number="50%" label="Improved Crop Yields" icon={AgricultureIcon} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsSection;
