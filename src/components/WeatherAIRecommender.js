import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import MovieIcon from '@mui/icons-material/Movie';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NatureIcon from '@mui/icons-material/Nature';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BrushIcon from '@mui/icons-material/Brush';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BookIcon from '@mui/icons-material/Book';
import * as tf from '@tensorflow/tfjs';

const activities = [
  { name: 'Beach day', icon: <BeachAccessIcon /> },
  { name: 'Indoor cooking', icon: <RestaurantIcon /> },
  { name: 'Visit a museum', icon: <LocalLibraryIcon /> },
  { name: 'Outdoor workout', icon: <FitnessCenterIcon /> },
  { name: 'Cafe hopping', icon: <LocalCafeIcon /> },
  { name: 'Watch a movie', icon: <MovieIcon /> },
  { name: 'Go shopping', icon: <ShoppingCartIcon /> },
  { name: 'Nature hike', icon: <NatureIcon /> },
  { name: 'Play video games', icon: <SportsEsportsIcon /> },
  { name: 'Painting or crafts', icon: <BrushIcon /> },
  { name: 'Listen to music', icon: <MusicNoteIcon /> },
  { name: 'Jogging', icon: <DirectionsRunIcon /> },
  { name: 'Read a book', icon: <BookIcon /> },
];

const WeatherAIRecommender = ({ weather }) => {
  const [model, setModel] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createModel();
  }, []);

  useEffect(() => {
    if (model && weather) {
      predictActivities();
    }
  }, [model, weather]);

  const createModel = async () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [4] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: activities.length, activation: 'softmax' }));
    model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });

    // Training data
    const xs = tf.tensor2d([
      [30, 80, 10, 0], [10, 60, 20, 1], [20, 50, 15, 0.5], [25, 30, 30, 0], [0, 70, 25, 1], 
      [35, 40, 5, 0], [15, 90, 10, 1], [22, 55, 12, 0], [28, 40, 20, 0], [18, 85, 8, 1], 
      [24, 60, 12, 0], [8, 50, 15, 1], [30, 70, 10, 0], [12, 55, 18, 1]
    ]);
    const ys = tf.tensor2d([
      [0.8, 0.0, 0.0, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.0, 0.0, 0.0], 
      [0.0, 0.6, 0.2, 0.0, 0.0, 0.1, 0.0, 0.0, 0.1, 0.0, 0.0, 0.0, 0.0], 
      [0.0, 0.1, 0.6, 0.0, 0.1, 0.1, 0.0, 0.0, 0.0, 0.1, 0.0, 0.0, 0.0], 
      [0.0, 0.0, 0.0, 0.7, 0.1, 0.0, 0.0, 0.2, 0.0, 0.0, 0.0, 0.0, 0.0], 
      [0.0, 0.1, 0.0, 0.0, 0.6, 0.1, 0.0, 0.0, 0.1, 0.1, 0.0, 0.0, 0.0], 
      [0.0, 0.1, 0.1, 0.0, 0.0, 0.6, 0.0, 0.0, 0.1, 0.1, 0.0, 0.0, 0.0], 
      [0.0, 0.0, 0.1, 0.0, 0.1, 0.0, 0.7, 0.0, 0.0, 0.1, 0.0, 0.0, 0.0], 
      [0.1, 0.0, 0.0, 0.2, 0.0, 0.0, 0.0, 0.7, 0.0, 0.0, 0.0, 0.0, 0.0], 
      [0.0, 0.0, 0.2, 0.2, 0.0, 0.2, 0.0, 0.0, 0.1, 0.2, 0.0, 0.1, 0.0], 
      [0.0, 0.3, 0.2, 0.0, 0.1, 0.2, 0.0, 0.0, 0.0, 0.2, 0.0, 0.0, 0.0], 
      [0.0, 0.0, 0.3, 0.2, 0.1, 0.0, 0.0, 0.0, 0.0, 0.2, 0.1, 0.0, 0.1], 
      [0.0, 0.1, 0.2, 0.0, 0.2, 0.2, 0.0, 0.0, 0.1, 0.0, 0.2, 0.0, 0.0], 
      [0.2, 0.0, 0.0, 0.2, 0.0, 0.1, 0.1, 0.0, 0.1, 0.1, 0.0, 0.1, 0.1], 
      [0.1, 0.2, 0.1, 0.0, 0.0, 0.2, 0.1, 0.0, 0.1, 0.0, 0.0, 0.1, 0.1]
    ]);

    await model.fit(xs, ys, { epochs: 500 });
    setModel(model);
    setLoading(false);
  };

  const predictActivities = () => {
    const temp = weather.current.temp_c;
    const humidity = weather.current.humidity;
    const windSpeed = weather.current.wind_kph;
    const isRainyOrCloudy = weather.current.condition.text.toLowerCase().includes('rain') || 
                            weather.current.condition.text.toLowerCase().includes('cloud') ? 1 : 0;

    const input = tf.tensor2d([[temp, humidity, windSpeed, isRainyOrCloudy]]);
    const prediction = model.predict(input);
    const probabilities = prediction.dataSync();

    const sortedActivities = activities
      .map((activity, index) => ({ ...activity, probability: probabilities[index] }))
      .sort((a, b) => b.probability - a.probability);

    setRecommendations(sortedActivities.slice(0, 5)); // Show top 5 recommendations
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2, borderRadius: '15px', background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)' }}>
      <Typography variant="h6" gutterBottom>
        AI-Recommended Activities for Today
      </Typography>
      <List>
        {recommendations.map((activity, index) => (
          <ListItem key={index}>
            <ListItemIcon>{activity.icon}</ListItemIcon>
            <ListItemText 
              primary={activity.name} 
              secondary={`Confidence: ${(activity.probability * 100).toFixed(2)}%`} 
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default WeatherAIRecommender;
