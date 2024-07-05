import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import userLogin from "./Auth/userLogin";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const LogIn = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { error, login } = userLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogIn = async () => {
    try {
      await login(email, password);
      if (!error) {
        navigate(from, { replace: true });
        toast.success("Login success");
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage(error);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: "400px", margin: "auto", padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: "15px" }}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogIn}
          fullWidth
          sx={{ mt: 2, bgcolor: "#673ab7" }}
        >
          Log In
        </Button>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" fontWeight="medium">
            Don't have an account?
          </Typography>
          <Button
            onClick={toggleForm}
            sx={{
              ml: 1,
              fontWeight: "medium",
              textTransform: "none",
              color: "#673ab7",
            }}
          >
            Sign Up
          </Button>
        </Box>
        {errorMessage && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LogIn;
