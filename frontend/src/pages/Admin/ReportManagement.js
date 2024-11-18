import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Checkbox,
  Button,
  Paper,
} from '@mui/material';

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    // Fetch all reports
    fetch('/api/v1/reports')
      .then((response) => response.json())
      .then((data) => setReports(data))
      .catch((error) => console.error('Error fetching reports:', error));
  }, []);

  const handleSelectReport = (report) => {
    setSelectedReport(report);
    setReviewed(report.isReviewed);
  };

  const handleMarkAsReviewed = () => {
    if (selectedReport) {
      fetch(`/api/v1/reports/${selectedReport.id}/review`, {
        method: 'POST',
      })
        .then((response) => response.json())
        .then((updatedReport) => {
          setReports((prevReports) =>
            prevReports.map((report) =>
              report.id === updatedReport.id ? updatedReport : report
            )
          );
          setSelectedReport(updatedReport);
          setReviewed(true);
        })
        .catch((error) => console.error('Error marking report as reviewed:', error));
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', padding: '20px', backgroundColor: '#1a1a1a', color: '#fff' }}>
      {/* Reports List */}
      <Box sx={{ width: '30%', overflowY: 'auto', marginRight: '20px' }}>
        <Typography variant="h5" sx={{ marginBottom: '10px', color: '#FF9800' }}>
          Reports
        </Typography>
        <List sx={{ backgroundColor: '#292929', borderRadius: '8px', padding: '10px' }}>
          {reports.map((report) => (
            <React.Fragment key={report.id}>
              <ListItem
                button
                onClick={() => handleSelectReport(report)}
                sx={{
                  backgroundColor: selectedReport?.id === report.id ? '#4CAF50' : '#333',
                  borderRadius: '5px',
                  marginBottom: '5px',
                  color: '#fff',
                }}
              >
                <ListItemText primary={report.title} secondary={report.createdAt} />
              </ListItem>
              <Divider sx={{ backgroundColor: '#444' }} />
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Report Details */}
      <Box sx={{ flexGrow: 1, marginRight: '20px' }}>
        {selectedReport ? (
          <Paper
            elevation={3}
            sx={{
              padding: '20px',
              backgroundColor: '#292929',
              borderRadius: '8px',
              color: '#fff',
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: '10px', color: '#4CAF50' }}>
              Report Details
            </Typography>
            <Typography variant="h6">Title:</Typography>
            <Typography variant="body1" sx={{ marginBottom: '15px' }}>
              {selectedReport.title}
            </Typography>
            <Typography variant="h6">Content:</Typography>
            <Typography variant="body1" sx={{ marginBottom: '15px' }}>
              {selectedReport.content}
            </Typography>
            <Typography variant="h6">User ID:</Typography>
            <Typography variant="body1">{selectedReport.userId}</Typography>
          </Paper>
        ) : (
          <Typography variant="h6" sx={{ color: '#FF9800' }}>
            Select a report to view its details.
          </Typography>
        )}
      </Box>

      {/* Mark as Reviewed */}
      <Box sx={{ width: '20%', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          Mark as Reviewed
        </Typography>
        <Checkbox
          checked={reviewed}
          disabled={reviewed}
          onChange={handleMarkAsReviewed}
          sx={{ color: '#4CAF50' }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={reviewed}
          onClick={handleMarkAsReviewed}
          sx={{ marginTop: '10px' }}
        >
          Mark Reviewed
        </Button>
      </Box>
    </Box>
  );
};

export default ReportManagement;
