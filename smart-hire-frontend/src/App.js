import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import CvUploadPage from "./pages/CvUploadPage";
import CvMatchPage from "./pages/CvMatchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import AddJobPage from "./pages/AddJobPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cv-upload" element={<CvUploadPage />} />
          <Route path="/cv-match" element={<CvMatchPage />} />
          <Route path="/add-job" element={<AddJobPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;