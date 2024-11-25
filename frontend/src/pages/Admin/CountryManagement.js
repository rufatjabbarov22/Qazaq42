import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import Base_Url from '../../config';

const CountryManagement = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [formData, setFormData] = useState({ name: '', id: '' });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [message, setMessage] = useState(''); // State for notifications

  // Fetch countries from the backend
  useEffect(() => {
    fetch(Base_Url + 'countries/')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // Update suggestions based on user input
  useEffect(() => {
    if (formData.name) {
      setSuggestions(
        filteredCountries.filter((country) =>
          country.name.toLowerCase().includes(formData.name.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  }, [formData.name, filteredCountries]);

  // Handle adding a new country
  const handleAddCountry = (e) => {
    e.preventDefault();
    fetch(Base_Url + 'countries/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setCountries([...countries, data]);
        setFilteredCountries([...countries, data]);
        setFormData({ name: '', id: '' });
        setMessage('Country added successfully'); // Update the message state
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      })
      .catch((error) => {
        console.error('Error adding country:', error);
        setMessage('Error adding country'); // Show error message
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      });
  };

  // Handle selecting a suggested country
  const handleCountrySelect = (name, id) => {
    setFormData({ name, id });
    setShowSuggestions(false);
  };

  // Handle change in country name
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      name: newName,
    }));
    setShowSuggestions(true);
  };

  return (
    <Paper elevation={3} sx={containerStyle}>
      <Typography variant="h4" sx={headerStyle}>
        Country Management
      </Typography>

      {message && ( // Display message
        <Typography variant="body1" sx={messageStyle}>
          {message}
        </Typography>
      )}

      <form onSubmit={handleAddCountry} style={formStyle}>
        <TextField
          label="Country Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          fullWidth
          sx={inputStyle}
          placeholder="Enter country name"
        />
        {showSuggestions && suggestions.length > 0 && (
          <List component="nav" sx={suggestionsContainerStyle}>
            {suggestions.map((country) => (
              <ListItemButton
                key={country.id}
                onClick={() => handleCountrySelect(country.name, country.id)}
              >
                <ListItemText primary={country.name} />
              </ListItemButton>
            ))}
          </List>
        )}

        <TextField
          label="Country Code"
          variant="outlined"
          name="id"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          fullWidth
          sx={inputStyle}
          placeholder="Enter country code"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ ...addButtonStyle, marginTop: '20px' }}
        >
          Add Country
        </Button>
      </form>

      <TableContainer component={Paper} sx={countryListContainerStyle}>
        <Typography variant="h5" sx={headerStyle}>
          Existing Countries
        </Typography>
        <Table>
          <TableHead sx={{ backgroundColor: '#4CAF50' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Country Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Country Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCountries.map((country) => (
              <TableRow key={country.id}>
                <TableCell sx={{ color: '#000' }}>{country.name}</TableCell>
                <TableCell sx={{ color: '#000' }}>{country.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const containerStyle = {
  maxWidth: '70%',
  margin: '0 auto',
  marginTop: '50px',
  padding: '20px',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
};

const headerStyle = {
  marginBottom: '20px',
  color: '#000',
  textAlign: 'center',
  fontWeight: 'bold',
};


const messageStyle = {
  color: '#4CAF50',
  textAlign: 'center',
  margin: '10px 0',
  fontWeight: 'bold',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  maxWidth: '400px',
  margin: '0 auto',
};

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
    borderRadius: '5px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4CAF50',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4CAF50',
    },
  },
};

const suggestionsContainerStyle = {
  position: 'absolute',
  backgroundColor: '#fff',
  border: '1px solid #4CAF50',
  zIndex: 1,
};

const addButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  fontWeight: 'bold',
  padding: '10px 20px',
  borderRadius: '4px',
};

const countryListContainerStyle = {
  marginTop: '20px',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
};

export default CountryManagement;
