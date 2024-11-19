import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputLabel,
  FormControl,
  Box,
} from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [formData, setFormData] = useState({
    user_email: '',
    name: '',
    type: 'BAS',
    pin: '',
    description: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('/api/v1/devices')
      .then((response) => response.json())
      .then((data) => {
        setDevices(data);
        setFilteredDevices(data);
      })
      .catch((error) => console.error('Error fetching devices:', error));
  }, []);

  useEffect(() => {
    setFilteredDevices(
      devices.filter(
        (device) =>
          (device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            device.user_email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedCategory === '' || device.type === selectedCategory)
      )
    );
  }, [searchTerm, selectedCategory, devices]);

  const handleCreateDevice = (e) => {
    e.preventDefault();
    fetch('/api/v1/devices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Device created successfully');
        const updatedDevices = [...devices, data];
        setDevices(updatedDevices);
        setFilteredDevices(updatedDevices);
        setFormData({
          user_email: '',
          name: '',
          type: 'BAS',
          pin: '',
          description: '',
        });
      })
      .catch((error) => console.error('Error creating device:', error));
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h4" sx={headerStyle}>
        Device Management
      </Typography>

      <Box sx={iconContainerStyle}>
        <DevicesIcon sx={deviceIconStyle} />
      </Box>

      <form onSubmit={handleCreateDevice} style={formStyle}>
        <FormControl variant="outlined" fullWidth sx={inputStyle}>
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            label="Type"
          >
            <MenuItem value="BAS">BAS</MenuItem>
            <MenuItem value="FLD">FLD</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="User Email"
          variant="outlined"
          name="user_email"
          value={formData.user_email}
          onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Pin"
          variant="outlined"
          name="pin"
          value={formData.pin}
          onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          fullWidth
          sx={inputStyle}
        />
        <Button variant="contained" color="primary" type="submit" sx={createButtonStyle}>
          Create Device
        </Button>
      </form>

      <Box sx={searchContainerStyle}>
        <TextField
          placeholder="Search devices..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={searchInputStyle}
        />
        <FormControl variant="outlined" sx={categorySelectStyle}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="BAS">BAS</MenuItem>
            <MenuItem value="FLD">FLD</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={deviceListContainerStyle}>
        <Typography variant="h5" sx={headerStyle}>
          Existing Devices
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>User Email</TableCell>
              <TableCell sx={{ color: '#fff' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Type</TableCell>
              <TableCell sx={{ color: '#fff' }}>Assigned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDevices.map((device) => (
              <TableRow key={device.id}>
                <TableCell sx={{ color: '#fff' }}>{device.user_email}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{device.name}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{device.type}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{device.is_assigned ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Styles
const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#1a1a1a',
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

const iconContainerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const deviceIconStyle = {
  fontSize: '50px',
  color: '#4CAF50',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  maxWidth: '400px',
  margin: '0 auto',
};

const inputStyle = {
  '& .MuiInputBase-root': {
    backgroundColor: '#333',
    color: '#fff',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#555',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#4CAF50',
  },
  '& .MuiInputLabel-root': {
    color: '#4CAF50',
  },
};

const createButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  fontWeight: 'bold',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px',
  textAlign: 'center',
};

const searchContainerStyle = {
  textAlign: 'center',
  margin: '20px 0',
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
};

const searchInputStyle = {
  width: '100%',
  maxWidth: '300px',
  '& .MuiInputBase-root': {
    backgroundColor: '#333',
    color: '#fff',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#555',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#4CAF50',
  },
  '& .MuiInputLabel-root': {
    color: '#4CAF50',
  },
};

const categorySelectStyle = {
  minWidth: '150px',
  '& .MuiInputBase-root': {
    backgroundColor: '#333',
    color: '#fff',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#555',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#4CAF50',
  },
  '& .MuiInputLabel-root': {
    color: '#4CAF50',
  },
};

const deviceListContainerStyle = {
  marginTop: '20px',
  backgroundColor: '#333',
};

export default DeviceManagement
