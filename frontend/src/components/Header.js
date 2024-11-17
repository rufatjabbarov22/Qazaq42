import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import logo from '../assets/logo.svg';  // Importing the SVG file

const NavButton = styled(Button)(({ theme }) => ({
  color: '#f1f2f0',
  marginLeft: theme.spacing(2),
  fontSize: '18px',
  fontWeight: 'bold',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '3px',
    bottom: 0,
    left: 0,
    backgroundColor: '#f1f2f0',
    transition: 'width 0.3s ease-in-out',
  },
  '&:hover::before': {
    width: '100%', // Underline animation on hover
  },
  '&:hover': {
    color: '#f1f2f0',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f1f2f0',
  color: '#333',
  paddingLeft: '25px',
  paddingRight: '25px',
  marginLeft: theme.spacing(10),
  marginRight: theme.spacing(5),
  fontSize: '18px',
  fontWeight: 'bold',
  position: 'relative',
  overflow: 'hidden',
  border: '2px solid transparent',
  '&:hover': {
    backgroundColor: 'rgba(173, 255, 47, 0.2)',
    color: '#f1f2f0',
  },
}));

const HeaderAcc = () => {
  const [headerBackground, setHeaderBackground] = useState('rgba(51, 75, 28, 1)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setHeaderBackground(`rgba(51, 75, 28, ${1 - scrollY / 500})`);
      } else {
        setHeaderBackground('rgba(51, 75, 28, 1)');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250, backgroundColor: 'black', height: '100%', color: 'white' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemText primary="About Us" />
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemText primary="Contact Us" />
        </ListItem>
        <ListItem button component={Link} to="/login">
          <ListItemText primary="LogIn" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: headerBackground,
        backdropFilter: 'blur(14px)',
        transition: 'background-color 0.5s ease',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img
            src={logo}  // Use the logo
            alt="Qazaq Logo"
            style={{
              height: '60px',  // Adjust the size to your needs
              width: 'auto',
              marginRight: '15px',
            }}
          />
        </Box>

        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              transitionDuration={500}
            >
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <Box display="flex" alignItems="center">
            <NavButton component={Link} to="/">
              Home
            </NavButton>
            <NavButton component={Link} to="/about">
              About Us
            </NavButton>
            <NavButton component={Link} to="/contact">
              Contact Us
            </NavButton>
            <LoginButton component={Link} to="/login">
              LogIn
            </LoginButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAcc;
