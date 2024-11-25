import React, { useState } from 'react';
import UserManagement from './UserManagement';
import DeviceManagement from './DeviceManagement';
import CountryManagement from './CountryManagement';
import Dashboard from './Dashboard'; 
import ReportManagement from './ReportManagement'; 
import OrderManagement from './OrderManagement'; 
import {
  Typography,
  Box,
  Button,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DevicesIcon from '@mui/icons-material/Devices';
import PublicIcon from '@mui/icons-material/Public';
import ReportIcon from '@mui/icons-material/Report';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard'); 

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveSection} />;
      case 'users':
        return <UserManagement />;
      case 'devices':
        return <DeviceManagement />;
      case 'countries':
        return <CountryManagement />;
      case 'reports':
        return <ReportManagement />;
      case 'orders':
        return <OrderManagement />;
      default:
        return (
          <Typography
            variant="h6"
            sx={{
              color: '#fff',
              animation: 'fadeIn 0.5s ease-in-out',
            }}
          >
            Select a section from the sidebar
          </Typography>
        );
    }
  };

  return (
    <Box sx={adminPanelStyle}>
      <Box component="aside" sx={sidebarStyle}>
        <Typography variant="h4" sx={headerStyle}>
          Admin Panel
        </Typography>
        <Button
          startIcon={<DashboardIcon />}
          onClick={() => setActiveSection('dashboard')}
          sx={buttonStyle(activeSection === 'dashboard')}
        >
          Dashboard
        </Button>
        <Button
          startIcon={<PeopleIcon />}
          onClick={() => setActiveSection('users')}
          sx={buttonStyle(activeSection === 'users')}
        >
          Users
        </Button>
        <Button
          startIcon={<DevicesIcon />}
          onClick={() => setActiveSection('devices')}
          sx={buttonStyle(activeSection === 'devices')}
        >
          Devices
        </Button>
        <Button
          startIcon={<PublicIcon />}
          onClick={() => setActiveSection('countries')}
          sx={buttonStyle(activeSection === 'countries')}
        >
          Countries
        </Button>
        <Button
          startIcon={<ReportIcon />}
          onClick={() => setActiveSection('reports')}
          sx={buttonStyle(activeSection === 'reports')}
        >
          Reports
        </Button>
        <Button
          startIcon={<ShoppingCartIcon />}
          onClick={() => setActiveSection('orders')}
          sx={buttonStyle(activeSection === 'orders')}
        >
          Orders
        </Button>
      </Box>
      <Box component="main" sx={mainContentStyle}>
        {renderContent()}
      </Box>
    </Box>
  );
};

// Styles
const adminPanelStyle = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#f0f0f0',
};

const sidebarStyle = {
  width: '250px',
  backgroundColor: '#fff',
  color: '#fff',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '15px',
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
};

const headerStyle = {
  marginBottom: '20px',
  color: '#000',
  textAlign: 'center',
};

const buttonStyle = (isActive) => ({
  width: '100%',
  color: isActive ? '#fff' : '#fff',
  backgroundColor: isActive ? '#4CAF50' : '#334b1c',
  padding: '10px',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '8px',
  fontWeight: 'bold',
  transition: 'transform 0.2s, background-color 0.3s',
  '&:hover': {
    backgroundColor: '#4CAF50',
    transform: 'scale(1.05)',
  },
});

const mainContentStyle = {
  flex: 1,
  padding: '',
  backgroundColor: '#f0f0f0',
  color: '#fff',
  overflowY: 'auto',
  animation: 'fadeIn 0.5s ease-in-out',
};

// Animations
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

export default AdminPanel;
