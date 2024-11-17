import React, { useState } from 'react';
import { Box, Button, BottomNavigation, BottomNavigationAction } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SensorsIcon from '@mui/icons-material/Sensors';
import ComputerIcon from '@mui/icons-material/Computer';
import MapSection from './MapSection';
import InstructionSection from './InstructionSection';
import ControlDeviceSection from './ControlDeviceSection';
import AISection from './AISection';
import './AccountPage.css';

const AccountPage = () => {
  const [selectedSection, setSelectedSection] = useState('map');

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
      {/* Sidebar for larger screens */}
      <Box className="sidebar">
        <Button className="menu-button" onClick={() => setSelectedSection('map')}>Map</Button>
        <Button className="menu-button" onClick={() => setSelectedSection('instruction')}>Instruction</Button>
        <Button className="menu-button" onClick={() => setSelectedSection('control')}>Control Device</Button>
        <Button className="menu-button" onClick={() => setSelectedSection('ai')}>AI</Button>
      </Box>

      {/* Main content */}
      <Box className="content">
        {renderSection()}
      </Box>

      {/* Bottom navigation for small screens */}
      <BottomNavigation
        className="bottom-nav"
        value={selectedSection}
        onChange={(event, newValue) => setSelectedSection(newValue)}
      >
        <BottomNavigationAction
          label="Map"
          value="map"
          icon={<MapIcon />}
        />
        <BottomNavigationAction
          label="Instruction"
          value="instruction"
          icon={<MenuBookIcon />}
        />
        <BottomNavigationAction
          label="Control"
          value="control"
          icon={<SensorsIcon />}
        />
        <BottomNavigationAction
          label="AI"
          value="ai"
          icon={<ComputerIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default AccountPage;
