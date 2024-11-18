import React, { useState } from 'react';
import UserManagement from './UserManagement';
import DeviceManagement from './DeviceManagement';
import CountryManagement from './CountryManagement';
import Dashboard from './Dashboard'; // Import the Dashboard component
import ReportManagement from './ReportManagement'; // Import the Report Management component
import { Typography, Box, Button } from '@mui/material';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard'); // Set initial section to 'dashboard'

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveSection} />; // Pass setActiveSection as a prop to Dashboard
      case 'users':
        return <UserManagement />;
      case 'devices':
        return <DeviceManagement />;
      case 'countries':
        return <CountryManagement />;
      case 'reports': // Add the Report Management section
        return <ReportManagement />;
      default:
        return <Typography variant="h6" sx={{ color: '#fff' }}>Select a section from the sidebar</Typography>;
    }
  };

  return (
    <Box sx={adminPanelStyle}>
      <Box component="aside" sx={sidebarStyle}>
        <Typography variant="h4" sx={headerStyle}>Admin Panel</Typography>
        <Button onClick={() => setActiveSection('dashboard')} sx={buttonStyle}>Dashboard</Button>
        <Button onClick={() => setActiveSection('users')} sx={buttonStyle}>Users</Button>
        <Button onClick={() => setActiveSection('devices')} sx={buttonStyle}>Devices</Button>
        <Button onClick={() => setActiveSection('countries')} sx={buttonStyle}>Countries</Button>
        <Button onClick={() => setActiveSection('reports')} sx={buttonStyle}>Reports</Button> {/* Add button for Report Management */}
      </Box>
      <Box component="main" sx={mainContentStyle}>
        {renderContent()}
      </Box>
    </Box>
  );
};

// Styles
const adminPanelStyle = { display: 'flex', minHeight: '100vh', backgroundColor: '#1a1a1a' };
const sidebarStyle = { 
  width: '250px', 
  backgroundColor: '#333', 
  color: '#fff', 
  padding: '20px', 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  gap: '15px' 
};
const headerStyle = { 
  marginBottom: '20px', 
  color: '#4CAF50', 
  textAlign: 'center' 
};
const buttonStyle = { 
  width: '100%', 
  color: '#fff', 
  backgroundColor: '#444', 
  padding: '10px', 
  textAlign: 'center', 
  cursor: 'pointer', 
  borderRadius: '5px', 
  '&:hover': { 
    backgroundColor: '#555' 
  }
};
const mainContentStyle = { 
  flex: 1, 
  padding: '20px', 
  backgroundColor: '#1a1a1a', 
  color: '#fff', 
  overflowY: 'auto' 
};

export default AdminPanel;
