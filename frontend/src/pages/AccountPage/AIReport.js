import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

const AiReportPage = () => {
  const [aiPrediction, setAiPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const telemetryId = queryParams.get('telemetry_id');

    if (telemetryId) {
      const fetchAiPrediction = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:8000/api/v1/ai/predict?telemetry_id=${telemetryId}`
          );
          setAiPrediction(response.data);
          setError('');
        } catch (err) {
          setError('Failed to fetch AI prediction. Please try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchAiPrediction();
    }
  }, [location.search]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        AI Prediction Report
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        aiPrediction && (
          <Box>
            <Typography variant="h6">Prediction Data:</Typography>
            <Typography>Prediction: {aiPrediction.prediction}</Typography>
            <Typography>Confidence: {aiPrediction.confidence}</Typography>
            {/* Add more AI prediction data fields here */}
          </Box>
        )
      )}
    </Box>
  );
};

export default AiReportPage;
