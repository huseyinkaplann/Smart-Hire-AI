// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { jwtDecode } from 'jwt-decode';

// Sayfa bileşenlerini import edelim
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import JobAddPage from './pages/JobAddPage'; 
import CvUploadPage from './pages/CvUploadPage'; 
import CvMatchPage from './pages/CvMatchPage'; 
import AllJobsPage from './pages/AllJobsPage'; 
import ReportsPage from './pages/ReportsPage'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// PrivateRoute bileşeni, oturum açmış kullanıcıların belirli rotalara erişimini kontrol edecek
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  try {
    const decoded = jwtDecode(token);
    if (!allowedRoles || allowedRoles.includes(decoded.role)) {
      return children;
    } else {
      return <Navigate to="/login" />; // Yetkisiz
    }
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* PrivateRoute ile korunan rotalar */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute allowedRoles={["IK"]}>
                <Layout><DashboardPage /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/job-add"
            element={
              <PrivateRoute allowedRoles={["IK"]}>
                <Layout><JobAddPage /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/cv-upload"
            element={
              <PrivateRoute allowedRoles={["IK", "Basvuran"]}>
                <Layout><CvUploadPage /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/cv-match"
            element={
              <PrivateRoute allowedRoles={["IK"]}>
                <Layout><CvMatchPage /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/all-jobs"
            element={
              <PrivateRoute allowedRoles={["IK", "Basvuran"]}>
                <Layout><AllJobsPage /></Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute allowedRoles={["IK"]}>
                <Layout><ReportsPage /></Layout>
              </PrivateRoute>
            }
          />
          {/* Ana sayfaya gelenler doğrudan login'e yönlendirilsin veya dashboard'a */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;