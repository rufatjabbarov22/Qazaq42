import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Link 
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './OTPForm.css';

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
  const navigate = useNavigate();

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
        alert('Verification successful!');
        navigate('/login');
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
              Verify OTP
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    sx={{
                      fontSize: { xs: '14px', sm: '16px' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#888' },
                        '&:hover fieldset': { borderColor: '#555' },
                        '&.Mui-focused fieldset': { borderColor: '#333' },
                      },
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    id="otp-code"
                    label="OTP Code"
                    fullWidth
                    value={otpCode}
                    onChange={(event) => setOtpCode(event.target.value)}
                    sx={{
                      fontSize: { xs: '14px', sm: '16px' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#888' },
                        '&:hover fieldset': { borderColor: '#555' },
                        '&.Mui-focused fieldset': { borderColor: '#333' },
                      },
                    }}
                  />
                </Grid>
                
                {error && (
                  <Grid item xs={12}>
                    <Typography color="error" align="center">
                      {error}
                    </Typography>
                  </Grid>
                )}
                
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      padding: { xs: '10px', sm: '12px' },
                      backgroundColor: '#333',
                      '&:hover': { backgroundColor: '#000' },
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    Verify OTP
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Return to{' '}
                  <Link href="#" underline="hover" onClick={() => navigate('/login')}>
                    Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </StyledContainer>
      </Box>
    </ThemeProvider>
  );
}

export default OTPForm;
