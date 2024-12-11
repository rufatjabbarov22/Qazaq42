import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import SensorsIcon from '@mui/icons-material/Sensors';
import { useNavigate } from 'react-router-dom';
import './DeviceSection.css';

const DeviceSection = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/order');
  };

  return (
    <Box className="device-section">
      {/* Left part with the text */}
      <Box className="left-section-device">
        <Box className="section2-content">
          <Typography variant="h4" component="h3" gutterBottom>
            KSSR-01: Revolutionizing Soil Scanning Technology
          </Typography>
          <Typography variant="body1" paragraph>
            The KSSR-01 is an innovative soil scanning device designed to bring efficiency and precision to modern farming.
            Powered by advanced sensor technology, the KSSR-01 provides farmers with real-time, in-depth soil analysis,
            helping them make informed decisions about crop selection, irrigation, and fertilizer use.
          </Typography>
          <Typography variant="body1" paragraph>
            This state-of-the-art device is easy to use, offering accurate readings with minimal effort. Its portability 
            and compatibility with existing agricultural systems make it a valuable tool for any farm, whether large or small.
            The KSSR-01 also supports remote monitoring, allowing farmers to track soil conditions from anywhere.
          </Typography>
          <Typography variant="body1" paragraph>
            The KSSR-01 is designed to optimize agricultural productivity while reducing the need for harmful chemicals and
            overuse of water. By analyzing key soil parameters like moisture content, nutrient levels, and temperature, 
            the device helps farmers plan their planting and irrigation schedules more effectively.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="order-button"
            onClick={handleOrderClick}
          >
            Order Now
          </Button>
        </Box>
      </Box>

      {/* Right part with photo and scan animation */}
      <Box className="right-section">
        <Box className="scan-animation-container">
          <SensorsIcon className="device-icon" />
          <div className="scanner-circle circle-1"></div>
          <div className="scanner-circle circle-2"></div>
          <div className="scanner-circle circle-3"></div>
        </Box>
      </Box>
    </Box>
  );
};

export default DeviceSection;