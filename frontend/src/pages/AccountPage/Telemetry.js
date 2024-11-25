import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Modal,
  Fade,
  Backdrop,
  CircularProgress,
  Button,
} from '@mui/material';
import './Telemetry.css';
import AiReportPage from './AIReport';
import Base_Url from "../../config";

const TelemetryPopup = ({ open, setOpen, deviceId }) => {
  const [telemetryData, setTelemetryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTelemetryId, setSelectedTelemetryId] = useState(null);
  const [aiReportOpen, setAiReportOpen] = useState(false);

  useEffect(() => {
    let intervalId;

    const fetchTelemetryData = async () => {
      try {
        // setLoading(true);
        setError('');
        const response = await axios.get(
          Base_Url + `telemetry/device/${deviceId}`
        );
        setTelemetryData(response.data || []);
      } catch (err) {
        setError('Failed to fetch telemetry data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (open && deviceId) {
      fetchTelemetryData(); 
      intervalId = setInterval(fetchTelemetryData, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [open, deviceId]);

  const handleClose = () => {
    setOpen(false);
    setTelemetryData([]);
    setError('');
  };

  const handleAskAi = (telemetryId) => {
    setSelectedTelemetryId(telemetryId);
    setAiReportOpen(true);
  };

  return (
    <>
      <Modal
        open={!!open}
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
              <Box className="telemetry-list" display="flex" flexDirection="column">
                {[
                  {label: 'ID', value: telemetryData[0]?.id},
                  { label: 'Device ID', value: telemetryData[0]?.device_id },
                  { label: 'n', value: telemetryData[0]?.n },
                  { label: 'p', value: telemetryData[0]?.p },
                  { label: 'k', value: telemetryData[0]?.k },
                  { label: 'Temperature', value: telemetryData[0]?.temperature },
                  { label: 'pH', value: telemetryData[0]?.ph },
                  { label: 'Soil Humidity', value: telemetryData[0]?.soil_humidity },
                  { label: 'Air Humidity', value: telemetryData[0]?.air_humidity },
                  { label: 'Light Intensity', value: telemetryData[0]?.light_intensity },
                  { label: 'Light Duration', value: telemetryData[0]?.light_duration },
                  { label: 'CO2', value: telemetryData[0]?.co2 },
                ].map(({ label, value }) => (
                  <Typography key={label} className="header">
                    <Typography className="telemetry-item" id="left">
                      {label}:
                    </Typography>
                    <Typography className="telemetry-item">
                      {value ?? 'Not available'}
                    </Typography>
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography>No data available.</Typography>
            )}
            <Button
              onClick={() => handleAskAi(telemetryData[0]?.id)}
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

      {aiReportOpen && (
        <AiReportPage
          open={aiReportOpen}
          setOpen={setAiReportOpen}
          telemetryId={selectedTelemetryId}
        />
      )}
    </>
  );
};

export default TelemetryPopup;