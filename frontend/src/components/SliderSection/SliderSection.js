import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import './SliderSection.css';

const images = [
  {
    src: 'https://russian.eurasianet.org/sites/default/files/styles/article/public/2022-06/7s7e578ws3_004.jpg?itok=8wqUCleb',
    title: "Agriculture plays a crucial role in Azerbaijan's economy, with the government placing significant emphasis on its development through modern technologies and support programs for farmers.",
    text: "In recent years, government efforts have focused on increasing productivity, expanding agricultural exports and using advanced techniques such as artificial intelligence and automation for sustainable development of the industry.",
  },
  {
    src: 'https://static.tildacdn.com/tild3731-3533-4233-a332-666563633432/14498449344732113441.jpg',
    title: 'Аgricultural sector of Azerbaijan',
    text: "Azerbaijan's agricultural sector is a vital part of its economy, contributing approximately 6.3% to the country's GDP and employing around 38% of the workforce. The country is renowned for its fertile lands, especially in the Kura-Araz lowland, where major crops such as cotton, grains, and fruits are cultivated. Notably, Azerbaijan is among the top producers of pomegranates and grapes in the region. Recent government initiatives have focused on modernizing the sector through the implementation of advanced technologies, which aim to increase productivity and enhance the quality of agricultural products for both domestic consumption and export.",
  },
  {
    src: "https://www.eureporter.co/wp-content/uploads/2024/09/leyla-gulami-5P8xvRpUQNI-unsplash.jpg",
    title: "Agricultural Potential of Azerbaijan's Liberated Territories",
    text: "Following the Second Nagorno-Karabakh War in 2020, Azerbaijan regained several territories, including Lachin, Zangilan, Kelbajar, and Agdam, which hold significant agricultural potential. These regions feature fertile lands and diverse climates conducive to agriculture. Lachin and Zangilan are known for their fruit orchards and vineyards, offering opportunities for wine production. Kelbajar, with its abundant water resources, is ideal for growing grains and vegetables. The government is focusing on restoring these areas, investing in infrastructure and modern technologies, which could lead to increased agricultural production, job creation, and improved living standards for local communities.",
  },
  {
    src: 'https://i0.wp.com/storage.picsave.pp.ua/cluster1/origin/8b2f9e84ccdb7cefb2bedd2c11ad8413.jpg?ssl=1',
    title: 'Qazaq',
    text: 'Our team at Qazaq consists of dedicated professionals with diverse expertise in earth scanning technology and agricultural innovation. Led by our visionary CEO, we are committed to leveraging artificial intelligence to enhance agricultural productivity in Azerbaijan. Our collaborative approach drives us to deliver cutting-edge solutions, ensuring a sustainable future for the agrarian sector.',
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
    }, 10000); // 10 секунд
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

      {/* Левая кнопка навигации */}
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

      {/* Правая кнопка навигации */}
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
