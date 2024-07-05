import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
  CircularProgress,
  Paper,
  Button,
  IconButton,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloudIcon from "@mui/icons-material/Cloud";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import TemperatureChart from "../components/TemperatureChart";
import { fetchWeather, fetchForecast } from "../api/weather";
import { useNavigate } from "react-router";
import userLogout from "./Auth/userLogout";
import toast from "react-hot-toast";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { deleteCity, fetchSavedCities, fetchUserInfo, saveCity } from "../Firebase"; // Import Firestore functions
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WeatherAIRecommender from "./WeatherAIRecommender";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AssistantIcon from "@mui/icons-material/Assistant";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4b0082",
    },
    secondary: {
      main: "#8a2be2",
    },
    background: {
      default: "#e0f7fa",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
        },
      },
    },
  },
});

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [savedCities, setSavedCities] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openRecommenderModal, setOpenRecommenderModal] = useState(false);
  const [cityName, setCityName] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const initialize = async () => {
      try {
        const userInfo = await fetchUserInfo();
        setUserName(userInfo.name);
        fetchSavedCitiesFromFirestore();
      } catch (error) {
        console.error("Error fetching user info: ", error);
      }
    };
    initialize();
  }, []);

  const handleCitySelect = async (city) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const weatherData = await fetchWeather(city);
      setWeather(weatherData);
      setCityName(city);
      const forecastData = await fetchForecast(city);
      setForecast(forecastData.forecast);
    } catch (error) {
      console.error(error.message);
      setErrorMessage("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCity = async (city) => {
    try {
      if (!savedCities.includes(city)) {
        await saveCity(city);
        setSavedCities([...savedCities, city]);
        toast.success("City saved successfully!");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to save city. Please try again.");
    }
  };

  const fetchSavedCitiesFromFirestore = async () => {
    try {
      const cities = await fetchSavedCities();
      setSavedCities(cities);
    } catch (error) {
      console.error("Error fetching saved cities: ", error);
    }
  };
  const handleDeleteCity = async (city) => {
    try {
      await deleteCity(city);
      setSavedCities(savedCities.filter((c) => c !== city));
      toast.success("City deleted successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to delete city. Please try again.");
    }
  };

  useEffect(() => {
    fetchSavedCitiesFromFirestore();
  }, []);

  const navigate = useNavigate();
  const { error, logout } = userLogout();
  const handleLogout = async () => {
    await logout();
    if (!error) {
      navigate("/");
      toast.success("Logout success");
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenRecommenderModal = () => setOpenRecommenderModal(true);
  const handleCloseRecommenderModal = () => setOpenRecommenderModal(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CloudIcon sx={{ mr: 2, fontSize: 32 }} />
            <Typography
              color="white"
              variant="h5"
              component="div"
              sx={{ fontWeight: 600 }}
            >
              Weather Dashboard
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography color="white" variant="h6" component="div" sx={{ mr: 2 }}>
              Welcome, {userName}
            </Typography>
            <Tooltip title="Weather AI Recommendation">
              <IconButton
                color="inherit"
                onClick={handleOpenRecommenderModal}
                sx={{ mr: 2 }}
              >
                <AssistantIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Saved Cities">
              <IconButton
                color="inherit"
                onClick={handleOpenModal}
                sx={{ mr: 2 }}
              >
                <BookmarkIcon />
              </IconButton>
            </Tooltip>
            <Button
              onClick={handleLogout}
              variant="outlined"
              color="inherit"
              startIcon={<ExitToAppIcon />}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography color="#913639" variant="h4" gutterBottom>
              Check Your Local Weather
            </Typography>
            <SearchBar onCitySelect={handleCitySelect} />
          </Box>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {errorMessage && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}
          {weather && (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: "15px",
                background: "linear-gradient(135deg, #87CEEB 0%, #B0E0E6 100%)",
                color: "white",
                boxShadow:
                  "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                fontWeight="bold"
                color="#31255a"
              >
                Current Weather
              </Typography>
              <WeatherCard
                weather={weather}
                handleSaveCity={handleSaveCity}
                city={cityName}
              />
            </Paper>
          )}
          {forecast && (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: "15px",
                background: "rgba(106, 100, 251, 0.1)",
              }}
            >
              <Typography
                color="#31255a"
                variant="h5"
                gutterBottom
                align="center"
              >
                Weather Forecast
              </Typography>
              <Forecast forecast={forecast} />
            </Paper>
          )}
          {forecast && (
            <Paper elevation={3} sx={{ p: 3, borderRadius: "15px" }}>
              <Typography variant="h5" gutterBottom align="center">
                Temperature Trend
              </Typography>
              <TemperatureChart forecast={forecast} />
            </Paper>
          )}
          {!weather && !forecast && !loading && (
            <Box sx={{ mt: 4 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: "15px",
                  background:
                    "linear-gradient(135deg, #87CEEB 0%, #B0E0E6 100%)",
                  boxShadow:
                    "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                }}
              >
                <Typography variant="h5" align="center" color="#31255a">
                  Features of the Weather Dashboard
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Real-time weather data fetching" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Data visualization for temperature trends" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="User authentication" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Search functionality" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="7-day weather forecast" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Responsive design" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Error handling" />
                  </ListItem>
                </List>
              </Paper>
            </Box>
          )}
        </>
      </Container>
      <Modal
        open={openRecommenderModal}
        onClose={handleCloseRecommenderModal}
        aria-labelledby="weather-ai-recommender-title"
        aria-describedby="weather-ai-recommender-description"
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 4,
            borderRadius: "15px",
            background: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)",
            boxShadow:
              "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
          }}
        >
          <Typography
            id="weather-ai-recommender-title"
            variant="h5"
            component="h2"
            sx={{
              color: "#4b0082",
              fontWeight: 600,
              mb: 2,
              textAlign: "center",
            }}
          >
            Weather AI Recommendation
          </Typography>
          {weather && <WeatherAIRecommender weather={weather} />}
          <Button
            onClick={handleCloseRecommenderModal}
            sx={{
              mt: 2,
              backgroundColor: "#4b0082",
              color: "white",
              "&:hover": {
                backgroundColor: "#8a2be2",
              },
              width: "100%",
              borderRadius: "8px",
            }}
          >
            Close
          </Button>
        </Paper>
      </Modal>
      <Box
        component="footer"
        sx={{
          bgcolor: "#4b0082", // Use a contrasting color
          py: 2,
          mt: "auto",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        <Typography
          variant="body2"
          color="white" // Change the text color to ensure readability
          align="center"
        >
          © {new Date().getFullYear()} Weather Dashboard. All rights reserved.
        </Typography>
      </Box>
      );
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="saved-cities-title"
        aria-describedby="saved-cities-description"
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 4,
            borderRadius: "15px",
            background: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)",
            boxShadow:
              "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
          }}
        >
          <Typography
            id="saved-cities-title"
            variant="h5"
            component="h2"
            sx={{
              color: "#4b0082",
              fontWeight: 600,
              mb: 2,
              textAlign: "center",
            }}
          >
            Saved Cities
          </Typography>
          <List sx={{ maxHeight: 300, overflowY: "auto" }}>
            {savedCities.map((city, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleCitySelect(city)}
                sx={{
                  mb: 1,
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(75, 0, 130, 0.1)",
                  },
                }}
              >
                <ListItemText primary={city} sx={{ color: "#31255a" }} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCity(city);
                    }}
                    sx={{
                      color: "#8a2be2",
                      "&:hover": {
                        color: "#4b0082",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button
            onClick={handleCloseModal}
            sx={{
              mt: 2,
              backgroundColor: "#4b0082",
              color: "white",
              "&:hover": {
                backgroundColor: "#8a2be2",
              },
              width: "100%",
              borderRadius: "8px",
            }}
          >
            Close
          </Button>
        </Paper>
      </Modal>
    </ThemeProvider>
  );
};

export default Dashboard;
