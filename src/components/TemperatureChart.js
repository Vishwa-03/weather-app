// src/components/RempratureChart

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import Chart from 'chart.js/auto';

const TemperatureChart = ({ forecast }) => {
  const data = {
    labels: forecast.forecastday.map(day => day.date),
    datasets: [
      {
        label: 'Max Temperature (°C)',
        data: forecast.forecastday.map(day => day.day.maxtemp_c),
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
      },
      {
        label: 'Min Temperature (°C)',
        data: forecast.forecastday.map(day => day.day.mintemp_c),
        fill: false,
        borderColor: 'rgba(54,162,235,1)',
      }
    ]
  };

  return (
    <Card style={{ backgroundColor: '#f5f5f5' }}>
      <CardContent>
       
        <Line data={data} />
      </CardContent>
    </Card>
  );
};

export default TemperatureChart;
