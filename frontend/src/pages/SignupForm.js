import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Grid, 
  Link 
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

const theme = createTheme();

const StyledContainer = styled(Container)(({ theme }) => ({
  border: '1px solid #ccc',
  borderRadius: '12px',
  backgroundColor: 'rgba(240, 240, 240, 0.9)',
  padding: '30px',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  animation: 'slideUp 0.8s ease',
}));

function SignupForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updates, setUpdates] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
        // Navigate to login or show success message
        navigate('/otp');
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        alert('Signup failed: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Error connecting to server. Please try again later.');
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
              Sign up
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="first-name"
                    label="First name"
                    fullWidth
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="last-name"
                    label="Last name"
                    fullWidth
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="password"
                    label="Password"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="updates"
                        checked={updates}
                        onChange={(event) => setUpdates(event.target.checked)}
                      />
                    }
                    label="I want to receive updates via email."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Already have an account?{' '}
                  <Link href="#" underline="hover" onClick={() => navigate('/login')}>
                    Sign in
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

export default SignupForm;
