import React, { useEffect, useState } from 'react';
import './Section1.css';

const Section1 = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="section1"
      style={{
        backgroundPositionY: `${scrollY * 0.5}px`,
      }}
    >
      <h1>Become part of the agricultural revolution with Qazaq!</h1>
    </div>
  );
};

export default Section1;
