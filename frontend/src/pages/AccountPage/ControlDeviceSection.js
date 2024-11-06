import React, { useState } from 'react';
import { Box, Typography, Switch, Button, Snackbar, Alert } from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import './ControlDeviceSection.css';

const ControlDeviceSection = ({ setSelectedSection }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [scanData, setScanData] = useState({});

  const generateRandomScanData = () => {
    return {
      moisture: `${Math.floor(Math.random() * 60) + 30}%`,
      phLevel: (Math.random() * (7.5 - 5.5) + 5.5).toFixed(1),
      nutrients: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
    };
  };

  const handleToggle = () => {
    setIsScanning(true);
    setScanCompleted(false);

    setTimeout(() => {
      const data = generateRandomScanData();
      setScanData(data);
      setIsScanning(false);
      setScanCompleted(true);
      setShowNotification(true); // Show notification after scan completion
    }, 3000);
  };

  const handleCloseNotification = () => {
    setShowNotification(false); // Close notification after a few seconds
  };

  return (
    <Box className="control-device-section">
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
          Loading Complete
        </Alert>
      </Snackbar>

      {!isScanning && !scanCompleted && (
        <Box className="device-control-box">
          <Typography variant="h4" gutterBottom>
            Device Control
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            <DevicesIcon className="device-icon" />
            <Switch checked={isScanning} onChange={handleToggle} color="primary" sx={{ mt: 2 }} />
          </Box>
        </Box>
      )}

      {isScanning && (
        <Box className="loading-section">
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Scanning in progress...
          </Typography>
          <Box className="loading-bar">
            <Box className="loading-track" />
          </Box>
        </Box>
      )}

      {scanCompleted && (
        <Box className="scan-result-box">
          <Typography variant="h4" gutterBottom>
            Scan Results
          </Typography>
          <Box className="result-item">
            <Typography variant="body1">Soil Moisture: {scanData.moisture}</Typography>
          </Box>
          <Box className="result-item">
            <Typography variant="body1">pH Level: {scanData.phLevel}</Typography>
          </Box>
          <Box className="result-item">
            <Typography variant="body1">Nutrient Levels: {scanData.nutrients}</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedSection('ai')}
            sx={{ marginTop: 2 }}
          >
            Ask AI
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ControlDeviceSection;
