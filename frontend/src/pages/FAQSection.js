import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BuildIcon from '@mui/icons-material/Build';
import DevicesIcon from '@mui/icons-material/Devices';
import './FAQSection.css';

const FAQSection = () => {
  return (
    <Box className="faq-section">
      <Typography variant="h4" className="section-title">
        F A Q
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-summary">
          <HelpOutlineIcon className="faq-icon" />
          <Typography>How does the KSSR-01 work?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The KSSR-01 uses advanced sensors to scan soil properties and provides real-time feedback on nutrient levels, moisture, and more.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-summary">
          <DevicesIcon className="faq-icon" />
          <Typography>Can I use the device on multiple fields?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, the device is portable and can be easily transferred between fields for comprehensive soil analysis.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-summary">
          <BuildIcon className="faq-icon" />
          <Typography>What maintenance does the KSSR-01 require?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The KSSR-01 is designed to be low-maintenance. It only requires periodic cleaning and software updates to maintain its accuracy and performance.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-summary">
          <InfoIcon className="faq-icon" />
          <Typography>What kind of data does the KSSR-01 provide?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The KSSR-01 provides detailed data on soil moisture, pH levels, and nutrient availability. This data helps farmers optimize their land usage and crop yields.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQSection;
