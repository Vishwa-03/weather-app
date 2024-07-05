import React, { useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Authentication = () => {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #87CEEB 0%, #B0E0E6 100%)",
        padding: 2,
      }}
    >
      <Typography variant="h3" color="#31255a" mb={4}>
        Weather App
      </Typography>
      <Paper
        elevation={3}
        sx={{
          width: { xs: "90%", sm: 400 },
          padding: 3,
          borderRadius: "15px",
          background: "#ffffff",
          boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" color="#31255a" mb={3}>
          {toggle ? "Log In" : "Sign Up"}
        </Typography>
        {toggle ? (
          <LogIn toggleForm={handleToggle} />
        ) : (
          <SignUp toggleForm={handleToggle} />
        )}
        <Button
          onClick={handleToggle}
          variant="outlined"
          sx={{ mt: 2, color: "#673ab7", borderColor: "#673ab7" }}
        >
          {toggle ? "Switch to Sign Up" : "Switch to Log In"}
        </Button>
      </Paper>
    </Box>
  );
};

export default Authentication;
