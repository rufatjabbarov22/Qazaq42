import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Paper,
  Link,
} from '@mui/material';

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  // Fetch all reports
  useEffect(() => {
    fetch('/api/v1/reports')
      .then((response) => response.json())
      .then((data) => setReports(data))
      .catch((error) => console.error('Error fetching reports:', error));
  }, []);

  const handleSelectReport = (report) => {
    setSelectedReport(report);
  };

  const handleMarkAsReviewed = (reportId) => {
    fetch(`/api/v1/reports/${reportId}/review`, {
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
      })
      .catch((error) => console.error('Error marking report as reviewed:', error));
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
                  backgroundColor: report.isReviewed ? '#333' : '#4CAF50',
                  borderRadius: '5px',
                  marginBottom: '5px',
                  color: '#fff',
                }}
              >
                <ListItemText
                  primary={report.title}
                  secondary={report.createdAt}
                  sx={{ textDecoration: report.isReviewed ? 'line-through' : 'none' }}
                />
                {!report.isReviewed && <Typography variant="body2" sx={{ color: '#FF9800' }}>New</Typography>}
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

      {/* Actions Section */}
      <Box sx={{ width: '20%', textAlign: 'center' }}>
        {selectedReport && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleMarkAsReviewed(selectedReport.id)}
              sx={{ marginBottom: '10px', backgroundColor: selectedReport.isReviewed ? '#555' : '#4CAF50' }}
              disabled={selectedReport.isReviewed}
            >
              {selectedReport.isReviewed ? 'Reviewed' : 'Mark as Reviewed'}
            </Button>
            <Divider sx={{ margin: '20px 0', backgroundColor: '#444' }} />
            <Typography variant="h6">Contact User</Typography>
            <Link
              href={`mailto:${selectedReport.userEmail}`}
              underline="hover"
              sx={{ color: '#4CAF50', display: 'block', marginTop: '10px' }}
            >
              Send Email
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ReportManagement;