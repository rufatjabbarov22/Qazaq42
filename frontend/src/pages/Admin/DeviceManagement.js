import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel, FormControl, Box } from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [formData, setFormData] = useState({ serial_id: '', name: '', type: 'BAS', pin: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // Category filter

  // Fetch existing devices from the API on load
  useEffect(() => {
    fetch('/api/v1/devices')
      .then(response => response.json())
      .then(data => {
        setDevices(data);
        setFilteredDevices(data); // Initialize filtered devices
      })
      .catch(error => console.error('Error fetching devices:', error));
  }, []);

  // Filter devices when the search term or category changes
  useEffect(() => {
    setFilteredDevices(
      devices.filter(device =>
        (device.serial_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
         device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         device.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === '' || device.type === selectedCategory)
      )
    );
  }, [searchTerm, selectedCategory, devices]);

  // Create a new device using form data
  const handleCreateDevice = (e) => {
    e.preventDefault();
    fetch('/api/v1/devices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        alert('Device created successfully');
        const updatedDevices = [...devices, data];
        setDevices(updatedDevices); // Add new device to the full list
        setFilteredDevices(updatedDevices); // Update the filtered list
        setFormData({ serial_id: '', name: '', type: 'BAS', pin: '', description: '' }); // Reset form
      })
      .catch(error => console.error('Error creating device:', error));
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h4" sx={headerStyle}>Device Management</Typography>

      {/* Device Icon */}
      <Box sx={iconContainerStyle}>
        <DevicesIcon sx={deviceIconStyle} />
      </Box>

      {/* Device Creation Form */}
      <form onSubmit={handleCreateDevice} style={formStyle}>
        <TextField
          label="Serial ID"
          variant="outlined"
          name="serial_id"
          value={formData.serial_id}
          onChange={e => setFormData({ ...formData, serial_id: e.target.value })}
          required
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          sx={inputStyle}
        />
        <FormControl variant="outlined" fullWidth sx={inputStyle}>
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={e => setFormData({ ...formData, type: e.target.value })}
            label="Type"
          >
            <MenuItem value="BAS">BAS</MenuItem>
            <MenuItem value="FLD">FLD</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Pin"
          variant="outlined"
          name="pin"
          value={formData.pin}
          onChange={e => setFormData({ ...formData, pin: e.target.value })}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          fullWidth
          sx={inputStyle}
        />
        <Button variant="contained" color="primary" type="submit" sx={createButtonStyle}>
          Create Device
        </Button>
      </form>

      {/* Search Bar and Category Filter */}
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

      {/* Existing Device List */}
      <TableContainer component={Paper} sx={deviceListContainerStyle}>
        <Typography variant="h5" sx={headerStyle}>Existing Devices</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Serial ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Type</TableCell>
              <TableCell sx={{ color: '#fff' }}>Assigned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDevices.map((device) => (
              <TableRow key={device.id}>
                <TableCell sx={{ color: '#fff' }}>{device.serial_id}</TableCell>
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

// Styling
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

export default DeviceManagement;
