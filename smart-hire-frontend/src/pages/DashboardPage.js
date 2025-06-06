// src/pages/DashboardPage.js
import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Hoş Geldiniz, Dashboard
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Burada uygulamanızın ana işlevlerine erişebilirsiniz.
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={() => navigate('/job-add')}>
            İş İlanı Ekle
          </Button>
          <Button variant="contained" onClick={() => navigate('/cv-upload')}>
            CV Yükle
          </Button>
          <Button variant="contained" onClick={() => navigate('/cv-match')}>
            CV Eşleştir
          </Button>
          <Button variant="contained" onClick={() => navigate('/all-jobs')}>
            Tüm İş İlanları
          </Button>
          <Button variant="contained" onClick={() => navigate('/reports')}>
            Raporlar
          </Button>
        </Box>

        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 4 }}
          onClick={handleLogout}
        >
          Çıkış Yap
        </Button>
      </Box>
    </Container>
  );
}

export default DashboardPage;