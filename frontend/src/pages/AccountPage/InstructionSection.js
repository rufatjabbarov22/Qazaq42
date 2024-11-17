import React from 'react';
import './InstructionSection.css';
import { Box, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const InstructionSection = () => {
  return (
    <Box className="instruction-section">
      <Typography variant="h3" component="h1" className="section-title">
        Instructions for Soil Scanning Device
      </Typography>

      <Box className="instruction-step">
        <SettingsIcon className="instruction-icon" />
        <Box>
          <Typography variant="h5" component="h3" className="instruction-header">
            1. Setting Up the Device
          </Typography>
          <Typography variant="body1" className="instruction-text">
            Unbox the device and place it in the desired soil location. Ensure the soil is neither too dry nor too wet for optimal results.
          </Typography>
        </Box>
      </Box>

      <Box className="instruction-step">
        <PowerSettingsNewIcon className="instruction-icon" />
        <Box>
          <Typography variant="h5" component="h3" className="instruction-header">
            2. Starting the Scanning Process
          </Typography>
          <Typography variant="body1" className="instruction-text">
            Turn on the device using the switch, and the scan will begin automatically.
          </Typography>
        </Box>
      </Box>

      <Box className="instruction-step">
        <VisibilityIcon className="instruction-icon" />
        <Box>
          <Typography variant="h5" component="h3" className="instruction-header">
            3. Viewing the Results
          </Typography>
          <Typography variant="body1" className="instruction-text">
            Once the scan is complete, results will be displayed in your account under the Control Device section.
          </Typography>
        </Box>
      </Box>

      <Box className="instruction-step">
        <LightbulbIcon className="instruction-icon" />
        <Box>
          <Typography variant="h5" component="h3" className="instruction-header">
            4. AI Recommendations
          </Typography>
          <Typography variant="body1" className="instruction-text">
            Click the AI button to receive tailored recommendations based on your soil’s condition.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InstructionSection;
