import React from 'react';
import './MapSection.css';

const MapSection = () => {
  return (
    <div className="map-section">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6132919.66799667!2d46.24788978429712!3d40.14310507698748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40387676327e8a83%3A0x7582fbe0d3d043f7!2sAzerbaijan!5e0!3m2!1sen!2sus!4v1633153807048!5m2!1sen!2sus"
        className="responsive-iframe"
        allowFullScreen=""
        loading="lazy"
        title="Map of Azerbaijan"
      ></iframe>
    </div>
  );
};

export default MapSection;
