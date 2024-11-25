import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import './SliderSection.css';
import deviceImage from '../../assets/device.jpg';


const images = [
  {
    src: 'https://russian.eurasianet.org/sites/default/files/styles/article/public/2022-06/7s7e578ws3_004.jpg?itok=8wqUCleb',
  },
  {
    src: 'https://static.tildacdn.com/tild3731-3533-4233-a332-666563633432/14498449344732113441.jpg',
  },
  {
    src: "https://www.eureporter.co/wp-content/uploads/2024/09/leyla-gulami-5P8xvRpUQNI-unsplash.jpg",
  },
  {
    src: deviceImage,
  },
];

const SliderSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change interval to 3 seconds
    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Box className="slider-section-container">
      {/* Left Section with the slider */}
      <Box className="left-slider-section">
        <Box className="slider" sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Box
            sx={{
              backgroundImage: `url(${images[currentIndex].src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              width: '100%',
            }}
          />
          <Button
            onClick={goToPrevSlide}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              zIndex: 1,
            }}
          >
            &#10094;
          </Button>

          <Button
            onClick={goToNextSlide}
            sx={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              zIndex: 1,
            }}
          >
            &#10095;
          </Button>
        </Box>
      </Box>

      {/* Right Section with text */}
      <Box className="right-text-section">
        <Typography variant="h4" component="h2" sx={{paddingBottom: '50px', marginTop: '-100px'}} >
          The Potential of Azerbaijan's Fertile Lands
        </Typography>
        <Typography variant="body1">
          Azerbaijan's agricultural sector has long been a cornerstone of its economy, with vast areas of fertile lands
          providing tremendous potential for growth. The liberation of territories in 2020 has opened up new opportunities
          for cultivation and development. The government's policies are focused on empowering farmers by providing them
          with modern technologies, grants, and subsidies, enabling them to achieve higher yields and sustainable farming practices.
        </Typography>
      </Box>
    </Box>
  );
};

export default SliderSection;
