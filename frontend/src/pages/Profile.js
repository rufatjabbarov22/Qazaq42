// import React, { useState, useEffect } from 'react';
// import { Box, Container, Button, Typography, TextField } from '@mui/material';
// import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const theme = createTheme();

// const StyledContainer = styled(Container)(({ theme }) => ({
//   border: '1px solid #ccc',
//   borderRadius: '12px',
//   backgroundColor: 'rgba(240, 240, 240, 0.9)',
//   padding: '30px',
//   boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
// }));

// function Profile() {
//   const [userInfo, setUserInfo] = useState({ fname: '', lname: '', email: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     const userId = localStorage.getItem('user_id'); // Assuming user ID is stored in localStorage after login
//     if (!token || !userId) {
//       navigate('/login');
//     } else {
//       axios
//         .get(`http://localhost:8000/api/v1/users/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => {
//           setUserInfo({
//             fname: response.data.fname,
//             lname: response.data.lname,
//             email: response.data.email,
//           });
//         })
//         .catch((error) => {
//           console.error('Error fetching user data:', error);
//           setError('Failed to load user information.');
//         });
//     }
//   }, [navigate]);

//   const handleUpdateProfile = () => {
//     const token = localStorage.getItem('access_token');
//     const userId = localStorage.getItem('user_id');

//     axios
//       .put(
//         `http://localhost:8000/api/v1/users/${userId}`,
//         {
//           fname: userInfo.fname,
//           lname: userInfo.lname,
//           email: userInfo.email,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       )
//       .then((response) => {
//         alert('Profile updated successfully!');
//       })
//       .catch((error) => {
//         console.error('Error updating profile:', error);
//         setError('Failed to update profile.');
//       });
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           backgroundImage: `url('https://images.wallpaperscraft.ru/image/single/pole_trava_tropinka_124349_2560x1600.jpg')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           minHeight: '100vh',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <StyledContainer component="main" maxWidth="xs">
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
//               Profile
//             </Typography>

//             {/* Error Message */}
//             {error && (
//               <Typography color="error" align="center" sx={{ marginBottom: '16px' }}>
//                 {error}
//               </Typography>
//             )}

//             {/* User Info */}
//             <TextField
//               label="First Name"
//               value={userInfo.fname}
//               onChange={(e) => setUserInfo({ ...userInfo, fname: e.target.value })}
//               fullWidth
//               sx={{ marginBottom: '16px' }}
//             />
//             <TextField
//               label="Last Name"
//               value={userInfo.lname}
//               onChange={(e) => setUserInfo({ ...userInfo, lname: e.target.value })}
//               fullWidth
//               sx={{ marginBottom: '16px' }}
//             />
//             <TextField
//               label="Email"
//               value={userInfo.email}
//               onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
//               fullWidth
//               sx={{ marginBottom: '16px' }}
//             />

//             {/* Update Button */}
//             <Button
//               variant="contained"
//               onClick={handleUpdateProfile}
//               sx={{
//                 backgroundColor: '#CD4400',
//                 color: '#fff',
//                 padding: { xs: '10px', sm: '12px' },
//                 '&:hover': { backgroundColor: '#b23800' },
//                 transition: 'background-color 0.3s ease',
//               }}
//             >
//               Update Profile
//             </Button>
//           </Box>
//         </StyledContainer>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default Profile;
