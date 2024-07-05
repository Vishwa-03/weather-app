import React from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent, Typography, useMediaQuery } from "@mui/material";
import Chart from "chart.js/auto";

const TemperatureChart = ({ forecast }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const data = {
    labels: forecast.forecastday.map((day) => day.date),
    datasets: [
      {
        label: "Max Temperature (°C)",
        data: forecast.forecastday.map((day) => day.day.maxtemp_c),
        fill: false,
        borderColor: "rgba(255,99,132,1)",
      },
      {
        label: "Min Temperature (°C)",
        data: forecast.forecastday.map((day) => day.day.mintemp_c),
        fill: false,
        borderColor: "rgba(54,162,235,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
    },
  };

  return (
    <Card style={{ backgroundColor: "#f5f5f5", marginBottom: "16px" }}>
      <CardContent>
        {isMobile ? (
          ""
        ) : (
          <Typography variant="h6" gutterBottom>
            Temperature Forecast
          </Typography>
        )}

        <div
          style={{
            position: "relative",
            height: isMobile ? "200px" : "400px",
            width: "100%",
          }}
        >
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureChart;
