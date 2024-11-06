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
import './SignupForm.css'; // Добавляем CSS для анимаций и стилей

const theme = createTheme();

const StyledContainer = styled(Container)(({ theme }) => ({
  border: '1px solid #ccc',
  borderRadius: '12px',
  backgroundColor: 'rgba(240, 240, 240, 0.9)', // Полупрозрачный серый фон
  padding: '30px',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  animation: 'slideUp 0.8s ease', // Анимация появления
}));

function SignupForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updates, setUpdates] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', fullName, email, password, updates);
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
                    id="full-name"
                    label="Full name"
                    fullWidth
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
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
                    id="password"
                    label="Password"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="updates"
                        checked={updates}
                        onChange={(event) => setUpdates(event.target.checked)}
                        sx={{
                          color: '#333',
                          '&.Mui-checked': { color: '#000' },
                        }}
                      />
                    }
                    label="I want to receive updates via email."
                  />
                </Grid>
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
