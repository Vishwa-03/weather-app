import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(230, 230, 250, 0.9) 0%, rgba(216, 191, 216, 0.9) 100%)',
  color: '#4b0082',
  borderRadius: '15px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  maxWidth: '300px',
  margin: '0 auto',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const WeatherIcon = styled('img')({
  width: '80px',
  height: '80px',
  margin: '0 auto',
  display: 'block',
  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
});

const WeatherInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
}));

const WeatherCard = ({ weather, handleSaveCity }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom fontWeight="bold" color="#4b0082">
          {weather.location.name}
        </Typography>
        <WeatherIcon
          src={`https:${weather.current.condition.icon}`}
          alt={weather.current.condition.text}
        />
        <Typography variant="h3" align="center" gutterBottom fontWeight="bold" color="#ac5e1f">
          {weather.current.temp_c}°C
        </Typography>
        <Typography variant="body1" align="center" gutterBottom color="#4b0082">
          {weather.current.condition.text}
        </Typography>
        <WeatherInfo>
          <Box display="flex" alignItems="center">
            <ThermostatIcon fontSize="small" sx={{ mr: 1, color: '#8a2be2' }} />
            <Typography variant="body2" color="#4b0082">Feels like</Typography>
          </Box>
          <Typography variant="body2" color="#4b0082">{weather.current.feelslike_c}°C</Typography>
        </WeatherInfo>
        <WeatherInfo>
          <Box display="flex" alignItems="center">
            <OpacityIcon fontSize="small" sx={{ mr: 1, color: '#8a2be2' }} />
            <Typography variant="body2" color="#4b0082">Humidity</Typography>
          </Box>
          <Typography variant="body2" color="#4b0082">{weather.current.humidity}%</Typography>
        </WeatherInfo>
        <WeatherInfo>
          <Box display="flex" alignItems="center">
            <AirIcon fontSize="small" sx={{ mr: 1, color: '#8a2be2' }} />
            <Typography variant="body2" color="#4b0082">Wind</Typography>
          </Box>
          <Typography variant="body2" color="#4b0082">{weather.current.wind_kph} km/h</Typography>
        </WeatherInfo>
        <Button variant="contained" color="primary" onClick={() => handleSaveCity(weather.location.name)}>
          Save City
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default WeatherCard;
