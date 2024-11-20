import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Fade } from '@mui/material';
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

function OTPForm() {
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);  // State for success message
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from localStorage if available
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/auth/verify?user_mail=${encodeURIComponent(email)}&otp_code=${otpCode}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('OTP verification successful:', response.data);
        setSuccessMessage(true);  // Show success message
        setTimeout(() => {
          setSuccessMessage(false);  // Hide success message after 2 seconds
          navigate('/login');  // Navigate to login page
        }, 2000);
      }
    } catch (error) {
      console.error('OTP verification failed:', error.response ? error.response.data : error.message);
      setError('Invalid OTP or email. Please try again.');
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
              OTP Verification
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    fullWidth
                    type="email"
                    value={email}
                    disabled
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="otp"
                    label="OTP"
                    fullWidth
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                  />
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Typography color="error" variant="body2">
                      {error}
                    </Typography>
                  </Grid>
                )}
                {successMessage && (
                  <Grid item xs={12}>
                    <Fade in={successMessage} timeout={1000}>
                      <Typography variant="body2" color="success">
                        OTP Verified Successfully! Redirecting...
                      </Typography>
                    </Fade>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Verify OTP
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </StyledContainer>
      </Box>
    </ThemeProvider>
  );
}

export default OTPForm;
