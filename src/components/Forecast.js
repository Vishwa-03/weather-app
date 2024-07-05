// src/components/Forecast
import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Icon } from '@mui/material';
import { WiRain, WiHumidity, WiStrongWind } from 'react-icons/wi';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(to bottom, #87CEEB, #B0E0E6)',
  color: '#fff',
  borderRadius: '15px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
  },
}));

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  color: '#fff',
});

const WeatherIcon = styled('img')({
  width: '64px',
  height: '64px',
  margin: '0 auto',
  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
});

const Forecast = ({ forecast }) => {
  return (
    <Grid container spacing={3}>
      {forecast.forecastday.map((day, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center" fontWeight="bold">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </Typography>
              <Box display="flex" justifyContent="center" mb={2}>
                <WeatherIcon src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} />
              </Box>
              <Typography variant="body1" align="center" gutterBottom>
                {day.day.condition.text}
              </Typography>
              <Box display="flex" justifyContent="center" mb={3}>
                <Typography variant="h4" component="span" fontWeight="bold">
                  {Math.round(day.day.avgtemp_c)}°C
                </Typography>
              </Box>
              <IconWrapper>
                <Icon component={WiRain} />
                <Typography variant="body2" ml={1}>Rain: {day.day.daily_chance_of_rain}%</Typography>
              </IconWrapper>
              <IconWrapper>
                <Icon component={WiHumidity} />
                <Typography variant="body2" ml={1}>Humidity: {day.day.avghumidity}%</Typography>
              </IconWrapper>
              <IconWrapper>
                <Icon component={WiStrongWind} />
                <Typography variant="body2" ml={1}>Wind: {day.day.maxwind_kph} kph</Typography>
              </IconWrapper>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Forecast;