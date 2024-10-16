import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Twitter, Facebook, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url('https://bogatyr.club/uploads/posts/2023-03/thumbs/1677786633_bogatyr-club-p-poverkhnost-pochvi-foni-pinterest-21.jpg')`,
        padding: '40px',
        position: 'relative',
        textAlign: 'center',
        color: 'white',
        height: 'auto',
        minHeight: '250px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 600px)': {
          padding: '20px',
        },
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'white',
          fontSize: '35px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.6)', // Добавляем тень для улучшения читаемости
          marginTop: '20px',
          '@media (max-width: 600px)': {
            fontSize: '24px',
          },
        }}
      >
        Let's do this together!
      </Typography>

      <Box sx={{ marginTop: '20px' }}>
        <Typography 
          variant="h6" 
          sx={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)', // Тень для текста
            '@media (max-width: 600px)': {
              fontSize: '18px',
            },
          }}
        >
          Subscribe to our newsletter
        </Typography>
        
        <form style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              padding: '12px',
              borderRadius: '5px',
              border: 'none',
              marginRight: '10px',
              marginBottom: '10px',
              width: '250px',
              fontSize: '16px',
              '@media (max-width: 600px)': {
                width: '80%',
              },
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px',
              borderRadius: '5px',
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              marginBottom: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              '@media (max-width: 600px)': {
                width: '80%',
              },
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'darkblue'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'blue'}
          >
            Subscribe
          </button>
        </form>

        <Box sx={{
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}>
          <IconButton 
            color="inherit" 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
              '&:hover': {
                color: '#1DA1F2',
              },
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton 
            color="inherit" 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
              '&:hover': {
                color: '#3b5998',
              },
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton 
            color="inherit" 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{
              '&:hover': {
                color: '#E1306C',
              },
            }}
          >
            <Instagram />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
