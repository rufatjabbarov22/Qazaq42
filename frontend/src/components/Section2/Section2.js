import React from 'react';
import { Box, Typography } from '@mui/material';
import './Section2.css';
import device from '../../assets/device.jpg';

const Section2 = () => {
  return (
    <Box className="section2">
      {/* Left section with the image */}
      <Box className="left-section">
        <img
          src={device}
          alt="Farming technology"
          className="section2-image"
        />
      </Box>

      {/* Right section with the text */}
      <Box className="right-section">
        <Box className="section2-content">
          <Typography variant="h4" component="h2">
            Our mission is to help farmers use their land more efficiently.
          </Typography>
          <Typography variant="body1" component="p" mt={3}>
            At Qazaq, we are dedicated to revolutionizing the agricultural industry through advanced earth scanning
            technology. Our innovative devices, combined with artificial intelligence, enable farmers to gain deeper
            insights into soil conditions, helping them make informed decisions for sustainable farming. We are proud
            to focus on Azerbaijan's fertile lands, striving to enhance agricultural productivity and contribute to the
            nation's food security. Join us on this journey towards a greener future!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Section2;
