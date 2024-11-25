import React, { useState, useEffect } from 'react';
import {
  Slide, TextField, Button, Checkbox, FormControlLabel, Typography, Paper, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { CheckCircle, CheckCircleOutline } from '@mui/icons-material';
import Base_Url from '../../config';

const UserManagement = () => {
  const [users, setUsers] = useState([]); // To store the list of users
  const [selectedUser, setSelectedUser] = useState(null); // To highlight a selected user
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    is_verified: false,
    is_admin: false,
  });

  // Fetch users on component load
  useEffect(() => {
    fetch(Base_Url + 'users/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <Paper elevation={3} sx={containerStyle}>
      <Typography variant="h4" sx={headerStyle}>User Management</Typography>

      <form style={formStyle}>
        <Slide direction="left" in mountOnEnter unmountOnExit>
          <TextField
            label="First Name"
            variant="outlined"
            value={formData.fname}
            onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
            required
            fullWidth
            sx={inputStyle}
          />
        </Slide>
        <Slide direction="left" in mountOnEnter unmountOnExit>
          <TextField
            label="Last Name"
            variant="outlined"
            value={formData.lname}
            onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
            required
            fullWidth
            sx={inputStyle}
          />
        </Slide>
        <Slide direction="left" in mountOnEnter unmountOnExit>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            fullWidth
            sx={inputStyle}
          />
        </Slide>
        <Slide direction="left" in mountOnEnter unmountOnExit>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            fullWidth
            sx={inputStyle}
          />
        </Slide>
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckCircleOutline />}
              checkedIcon={<CheckCircle />}
              checked={formData.is_verified}
              onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
            />
          }
          label="Verified"
          sx={checkboxStyle}
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckCircleOutline />}
              checkedIcon={<CheckCircle />}
              checked={formData.is_admin}
              onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked })}
            />
          }
          label="Admin Role"
          sx={checkboxStyle}
        />
        <Button variant="contained" color="primary" type="submit" sx={buttonStyle}>
          Create User
        </Button>
      </form>

      <div style={userListContainerStyle}>
        <Typography variant="h5" sx={headerStyle}>Existing Users</Typography>

        <TableContainer component={Paper} sx={{ backgroundColor: '#fff', borderRadius: '8px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#4CAF50', }}>
              <TableRow >
                <TableCell sx={{ color: '#fff' }}>First Name</TableCell>
                <TableCell sx={{ color: '#fff' }}>Last Name</TableCell>
                <TableCell sx={{ color: '#fff' }}>Email</TableCell>
                <TableCell sx={{ color: '#fff' }}>Is Verified</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    backgroundColor: selectedUser?.id === user.id ? '#f0f0f0' : '#fff',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSelectUser(user)}
                >
                  <TableCell>{user.fname}</TableCell>
                  <TableCell>{user.lname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.is_verified ? 'True' : 'False'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

// Styles
const containerStyle = {
  maxWidth: '70%',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#f0f0f0',
  color: '#000',
  borderRadius: '8px',
};

const headerStyle = {
  marginTop: '20px',
  marginBottom: '20px',
  color: '#000',
  textAlign: 'center',
  fontWeight: 'bold',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  marginBottom: '30px',
};

const inputStyle = {
  '& .MuiInputBase-root': {
    backgroundColor: '#f0f0f0',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#555',
  },
  '& .MuiInputLabel-root': {
    color: '#4CAF50',
  },
};

const checkboxStyle = {
  color: '#4CAF50',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'primary',
  fontWeight: 'bold',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};

const userListContainerStyle = {
  marginTop: '20px',
};

export default UserManagement;
