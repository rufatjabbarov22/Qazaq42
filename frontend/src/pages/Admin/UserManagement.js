import React, { useState, useEffect } from 'react';
import { Slide, TextField, Button, Checkbox, FormControlLabel, Typography, Paper, Snackbar } from '@mui/material';
import { CheckCircle, CheckCircleOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    is_verified: false,
    is_admin: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetch('/api/v1/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  // Handle creating a new user
  const handleCreateUser = (e) => {
    e.preventDefault();
    fetch('/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSnackbarMessage('User created successfully');
        setOpenSnackbar(true);
        setUsers([...users, data]);
        setFilteredUsers([...users, data]);
        setFormData({
          fname: '',
          lname: '',
          email: '',
          password: '',
          is_verified: false,
          is_admin: false,
        });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        setSnackbarMessage('Error creating user');
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const columns = [
    { field: 'fname', headerName: 'First Name', flex: 1 },
    { field: 'lname', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'is_verified', headerName: 'Verified', type: 'boolean', flex: 1 },
    { field: 'is_admin', headerName: 'Admin', type: 'boolean', flex: 1 },
  ];

  return (
    <Paper elevation={3} sx={containerStyle}>
      <Typography variant="h4" sx={headerStyle}>User Management</Typography>

      {/* User Creation Form */}
      <form onSubmit={handleCreateUser} style={formStyle}>
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

      {/* Search Bar */}
      <TextField
        placeholder="Search users..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ ...inputStyle, marginBottom: '20px' }}
      />

      {/* DataGrid for Users */}
      <div style={userListContainerStyle}>
        <Typography variant="h5" sx={headerStyle}>Existing Users</Typography>
        <DataGrid
          rows={filteredUsers.map((user, index) => ({ ...user, id: index }))}
          columns={columns}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          sx={{ backgroundColor: '#333', color: '#fff', marginTop: '10px' }}
        />
      </div>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Paper>
  );
};

// Styles
const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#f0f0f0',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
};

const headerStyle = {
  marginBottom: '20px',
  color: '#4CAF50',
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
    color: '#fff',
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
  color: '#fff',
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
