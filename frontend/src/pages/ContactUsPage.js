import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const theme = createTheme();

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { name, email, message, file });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
          padding: '20px',
        }}
      >
        <Container maxWidth="md" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', padding: '20px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" align="left" gutterBottom>
              Contact Us
            </Typography>
            <ConnectWithoutContactIcon sx={{ fontSize: "30px" }} />
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  label="Your Name"
                  fullWidth
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  label="Your Email"
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
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
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" align="left">
              <strong>Email:</strong> info@qazaq.com
            </Typography>
            <Typography variant="body1" align="left">
              <strong>Phone:</strong> +994 55 555 93 42
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Our Location
            </Typography>
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '56.25%',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.541938674981!2d49.8354174157723!3d40.40926497936467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d55c3e93d7d%3A0x627c8e1f2a961fe2!2sBaku!5e0!3m2!1sen!2saz!4v1696152688105!5m2!1sen!2saz"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ position: 'absolute', top: 0, left: 0, border: 0 }}
                allowFullScreen
                aria-hidden="false"
              />
            </Box>
          </Box>

        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ContactUsPage;
