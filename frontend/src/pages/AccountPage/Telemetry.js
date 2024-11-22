import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Modal, Fade, Backdrop, CircularProgress, Button, backdropClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Telemetry.css';

const TelemetryPopup = ({ open, setOpen, deviceId }) => {
  const [telemetryData, setTelemetryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (open && deviceId) {
      const fetchTelemetryData = async () => {
        try {
          setLoading(true);
          setError('');
          const response = await axios.get(
            `http://localhost:8000/api/v1/telemetry/device/${deviceId}`
          );
          console.log('API Response:', response.data); // Debug log
          setTelemetryData(response.data); // Expecting an array
        } catch (err) {
          setError('Failed to fetch telemetry data. Please try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchTelemetryData();
    }
  }, [open, deviceId]);

  const handleClose = () => {
    setOpen(false);
    setTelemetryData([]);
    setError('');
  };

  const handleAskAi = () => {
    if (telemetryData.length > 0 && telemetryData[0].id) {
      localStorage.setItem('telemetry_id', telemetryData[0].id); // Access the first item's ID
      handleClose();
      navigate(`/ai-report?telemetry_id=${telemetryData[0].id}`);
    } else {
      console.error('Telemetry data is missing or incomplete.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            padding: 5,
            // backgroundColor: 'yellow'
          }}
        >
          <Typography className="telemetry-header">Telemetry Data</Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : telemetryData.length > 0 ? (
            <Box className="telemetry-list" display={'flex'} alignItems={'center'}>
              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  ID:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].id || 'Not available'}
                </Typography>
              </Typography>

              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  Device ID:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].device_id || 'Not available'}
                </Typography>
              </Typography>

              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  n:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].n ?? 'Not available'}
                </Typography>
              </Typography>

              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  p:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].p ?? 'Not available'}
                </Typography>
              </Typography>

              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  k:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].k ?? 'Not available'}
                </Typography>
              </Typography>

              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  Temperature:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].temperature || 'Not available'}
                </Typography>
              </Typography>

              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  pH:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].ph || 'Not available'}
                </Typography>
              </Typography>

              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  Soil Humidity:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].soil_humidity || 'Not available'}
                </Typography>
              </Typography>

              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  Air Humidity:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].air_humidity || 'Not available'}
                </Typography>
              </Typography>

              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  Light Intensity:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].light_intensity || 'Not available'}
                </Typography>
              </Typography>

              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  Light Duration:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].light_duration || 'Not available'}
                </Typography>
              </Typography>

              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  CO2:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].co2 || 'Not available'}
                </Typography>
              </Typography>

              <Typography className='header'>
                <Typography className="telemetry-item" id="left">
                  O2:
                </Typography>
                <Typography className="telemetry-item">
                  {telemetryData[0].o2 || 'Not available'}
                </Typography>
              </Typography>
            </Box>
          ) : (
            <Typography>No data available.</Typography>
          )}
          <Button
            onClick={handleAskAi}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={telemetryData.length === 0}
          >
            Ask AI
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TelemetryPopup;
