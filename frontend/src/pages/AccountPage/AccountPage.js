import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, BottomNavigation, BottomNavigationAction } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SensorsIcon from '@mui/icons-material/Sensors';
import ComputerIcon from '@mui/icons-material/Computer';
import InstructionSection from './InstructionSection';
import ControlDeviceSection from './ControlDeviceSection';
import AISection from './AISection';
import './AccountPage.css';

const AccountPage = () => {
  const [selectedSection, setSelectedSection] = useState('instuction');
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const renderSection = () => {
    switch (selectedSection) {
      case 'instruction':
        return <InstructionSection />;
      case 'control':
        return <ControlDeviceSection setSelectedSection={setSelectedSection} />;
      case 'ai':
        return <AISection />;
      default:
        return <InstructionSection />;
    }
  };

  return (
    <Box className="account-page-container">
      <Box className="sidebar">
        <Button className="menu-button" onClick={() => setSelectedSection('instruction')}>Instruction</Button>
        <Button className="menu-button" onClick={() => setSelectedSection('control')}>Control Device</Button>
        <Button className="menu-button" onClick={() => setSelectedSection('ai')}>AI</Button>
      </Box>
      <Box className="content">{renderSection()}</Box>
      <BottomNavigation
        className="bottom-nav"
        value={selectedSection}
        onChange={(event, newValue) => setSelectedSection(newValue)}
      >
        <BottomNavigationAction label="Instruction" value="instruction" icon={<MenuBookIcon />} />
        <BottomNavigationAction label="Control" value="control" icon={<SensorsIcon />} />
        <BottomNavigationAction label="AI" value="ai" icon={<ComputerIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default AccountPage;