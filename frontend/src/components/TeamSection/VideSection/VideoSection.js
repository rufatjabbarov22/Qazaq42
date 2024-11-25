import React from 'react';
import { Box } from '@mui/material';
import './VideoSection.css';

const VideoSection = () => {
  return (
    <Box className="video-section">
      <Box className="video-container">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/c4t6zrF7IJM?si=tlUzFPbco-2bDZ7I"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </Box>
    </Box>
  );
};

export default VideoSection;

