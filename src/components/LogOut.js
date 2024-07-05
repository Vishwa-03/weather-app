import React from 'react';
import { projectAuth } from '../Firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@mui/material';

const LogOut = () => {
  const handleLogOut = async () => {
    await projectAuth.signOut();
  };

  return (
    <Button onClick={handleLogOut} color="inherit">Log Out</Button>
  );
};

export default LogOut;
