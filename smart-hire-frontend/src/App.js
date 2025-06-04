import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import CvUploadPage from "./pages/CvUploadPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cv-upload" element={<CvUploadPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;