import React, { useEffect, useState } from 'react';
import './DeviceSection.css';
import { Link } from '@mui/material';

const DeviceSection = () => {
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
    <div className="device-section" style={{ backgroundPositionY: `${scrollY * 0.5}px` }}>
      <h3>The DEVICE</h3>
      <div className="device-content">
        <img
          src="https://img.freepik.com/premium-photo/dramatic-black-and-white-shot-of-a-motor-grader-agai_1295756-83616.jpg"
          alt="Device"
          className="device-image"
        />
        <div className="device-description">
          <p>
            Our device, built using Arduino technology, offers an innovative solution for land scanning. It is designed to deliver accurate and reliable data, making it an essential tool for farmers and researchers alike. The compact design allows seamless integration with existing monitoring systems.
            <br />
            One of the key advantages of the device is its affordability, making advanced scanning technology accessible to a wider audience. With this tool, you can gather valuable information about soil conditions, helping you optimize agricultural processes and improve yields.
          </p>
          <Link to="/ContactUsPage.js" className="order-button">Order now</Link>
        </div>
      </div>
    </div>
  );
};

export default DeviceSection;
