// src/components/SearchBar

import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText, Paper, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { fetchWeather } from '../api/weather';

const SearchBar = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      const weather = await fetchWeather(e.target.value);
      setSuggestions([weather.location.name]);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSuggestions([]);
    }
  };

  const handleCitySelect = (city) => {
    onCitySelect(city);
    setSuggestions([]);
    setSearchTerm('');
  };

  return (
    <div style={{ marginBottom: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <TextField
        label="Search City"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          marginBottom: '10px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#3e3b51',
              borderRadius: '28px',
            },
            '&:hover fieldset': {
              borderColor: '#6c64fb',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#748cf1',
            },
          },
        }}
      />
      {suggestions.length > 0 && (
        <Paper elevation={3} sx={{ borderRadius: '10px', overflow: 'hidden' }}>
          <List>
            {suggestions.map((city, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleCitySelect(city)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <LocationOnIcon color="action" sx={{ marginRight: 1 }} />
                <ListItemText
                  primary={
                    <Typography variant="body1" component="span">
                      {city}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default SearchBar;
