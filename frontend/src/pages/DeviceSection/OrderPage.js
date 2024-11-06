import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import device from '../../assets/device.jpg';

const theme = createTheme();

const OrderPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Order submitted:', formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: '#000',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '40px' }}>
          {/* Left section with device image */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#333',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid #555',
              padding: '10px',
            }}
          >
            <img
              src={device}// Replace with your device image URL
              alt="RSSK-01 Device"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
          </Box>

          {/* Right section with form */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#333',
              borderRadius: '8px',
              padding: '30px',
              border: '2px solid #555',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <Typography variant="h4" sx={{ color: '#fff', marginBottom: '20px', fontWeight: 'bold' }}>
              Order the RSSK-01 Device
            </Typography>
            <Typography variant="body1" sx={{ color: '#aaa', marginBottom: '20px' }}>
              Our revolutionary device RSSK-01 is designed to optimize land usage with cutting-edge technology. Please
              fill in your details to place your order.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    variant="filled"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ backgroundColor: '#444', borderRadius: '5px' }}
                    InputLabelProps={{ style: { color: '#aaa' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    variant="filled"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    sx={{ backgroundColor: '#444', borderRadius: '5px' }}
                    InputLabelProps={{ style: { color: '#aaa' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    fullWidth
                    variant="filled"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    sx={{ backgroundColor: '#444', borderRadius: '5px' }}
                    InputLabelProps={{ style: { color: '#aaa' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    fullWidth
                    variant="filled"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ backgroundColor: '#444', borderRadius: '5px' }}
                    InputLabelProps={{ style: { color: '#aaa' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Delivery Address"
                    fullWidth
                    variant="filled"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    sx={{ backgroundColor: '#444', borderRadius: '5px' }}
                    InputLabelProps={{ style: { color: '#aaa' } }}
                    InputProps={{ style: { color: '#fff' } }}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  marginTop: '20px',
                  backgroundColor: '#0e4882',
                  color: '#fff',
                  padding: '15px',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: '#0a3566',
                  },
                }}
              >
                <ShoppingCartIcon sx={{ marginRight: '10px' }} />
                Place Order
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default OrderPage;
