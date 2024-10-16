import React, { useState } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import './ImageSlider.css'; // Подключаем стили

const images = [
  'https://example.com/device1.jpg', // Замените на реальные URL изображений
  'https://example.com/device2.jpg',
  'https://example.com/device3.jpg',
];

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="slider-container">
      <button onClick={prevSlide} className="slider-button">
        <ArrowBack />
      </button>

      <img
        src={images[currentImageIndex]}
        alt={`Device ${currentImageIndex + 1}`}
        className="slider-image"
      />

      <button onClick={nextSlide} className="slider-button">
        <ArrowForward />
      </button>
    </div>
  );
};

export default ImageSlider;
