import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  TextField,
  Card,
  CardContent,
  CardActions,
  Grid,
  Modal,
  Fade,
  Backdrop,
} from '@mui/material';
import './ControlDeviceSection.css';

const ControlDeviceSection = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({ serial_id: '', provided_pin: '' });
  const [userId, setUserId] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [error, setError] = useState('');
  const [deviceExistsError, setDeviceExistsError] = useState('');
  
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [deviceToUpdate, setDeviceToUpdate] = useState({
    name: '',
    description: '',
    field_id: '',
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError('User ID is required. Please log in first.');
    }

    const fetchDevices = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:8000/api/v1/devices?user_id=${userId}`);
          const filteredDevices = response.data.filter(device => device.user_id === userId);
          setDevices(filteredDevices);
        }
      } catch (err) {
        console.error('Failed to fetch devices:', err);
      }
    };

    fetchDevices();
  }, [userId]);

  const handleAddDevice = async () => {
    const { serial_id, provided_pin } = newDevice;
  
    if (!serial_id || !provided_pin || !userId) {
      setError('Please fill in all fields before adding a device.');
      return;
    }
  
    const deviceExists = devices.some(device => device.serial_id === serial_id || device.provided_pin === provided_pin);
    if (deviceExists) {
      setDeviceExistsError('Device with this Serial ID or PIN already exists.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/devices/assign',
        {},
        {
          params: { user_id: userId, serial_id, provided_pin },
        }
      );
  
      if (response.status === 200) {
        setDevices([...devices, response.data]);
        setNewDevice({ serial_id: '', provided_pin: '' });
        setError('');
        setDeviceExistsError('');
        setNotificationMessage('Device Assigned Successfully!');
  
        const { id } = response.data;

        if (id) {
          localStorage.setItem('id', id);
        }
        console.log('id: ' + id);
  
        setShowNotification(true);
      }
    } catch (err) {
      setError('Failed to assign device. Please check the details and try again.');
      console.error(err);
    }
  };

  const handleUpdateDevice = async () => {
    const { name, description, field_id } = deviceToUpdate;
    const deviceId = localStorage.getItem('id');
    if (!userId) {
      setError('User ID is missing. Please try again.');
      return;
    }
  
    if (!deviceId) {
      setError('Device ID is missing. Please reopen the modal and try again.');
      return;
    }
  
    if (!name.trim() || !description.trim() || !field_id.trim()) {
      setError('All fields are required.');
      return;
    }
  
    console.log('Updating Device:', {
      deviceId,
      userId,
      name,
      description,
      field_id,
    });
  
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/devices/${deviceId}`,
        {
          user_id: userId,
          name,
          description,
          field_id,
        }
      );
  
      if (response.status === 200) {
        const updatedDevices = devices.map((device) =>
          device.id === deviceId ? { ...device, ...response.data } : device
        );
        setDevices(updatedDevices);
  
        setNotificationMessage('Device Updated Successfully!');
        setShowNotification(true);
        setOpenUpdateModal(false);
      }
    } catch (err) {
      setError('Failed to update device. Please try again.');
      console.error(err);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleOpenUpdateModal = (device) => {
    setDeviceToUpdate({
      name: device.name || '',
      description: device.description || '',
      field_id: device.field_id || '',
    });
    localStorage.setItem('id', device.id);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  return (
    <Box
      className="control-device-section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'auto',
        padding: '16px',
      }}
    >
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>

      <Typography variant="h4" gutterBottom>
        Device Control
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          marginBottom: '16px',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Device
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {deviceExistsError && <Typography color="error">{deviceExistsError}</Typography>}
        <TextField
          label="Serial ID"
          variant="outlined"
          value={newDevice.serial_id}
          onChange={(e) => setNewDevice({ ...newDevice, serial_id: e.target.value })}
          sx={{ mb: 1, width: '100%' }}
        />
        <TextField
          label="PIN"
          variant="outlined"
          value={newDevice.provided_pin}
          onChange={(e) => setNewDevice({ ...newDevice, provided_pin: e.target.value })}
          sx={{ mb: 2, width: '100%' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddDevice}>
          Add Device
        </Button>
      </Box>

      {devices.length > 0 && (
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            maxHeight: '100vh',
            overflow: 'auto',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Your Devices
          </Typography>
          <Grid container spacing={2}>
            {devices.map((device, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Device Name: {device.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      USER ID: {device.user_id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Device ID: {device.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Serial ID: {device.serial_id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      PIN: {device.pin}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Field id: {device.field_id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Description: {device.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color="primary">
                      Open
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleOpenUpdateModal(device)}
                    >
                      Update
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openUpdateModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              padding: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Update Device
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              value={deviceToUpdate.name}
              onChange={(e) => setDeviceToUpdate({ ...deviceToUpdate, name: e.target.value })}
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={deviceToUpdate.description}
              onChange={(e) => setDeviceToUpdate({ ...deviceToUpdate, description: e.target.value })}
              sx={{ mb: 2, width: '100%' }}
            />
            <TextField
              label="Field ID"
              variant="outlined"
              value={deviceToUpdate.field_id}
              onChange={(e) => setDeviceToUpdate({ ...deviceToUpdate, field_id: e.target.value })}
              sx={{ mb: 2, width: '100%' }}
            />
            <Button variant="contained" color="primary" onClick={handleUpdateDevice}>
              Update
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ControlDeviceSection;
