import React, { useState } from 'react';
import { Box, Container, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();

const StyledContainer = styled(Container)(({ theme }) => ({
  border: '1px solid #ccc',
  borderRadius: '12px',
  backgroundColor: 'rgba(240, 240, 240, 0.9)',
  padding: '30px',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  animation: 'slideUp 0.8s ease',
}));

function SignOut() {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Perform the logout request to your backend
      const response = await axios.post(
        'http://localhost:8000/api/v1/auth/sign-out',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      if (response.status === 200) {
        console.log('Sign out successful:', response.data);
        setSuccessMessage('You have been signed out successfully!');

        setTimeout(() => {
          navigate('/'); // Redirect to the main page after a short delay
        }, 1500); // Keep the message visible for 1.5 seconds before navigating
      }
    } catch (error) {
      console.error('Error during sign out:', error.response ? error.response.data : error.message);
      setError(error.response?.data?.detail || 'Failed to log out. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url('https://images.wallpaperscraft.ru/image/single/pole_trava_tropinka_124349_2560x1600.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'fadeIn 1s ease-in-out',
        }}
      >
        <StyledContainer component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: { xs: '10px', sm: '20px' },
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Sign Out
            </Typography>

            {/* Error Message */}
            {error && (
              <Typography color="error" align="center" sx={{ marginBottom: '16px' }}>
                {error}
              </Typography>
            )}

            {/* Success Message */}
            {successMessage && (
              <Typography
                sx={{
                  color: 'green',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  animation: 'fadeIn 1s ease',
                }}
              >
                {successMessage}
              </Typography>
            )}

            {/* Logout Button */}
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                backgroundColor: '#CD4400',
                color: '#fff',
                padding: { xs: '10px', sm: '12px' },
                '&:hover': { backgroundColor: '#b23800' },
                transition: 'background-color 0.4s ease',
              }}
            >
              Log Out
            </Button>
          </Box>
        </StyledContainer>
      </Box>
    </ThemeProvider>
  );
}

export default SignOut;
