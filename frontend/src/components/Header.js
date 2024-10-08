import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const NavButton = styled(Button)(({ theme }) => ({
  color: 'black',
  marginLeft: theme.spacing(2),
  fontSize: '18px',
  fontWeight: 'bold',
  '&:hover': {
    color: 'black',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'blue',
  color: 'white',
  paddingLeft: '25px',
  paddingRight: '25px',
  marginLeft: theme.spacing(5),
  fontSize: '18px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: 'grey', 
    color: 'white',
  },
  '&:active': {
    backgroundColor: 'grey',
  },
}));

const DrawerListItem = styled(ListItem)(({ theme }) => ({
  color: 'white',
  fontSize: '22px',
  textTransform: 'uppercase',
}));

const Header = () => {
  const [headerBackground, setHeaderBackground] = useState('rgba(160, 160, 169, 1)');
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
        setHeaderBackground('rgba(160, 160, 169, 0.1)');
      } else {
        setHeaderBackground('rgba(160, 160, 169, 1)');
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
        <DrawerListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </DrawerListItem>
        <DrawerListItem button component={Link} to="/about">
          <ListItemText primary="About Us" />
        </DrawerListItem>
        <DrawerListItem button component={Link} to="/contact">
          <ListItemText primary="Contact Us" />
        </DrawerListItem>
        <DrawerListItem button component={Link} to="/login">
          <ListItemText primary="LogIn" />
        </DrawerListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: headerBackground,
        backdropFilter: 'blur(14px)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{
            fontFamily: 'Anton, sans-serif',
            fontWeight: 'bold',
            fontSize: '34px',
            letterSpacing: '12px',
            color: 'black',
            textDecoration: 'none',
            textTransform: 'uppercase',
            '&:hover': {
              color: '#555',
            },
          }}
        >
          Qazaq
        </Typography>

        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
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

export default Header;