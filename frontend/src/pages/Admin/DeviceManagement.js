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
import Base_Url from '../../config';

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [formData, setFormData] = useState({
    user_email: '',
    name: '',
    type: 'BAS', // Default type
    pin: '',
    description: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch devices when the component is mounted
  useEffect(() => {
    fetch(Base_Url + 'devices/')
      .then((response) => response.json())
      .then((data) => {
        setDevices(data);
        setFilteredDevices(data); // Filtered devices are initially the same as all devices
      })
      .catch((error) => console.error('Error fetching devices:', error));
  }, []);

  // Filter devices based on search term and selected category
  useEffect(() => {
    setFilteredDevices(
      devices.filter(
        (device) =>
          (device.serial_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            device.name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedCategory === '' || device.type === selectedCategory)
      )
    );
  }, [searchTerm, selectedCategory, devices]);

  // Handle device creation
  const handleCreateDevice = (e) => {
    e.preventDefault();

    const payload = {
      prefix: formData.type, // Use the selected type as the prefix
    };

    console.log('Sending request with payload:', payload);  // Debugging log

    fetch(Base_Url + 'devices/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create device');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Device created:', data); // Debugging log for response
        setStatusMessage('Device created successfully!');

        // Add new device to the devices array without losing the current data
        setDevices((prevDevices) => [...prevDevices, data]);
        setFilteredDevices((prevFilteredDevices) => [...prevFilteredDevices, data]);

        // Reset the form fields
        setFormData({
          user_email: '',
          name: '',
          type: 'BAS', // Reset to default type
          pin: '',
          description: '',
        });
      })
      .catch((error) => {
        setStatusMessage('Error creating device: ' + error.message);
        console.error('Error creating device:', error);
      });
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h4" sx={headerStyle}>
        Device Management
      </Typography>

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
        <Button variant="contained" color="primary" type="submit" sx={createButtonStyle}>
          Create Device
        </Button>
      </form>

      {statusMessage && (
        <Typography variant="body1" sx={statusMessageStyle}>
          {statusMessage}
        </Typography>
      )}

      {/* <Box sx={searchContainerStyle}>
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
      </Box> */}

      <TableContainer component={Paper} sx={deviceListContainerStyle}>
        <Typography variant="h5" sx={headerStyle}>
          Existing Devices
        </Typography>
        <Table>
          <TableHead sx={{ backgroundColor: '#4CAF50', borderRadius: '5px' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>#</TableCell> {/* Add this for row numbers */}
              <TableCell sx={{ color: '#fff' }}>Device ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>Serial ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>PIN</TableCell>
              <TableCell sx={{ color: '#fff' }}>Device Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Description</TableCell>
              <TableCell sx={{ color: '#fff' }}>Type</TableCell>
              <TableCell sx={{ color: '#fff' }}>User ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>Field ID</TableCell>
              <TableCell sx={{ color: '#fff' }}>Assigned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDevices.map((device, index) => ( // Use index to display row number
              <TableRow key={device.id} sx={{ color: 'black' }}>
                <TableCell>{index + 1}</TableCell> {/* Display row number */}
                <TableCell>{device.id}</TableCell>
                <TableCell>{device.serial_id}</TableCell>
                <TableCell>{device.pin}</TableCell>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.description}</TableCell>
                <TableCell>{device.type}</TableCell>
                <TableCell>{device.user_id}</TableCell>
                <TableCell>{device.field_id}</TableCell>
                <TableCell>{device.is_assigned ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

// Styles (no change)
const containerStyle = {
  maxWidth: '100%',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#f0f0f0',
  color: '#fff',
  borderRadius: '',
  // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
};

const headerStyle = {
  marginBottom: '20px',
  color: '#000',
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
  maxWidth: '500px',
  margin: '0 auto',

};

const inputStyle = {
  '& .MuiInputBase-root': {
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#555',
  },
  '& .MuiInputLabel-root': {
    color: '#000',
  },
};

const createButtonStyle = {
  backgroundColor: 'primary',
  color: 'white',
  fontWeight: 'bold',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: '#45a049',
  },
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
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  padding: '10px',
  color: 'black',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
};

const statusMessageStyle = {
  textAlign: 'center',
  marginTop: '20px',
  color: '#4CAF50', // Success message color
  fontWeight: 'bold',
};

export default DeviceManagement;
