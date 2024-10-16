import React from 'react';
import './InstructionSection.css'; // Подключаем CSS файл

const InstructionSection = () => {
  return (
    <div className="instruction-section">
      <h2>Instructions for Using the Soil Scanning Device</h2>
      
      <p>
        Our innovative soil scanning device, based on Arduino technology, is designed to help farmers, gardeners, and agricultural enthusiasts gather vital information about their soil. Follow these steps to ensure you make the most of the device and its capabilities:
      </p>
      
      <h3>Step 1: Setting Up the Device</h3>
      <p>
        Once you receive the device, carefully unbox it and ensure all components are present. The device comes pre-assembled, but please verify the sensor's connections are secure. You can place the device in the soil at the desired location where you want to analyze the land. Make sure the soil is not too dry or too wet for better accuracy.
      </p>
      
      <h3>Step 2: Starting the Scanning Process</h3>
      <p>
        After placing the device in the soil, power it on using the switch on the side of the device. The scanning process will start automatically, gathering data on soil moisture, pH levels, and nutrient content. During the scan, the device will use various sensors to capture detailed information about the soil's composition.
      </p>
      
      <h3>Step 3: Viewing the Results</h3>
      <p>
        Once the scanning process is complete (this typically takes a few minutes), you can access the results through your account on the Control Device section of the website. The data will be displayed in a clear, easy-to-understand format, including moisture levels, pH values, and an assessment of the soil's nutrient profile.
      </p>
      
      <h3>Step 4: AI Recommendations</h3>
      <p>
        If you want personalized recommendations based on your soil data, simply click the AI button in the Control Device section. Our AI will analyze the data and provide you with a list of crops or plants that are best suited for the soil conditions. Whether you're growing vegetables, fruits, or flowers, our AI will guide you toward optimal planting choices to maximize your yield.
      </p>
      
      <h3>Step 5: Maintenance and Care</h3>
      <p>
        After use, gently clean the sensors with a soft cloth and store the device in a cool, dry place. Regular maintenance ensures the longevity of the device and accuracy of future scans. Avoid exposing the device to extreme temperatures or moisture for prolonged periods.
      </p>

      <div className="slider-container">
        <button className="slider-button">‹</button>
        <img src="https://example.com/device1.jpg" alt="Device Slide" className="slider-image" />
        <button className="slider-button">›</button>
      </div>
    </div>
  );
};

export default InstructionSection;
