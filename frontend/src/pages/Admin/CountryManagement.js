import React, { useState, useEffect, useMemo } from 'react';
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

const CountryManagement = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [formData, setFormData] = useState({ name: '', code: '' });
  const [suggestions, setSuggestions] = useState([]);
  const [codeSuggestions, setCodeSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const countryList = useMemo(() => ["Azerbaijan", "Russia", "United States", "Germany"], []);
  const codeList = useMemo(() => ["AZE", "RUS", "USA", "DEU"], []);

  useEffect(() => {
    fetch('/api/v1/countries')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (formData.name) {
      setSuggestions(
        countryList.filter((name) =>
          name.toLowerCase().includes(formData.name.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }

    if (formData.code) {
      setCodeSuggestions(
        codeList.filter((code) =>
          code.toLowerCase().includes(formData.code.toLowerCase())
        )
      );
    } else {
      setCodeSuggestions([]);
    }
  }, [formData.name, formData.code, countryList, codeList]);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, countries]);

  const handleAddCountry = (e) => {
    e.preventDefault();
    fetch('/api/v1/countries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Country added successfully');
        setCountries([...countries, data]);
        setFilteredCountries([...countries, data]);
        setFormData({ name: '', code: '' });
      })
      .catch((error) => console.error('Error adding country:', error));
  };

  const handleCountrySelect = (name, code) => {
    setFormData({ name, code });
    setShowSuggestions(false);
  };

  return (
    <Paper elevation={3} sx={containerStyle}>
      <Typography variant="h4" sx={headerStyle}>
        Country Management
      </Typography>

      <div style={iconContainerStyle}>
        <PublicIcon sx={globeIconStyle} />
      </div>

      <form onSubmit={handleAddCountry} style={formStyle}>
        <TextField
          label="Country Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            setShowSuggestions(true);
          }}
          fullWidth
          sx={inputStyle}
          placeholder="Enter country name"
        />
        {showSuggestions && suggestions.length > 0 && (
          <List component="nav" sx={suggestionsContainerStyle}>
            {suggestions.map((name, index) => (
              <ListItemButton
                key={index}
                onClick={() =>
                  handleCountrySelect(
                    name,
                    codeList[countryList.indexOf(name)]
                  )
                }
              >
                <ListItemText primary={name} />
              </ListItemButton>
            ))}
          </List>
        )}

        <TextField
          label="Country Code"
          variant="outlined"
          name="code"
          value={formData.code}
          onChange={(e) => {
            setFormData({ ...formData, code: e.target.value });
            setShowSuggestions(true);
          }}
          fullWidth
          sx={inputStyle}
          placeholder="Enter country code"
        />
        {showSuggestions && codeSuggestions.length > 0 && (
          <List component="nav" sx={suggestionsContainerStyle}>
            {codeSuggestions.map((code, index) => (
              <ListItemButton
                key={index}
                onClick={() =>
                  handleCountrySelect(countryList[codeList.indexOf(code)], code)
                }
              >
                <ListItemText primary={code} />
              </ListItemButton>
            ))}
          </List>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ ...addButtonStyle, marginTop: '20px' }}
        >
          Add Country
        </Button>
      </form>

      <TextField
        placeholder="Search by country name or code..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ ...inputStyle, marginBottom: '30px', marginTop: '30px' }}
      />

      <TableContainer component={Paper} sx={countryListContainerStyle}>
        <Typography variant="h5" sx={headerStyle}>
          Existing Countries
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Country Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Country Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCountries.map((country) => (
              <TableRow key={country.code}>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.code}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#2c2c2c',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
};

const headerStyle = {
  marginBottom: '20px',
  color: '#4CAF50',
  textAlign: 'center',
  fontWeight: 'bold',
};

const iconContainerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const globeIconStyle = {
  fontSize: '60px',
  color: '#4CAF50',
  animation: 'spin 10s linear infinite',
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
    backgroundColor: '#3a3a3a',
    color: '#fff',
    borderRadius: '5px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#555',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4CAF50',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#4CAF50',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#4CAF50',
    transform: 'translate(14px, 14px) scale(1)',
  },
  '& .MuiInputLabel-shrink': {
    color: '#4CAF50',
    transform: 'translate(14px, -6px) scale(0.75)',
  },
};

const suggestionsContainerStyle = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: '#2c2c2c',
  border: '1px solid #4CAF50',
  zIndex: 1,
};

const addButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  fontWeight: 'bold',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  textAlign: 'center',
};

const countryListContainerStyle = {
  marginTop: '20px',
  backgroundColor: '#3a3a3a',
  borderRadius: '8px',
};

export default CountryManagement;
