import React, { useState } from 'react';
import { Box } from '@mui/material';
import MapSection from './MapSection';
import InstructionSection from './InstructionSection';
import ControlDeviceSection from './ControlDeviceSection';
import AISection from './AISection';
import TopNavigationBar from './TopNavigationBar'; // Import the new Top Navigation Bar
import './AccountPage.css';

const AccountPage = () => {
  const [selectedSection, setSelectedSection] = useState('map'); // Default to Map section

  const renderSection = () => {
    switch (selectedSection) {
      case 'map':
        return <MapSection />;
      case 'instruction':
        return <InstructionSection />;
      case 'control':
        return <ControlDeviceSection setSelectedSection={setSelectedSection} />;
      case 'ai':
        return <AISection />;
      default:
        return <MapSection />;
    }
  };

  return (
    <Box className="account-page-container">
      <TopNavigationBar setSelectedSection={setSelectedSection} /> {/* Add the new Top Navigation */}
      <Box className="content">
        {renderSection()}
      </Box>
    </Box>
  );
};

export default AccountPage;
