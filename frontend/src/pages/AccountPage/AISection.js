import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import './AISection.css';

const plantSuggestions = [
  { name: 'Tomatoes', icon: '🍅' },
  { name: 'Carrots', icon: '🥕' },
  { name: 'Lettuce', icon: '🥬' },
  { name: 'Cucumbers', icon: '🥒' },
  { name: 'Peppers', icon: '🌶️' },
  { name: 'Potatoes', icon: '🥔' },
];

const AISection = () => {
  return (
    <Box
      className="ai-section"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Обеспечиваем, что секция будет занимать не менее 100% высоты экрана
        width: '100vw',
        padding: '0 20px',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <Box
        className="ai-result-box"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '600px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          AI Recommendations
        </Typography>

        <Typography variant="body1" sx={{ fontSize: '1.5rem', marginTop: '10px', textAlign: 'center' }}>
          Soil Moisture: 45%
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.5rem', marginTop: '10px', textAlign: 'center' }}>
          pH Level: 6.5
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.5rem', marginTop: '10px', textAlign: 'center' }}>
          Nutrient Levels: High
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ marginTop: '20px', textAlign: 'center' }}>
          Recommended Plants to Grow:
        </Typography>

        <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Table>
            <TableBody>
              {plantSuggestions.map((plant, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center" sx={{ fontSize: '2rem' }}>{plant.icon}</TableCell>
                  <TableCell align="center" sx={{ fontSize: '1.5rem' }}>{plant.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AISection;
