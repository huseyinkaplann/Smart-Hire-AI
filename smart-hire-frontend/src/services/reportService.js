// src/services/reportService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/report'; // Backend report endpoint

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getTopPosters = () => {
  return axios.get(`${API_URL}/top-posters`, getAuthHeaders());
};

const ReportService = {
  getTopPosters,
};

export default ReportService;