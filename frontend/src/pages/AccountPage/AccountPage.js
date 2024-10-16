import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import MapSection from './MapSection';
import InstructionSection from './InstructionSection';
import ControlDeviceSection from './ControlDeviceSection';
import AISection from './AISection';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import './AccountPage.css'; // Updated CSS

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
    <Grid container className="account-page-container">
      {/* Sidebar for larger screens */}
      <Grid item xs={2} className="sidebar">
        <Box display="flex" flexDirection="column" justifyContent="space-around" height="100%">
          <Button className="menu-button" onClick={() => setSelectedSection('map')}>Map</Button>
          <Button className="menu-button" onClick={() => setSelectedSection('instruction')}>Instruction</Button>
          <Button className="menu-button" onClick={() => setSelectedSection('control')}>Control Device</Button>
          <Button className="menu-button" onClick={() => setSelectedSection('ai')}>AI</Button>
        </Box>
      </Grid>

      {/* Main content */}
      <Grid item xs={9} className="content">
        {renderSection()}
      </Grid>

      {/* Bottom navigation for small screens */}
      <Box className="bottom-nav" sx={{ display: { xs: 'flex', md: 'none' } }}>
        <HomeIcon className="nav-icon" onClick={() => setSelectedSection('map')} />
        <MenuBookIcon className="nav-icon" onClick={() => setSelectedSection('instruction')} />
        <DeviceHubIcon className="nav-icon" onClick={() => setSelectedSection('control')} />
        <EmojiObjectsIcon className="nav-icon" onClick={() => setSelectedSection('ai')} />
      </Box>
    </Grid>
  );
};

export default AccountPage;