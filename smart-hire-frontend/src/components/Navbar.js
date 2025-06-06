// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Kullanıcının giriş yapıp yapmadığını kontrol edelim
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SmartHire
        </Typography>
        <Box>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={() => navigate('/job-add')}>
                İş İlanı Ekle
              </Button>
              <Button color="inherit" onClick={() => navigate('/cv-upload')}>
                CV Yükle
              </Button>
               <Button color="inherit" onClick={() => navigate('/cv-match')}>
                CV Eşleştir
              </Button>
               <Button color="inherit" onClick={() => navigate('/all-jobs')}>
                Tüm İş İlanları
              </Button>
               <Button color="inherit" onClick={() => navigate('/reports')}>
                Raporlar
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Çıkış Yap
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Giriş Yap
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Kayıt Ol
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;