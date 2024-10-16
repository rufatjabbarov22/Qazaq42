import React, { useState } from 'react';
import { Box, Typography, Switch, Button, LinearProgress } from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import './ControlDeviceSection.css';

const ControlDeviceSection = ({ setSelectedSection }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [scanData, setScanData] = useState({});

  const handleToggle = () => {
    setIsScanning(true);
    setScanCompleted(false);

    setTimeout(() => {
      const data = {
        moisture: '45%',
        phLevel: '6.5',
        nutrients: 'High',
      };
      setScanData(data);
      setIsScanning(false);
      setScanCompleted(true);
    }, 3000);
  };

  return (
    <Box className="control-device-section">
      {!isScanning && !scanCompleted && (
        <Box className="device-control-box">
          <Typography variant="h4" gutterBottom>
            DeviceControl
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <DevicesIcon style={{ fontSize: 80, marginRight: 20 }} />
            <Switch
              checked={isScanning}
              onChange={handleToggle}
              color="primary"
            />
          </Box>
        </Box>
      )}

      {isScanning && (
       <Box className="device-loading-box">
       <Typography variant="h6" sx={{ marginTop: 5, fontSize: '1.5rem' }}>
         Scanning in progress...
       </Typography>
       <Box width="100%" marginTop={4} sx={{ display: 'flex', justifyContent: 'center' }}>
         <LinearProgress color="primary" sx={{ width: '80%', height: 10 }} />
       </Box>
     </Box>
     
      )}

      {scanCompleted && (
        <Box className="scan-result-box">
        <Typography variant="h4" gutterBottom>
          Scan Result
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 15, fontSize: '1.5rem' }}>
          Soil Moisture: {scanData.moisture}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 15, fontSize: '1.5rem' }}>
          pH Level: {scanData.phLevel}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 15, fontSize: '1.5rem' }}>
          Nutrient Levels: {scanData.nutrients}
        </Typography>
        <Box sx={{ flexGrow: 1 }} /> {/* Это заполняет пространство, чтобы кнопка была внизу */}
        <Button
          variant="contained"
          color="primary"
          className="ai-button"
          onClick={() => setSelectedSection('ai')}
          sx={{ marginBottom: 20, marginTop: 10 }}
        >
          AI
        </Button>
      </Box>
      
      )}
    </Box>
  );
};

export default ControlDeviceSection;