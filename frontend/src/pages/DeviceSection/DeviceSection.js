import React from 'react';
import './DeviceSection.css';
import SensorsIcon from '@mui/icons-material/Sensors'; // Importing the icon from Material UI
import { useNavigate } from 'react-router-dom'; // For navigation
const DeviceSection = () => {
  const navigate = useNavigate();
  const handleOrderClick = () => {
    navigate('/order'); // Redirect to the order page
  };
  return (
    <div className="device-section">
      <h3 className="device-title">Our Product</h3>
      <div className="scan-animation-container">
        <SensorsIcon className="device-icon" />
        <div className="scanner-circle circle-1"></div>
        <div className="scanner-circle circle-2"></div>
        <div className="scanner-circle circle-3"></div>
      </div>
      <div className="card-container">
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Device 1"
                className="card-image"
              />
            </div>
            <div className="card-back">
              <p>Our device uses advanced technology to scan the soil for optimal results in agriculture.</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Device 2"
                className="card-image"
              />
            </div>
            <div className="card-back">
              <p>It's designed for ease of use, allowing you to monitor your land with minimal effort.</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Device 3"
                className="card-image"
              />
            </div>
            <div className="card-back">
              <p>Compatible with all existing systems, it's a must-have for any modern farm.</p>
            </div>
          </div>
        </div>
      </div>
      <button className="order-button" onClick={handleOrderClick}>
        Order Now
      </button>
    </div>
  );
};
export default DeviceSection;