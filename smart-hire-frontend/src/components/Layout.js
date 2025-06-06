// src/components/Layout.js
import React from 'react';
import Navbar from './Navbar';
import { Box } from '@mui/material';

function Layout({ children }) {
  return (
    <Box>
      <Navbar />
      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;