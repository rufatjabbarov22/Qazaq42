import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, AppBar, Toolbar, Button } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const StyledAppBar = (props) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid',
  backgroundColor: props.theme.palette.background.paper,
  boxShadow: 'none',
});

function TemplateFrame({ children }) {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar sx={StyledAppBar}>
        <Toolbar variant="dense">
          <Button
            variant="text"
            size="small"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => window.history.back()}
          >
            Back
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: '1 1 auto', overflow: 'auto' }}>{children}</Box>
    </Box>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
};

export default TemplateFrame;
