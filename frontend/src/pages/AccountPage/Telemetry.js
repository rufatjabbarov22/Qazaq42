import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Modal, Fade, Backdrop, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TelemetryPopup = ({ open, setOpen, deviceId }) => {
  const [telemetryData, setTelemetryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (open && deviceId) {
      const fetchTelemetryData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:8000/api/v1/telemetry/device/${deviceId}`
          );
          setTelemetryData(response.data);
          setError('');
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
    setTelemetryData(null);
    setError('');
  };

  const handleAskAi = () => {
    // Store the telemetry ID in localStorage
    localStorage.setItem('telemetry_id', telemetryData.id);

    // Close the modal and navigate to AI report page
    handleClose();
    navigate(`/ai-report?telemetry_id=${telemetryData.id}`);
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            padding: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Telemetry Data
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            telemetryData && (
              <Box>
                <Typography>ID: {telemetryData.id}</Typography>
                <Typography>Device ID: {telemetryData.device_id}</Typography>
                <Typography>n: {telemetryData.n}</Typography>
                <Typography>p: {telemetryData.p}</Typography>
                <Typography>k: {telemetryData.k}</Typography>
                <Typography>Temperature: {telemetryData.temperature}</Typography>
                <Typography>pH: {telemetryData.ph}</Typography>
                <Typography>
                  Soil Humidity: {telemetryData.soil_humidity}
                </Typography>
                <Typography>
                  Air Humidity: {telemetryData.air_humidity}
                </Typography>
                <Typography>
                  Light Intensity: {telemetryData.light_intensity}
                </Typography>
                <Typography>
                  Light Duration: {telemetryData.light_duration}
                </Typography>
                <Typography>CO2: {telemetryData.co2}</Typography>
                <Typography>O2: {telemetryData.o2}</Typography>
              </Box>
            )
          )}
          <Button onClick={handleAskAi} variant="contained" color="primary" sx={{ mt: 2 }}>
            Ask AI
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TelemetryPopup;
