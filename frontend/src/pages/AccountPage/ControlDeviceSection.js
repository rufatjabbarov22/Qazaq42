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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import './ControlDeviceSection.css';
import TelemetryPopup from './Telemetry.js';
import Base_Url from "../../config";

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

  const [telemetryOpen, setTelemetryOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const [fields, setFields] = useState([]); // State to store fields fetched from the backend

  // Fetch fields for the dropdown
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(Base_Url + 'fields/');
        setFields(response.data); // Set the fields data
      } catch (err) {
        console.error('Failed to fetch fields:', err);
      }
    };
    fetchFields();
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
      console.log(userId);
    } else {
      setError('User ID is required. Please log in first.');
    }
    // Fetch devices
    const fetchDevices = async () => {
      try {
        if (userId) {
          const response = await axios.get(Base_Url + `devices/?user_id=${userId}`);
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
        Base_Url + 'devices/assign',
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

    try {
      const response = await axios.put(
        Base_Url + `devices/${deviceId}`,
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

  const handleDeleteDevice = async (deviceId) => {
    try {
      const response = await axios.delete(
        Base_Url + `devices/${deviceId}`,
        {
          headers: {
            accept: 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setDevices(devices.filter(device => device.id !== deviceId));
        setNotificationMessage('Device Deleted Successfully!');
        setShowNotification(true);
      }
    } catch (err) {
      setError('Failed to delete device. Please try again.');
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

  // !telemetry
  const handleTelemetryOpen = (deviceId) => {
    setSelectedDeviceId(deviceId); // Set the selected device ID for telemetry
    setTelemetryOpen(true); // Open the telemetry popup
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
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" gutterBottom style={{ textAlign: 'center', fontSize: '25px' }}>
          Add New Device
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {deviceExistsError && <Typography color="error">{deviceExistsError}</Typography>}
        <TextField
          label="Serial ID"
          variant="outlined"
          value={newDevice.serial_id}
          onChange={(e) => setNewDevice({ ...newDevice, serial_id: e.target.value })}
          sx={{ mb: 1, width: '100%', textAlign: 'center' }}
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
            {devices.map((device, index) => {
              // Find the field name for this device
              const fieldName = fields.find(field => field.id === device.field_id)?.name || 'N/A'; // Default to 'N/A' if not found

              return (
                <Grid item xs={12} md={6} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Device Name: <span>{device.name}</span></Typography>
                      <Typography variant="body2" color="textSecondary">
                        <span>Serial ID:</span> {device.serial_id}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <span>Field:</span> {fieldName} {/* Display the field name */}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <span>Description:</span> {device.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handleTelemetryOpen(device.id)}
                      >
                        Open
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleOpenUpdateModal(device)}
                      >
                        Update
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"  // Red tones for the delete button
                        onClick={() => handleDeleteDevice(device.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Update Device Modal */}
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
          <Box sx={{ ...modalStyle }}>
            <Typography variant="h6" gutterBottom>
              Update Device Information
            </Typography>
            <TextField
              label="Device Name"
              variant="outlined"
              value={deviceToUpdate.name}
              onChange={(e) => setDeviceToUpdate({ ...deviceToUpdate, name: e.target.value })}
              sx={{ mb: 1, width: '100%' }}
            />
            <TextField
              label="Device Description"
              variant="outlined"
              value={deviceToUpdate.description}
              onChange={(e) => setDeviceToUpdate({ ...deviceToUpdate, description: e.target.value })}
              sx={{ mb: 1, width: '100%' }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Field</InputLabel>
              <Select
                value={deviceToUpdate.field_id}
                label="Field"
                onChange={(e) =>
                  setDeviceToUpdate({ ...deviceToUpdate, field_id: e.target.value })
                }
              >
                {fields.map((field) => (
                  <MenuItem key={field.id} value={field.id}>
                    {field.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateDevice}
            >
              Update Device
            </Button>
          </Box>
        </Fade>
      </Modal>
      <TelemetryPopup
        open={telemetryOpen}
        setOpen={setTelemetryOpen}
        deviceId={selectedDeviceId}
      />
    </Box>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: 24,
};

export default ControlDeviceSection;
