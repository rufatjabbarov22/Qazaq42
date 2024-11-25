import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import Base_Url from '../../config';

const ReportManagement = () => {
  const [reports, setReports] = useState([]);

  // Function to fetch user details based on user ID
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(Base_Url + `users/${userId}`);
      const userData = await response.json();
      return `${userData.fname} ${userData.lname}`; // Return full name
    } catch (error) {
      console.error('Error fetching user details:', error);
      return 'Unknown User'; // Fallback if user data cannot be fetched
    }
  };

  // Fetch all reports
  useEffect(() => {
    fetch(Base_Url + 'reports/') // Corrected URL for reports endpoint
      .then((response) => response.json())
      .then(async (data) => {
        // For each report, fetch the user details
        const reportsWithUserNames = await Promise.all(
          data.map(async (report) => {
            const userName = await fetchUserDetails(report.user_id);
            return { ...report, userName };
          })
        );
        setReports(reportsWithUserNames); // Set the reports with user names
      })
      .catch((error) => console.error('Error fetching reports:', error));
  }, []);

  // Function to handle review action
  const handleReview = (reportId) => {
    fetch(Base_Url + `reports/${reportId}/review`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        // After reviewing, update the report's status locally
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.id === reportId ? { ...report, is_reviewed: true } : report
          )
        );
      })
      .catch((error) => console.error('Error marking report as reviewed:', error));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        color: '#000',
      }}
    >
      {/* Reports List */}
      <Box
        sx={{
          width: '100%',
          overflowY: 'auto',
          marginRight: '20px',
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: '10px', color: '#000', fontSize: '50px' }}
        >
          Reports
        </Typography>
        <List
          sx={{
            borderRadius: '8px',
            padding: '10px',
            borderTop: '#4CAF50',
            border: '50px',
          }}
        >
          {reports.map((report, index) => (
            <React.Fragment key={report.id}>
              <ListItem
                button
                sx={{
                  backgroundColor: report.is_reviewed ? '#f0f0f0' : '#f0f0f0',
                  borderRadius: '5px',
                  marginBottom: '5px',
                  color: '#000',
                }}
              >
                {/* Display the row number */}
                <Typography
                  variant="body1"
                  sx={{ marginRight: '20px', fontWeight: 'bold' }}
                >
                  {index + 1}.
                </Typography>

                <ListItemText
                  primary={`Created By: ${report.userName}`}
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ display: 'block' }}>
                        Message: {report.message}
                      </Typography>
                    </>
                  }
                  sx={{
                    textDecoration: report.is_reviewed ? 'line-through' : 'none',
                  }}
                />
                {!report.is_reviewed && (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleReview(report.id)}
                    sx={{
                      marginLeft: 'auto',
                      backgroundColor: '#CA4300',
                      '&:hover': {
                        backgroundColor: '#e68900',
                      },
                    }}
                  >
                    Review
                  </Button>
                )}
                {report.is_reviewed && (
                  <Button
                    variant="contained"
                    color="success" // Green color
                    sx={{
                      marginLeft: 'auto',
                      backgroundColor: '#4CAF50',
                      '&:hover': {
                        backgroundColor: '#45a049', // Slightly darker on hover
                      },
                    }}
                    disabled
                  >
                    Reviewed
                  </Button>
                )}
              </ListItem>
              <Divider sx={{ backgroundColor: '#444' }} />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ReportManagement;
