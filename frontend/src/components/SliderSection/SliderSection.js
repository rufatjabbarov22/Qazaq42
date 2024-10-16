import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import './SliderSection.css';


const images = [
  {
    src: 'https://russian.eurasianet.org/sites/default/files/styles/article/public/2022-06/7s7e578ws3_004.jpg?itok=8wqUCleb',
    title: "Agriculture plays a crucial role in Azerbaijan's economy.",
    text: "In recent years, government efforts have focused on increasing productivity and using advanced techniques such as artificial intelligence and automation for sustainable development.",
  },
  {
    src: 'https://static.tildacdn.com/tild3731-3533-4233-a332-666563633432/14498449344732113441.jpg',
    title: 'Аgricultural sector of Azerbaijan',
    text: "Azerbaijan's agricultural sector contributes approximately 6.3% to the country's GDP and employs 38% of the workforce.",
  },
  {
    src: "https://www.eureporter.co/wp-content/uploads/2024/09/leyla-gulami-5P8xvRpUQNI-unsplash.jpg",
    title: "Agricultural Potential of Azerbaijan's Liberated Territories",
    text: "These regions feature fertile lands and diverse climates conducive to agriculture.",
  },
  {
    src: 'https://i0.wp.com/storage.picsave.pp.ua/cluster1/origin/8b2f9e84ccdb7cefb2bedd2c11ad8413.jpg?ssl=1',
    title: 'Qazaq',
    text: 'Our team at Qazaq consists of dedicated professionals with diverse expertise in agricultural innovation.',
  },
  {
    src: 'https://trashbox.ru/ifiles/1615221_29398a_11.jpg_min1/hudozhnik-pokazal-kompyuter-v-sovetskom-stile.-kiberpank-iz-sssr-8.jpg',
    title: 'Our Device',
    text: 'The latest innovation in earth scanning technology.',
  },
];

const SliderSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box className="slider-section" sx={{ position: 'relative', height: '700px', width: '100vw', overflow: 'hidden' }}>
      <Box
        sx={{
          backgroundImage: `url(${images[currentIndex].src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {!isSmallScreen && (
          <>
            <Typography variant="h3" sx={{ color: 'white', mb: 2 }}>
              {images[currentIndex].title}
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', mb: 4, maxWidth: '80%' }}>
              {images[currentIndex].text}
            </Typography>
          </>
        )}
      </Box>

      <Button
        onClick={goToPrevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '20px',
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
          right: '20px',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          zIndex: 1,
        }}
      >
        &#10095;
      </Button>
    </Box>
  );
};

export default SliderSection;
