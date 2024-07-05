import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import toast from "react-hot-toast";
import userSignup from "./Auth/userSignup";

const SignUp = ({ toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { error, signup } = userSignup();
  const from = location.state?.from?.pathname || "/dashboard";
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignUp = async () => {
    try {
      await signup(email, password, name);
      if (!error) {
        navigate(from, { replace: true });
        toast.success("Sign Up success");
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage(error);
      }
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: "400px", margin: "auto", padding: 2, mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: "15px" }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
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
          onClick={handleSignUp}
          fullWidth
          sx={{ mt: 2, bgcolor: "#673ab7" }}
        >
          Sign Up
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
            Already have an account?
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
            Log In
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

export default SignUp;
