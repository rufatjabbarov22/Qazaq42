import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Base_Url from '../config';

const theme = createTheme();

const ContactUsPage = () => {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [statusMessage, setStatusMessage] = useState(''); // New state for status message

  useEffect(() => {
    const user_Id = localStorage.getItem('user_id');
    setUserId(user_Id);
    console.log(userId);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      user_id: userId,
      message: message,
    };

    try {
      const response = await fetch(Base_Url + 'reports/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        showTemporaryMessage('Message sent successfully!', 'success');
      } else {
        console.error('Failed to send message:', response.statusText);
        showTemporaryMessage('Failed to send message.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showTemporaryMessage('Error sending message.', 'error');
    }
  };

  const showTemporaryMessage = (msg, type) => {
    setStatusMessage({ text: msg, type });
    setTimeout(() => setStatusMessage(''), 2000); // Clear message after 2 seconds
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.wallpaperscraft.ru/image/single/pole_trava_tropinka_124349_2560x1600.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              animation: 'fadeIn 1s ease-in-out',
            }}
          >
            <Typography variant="h3" component="h1" align="left" gutterBottom>
              Contact Us
            </Typography>
            <ConnectWithoutContactIcon sx={{ fontSize: '40px', color: '#0e4882' }} />
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="message"
                  label="Your Message"
                  fullWidth
                  multiline
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  sx={{ fontSize: { xs: '16px', sm: '18px' }, animation: 'slideInUp 0.9s ease-in-out' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ transition: 'transform 0.2s ease-in-out', padding: '12px' }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Display status message */}
          {statusMessage && (
            <Box
              sx={{
                mt: 3,
                padding: '10px',
                borderRadius: '4px',
                backgroundColor: statusMessage.type === 'success' ? '#d4edda' : '#f8d7da',
                color: statusMessage.type === 'success' ? '#155724' : '#721c24',
              }}
            >
              <Typography variant="body1" align="center">
                {statusMessage.text}
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 4, borderTop: '1px solid #ccc', pt: 2, animation: 'fadeIn 1.2s ease-in-out' }}>
            <Typography variant="h6" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" align="left" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <EmailIcon /> <strong>Email:</strong> help@qazaq.live
            </Typography>
            <Typography variant="body1" align="left" sx={{ display: 'flex', alignItems: 'center', gap: '8px', mt: 1 }}>
              <PhoneIcon /> <strong>Phone:</strong> +994 55 555 93 42
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ContactUsPage;
