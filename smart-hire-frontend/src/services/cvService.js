// src/services/cvService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/cv'; // Backend cv endpoint

const getAuthHeaders = (contentType = 'application/json') => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': contentType, // Farklı content type'lar için esneklik
    },
  };
};

const uploadCv = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  // 'multipart/form-data' axios tarafından otomatik olarak ayarlanır, ancak biz yine de belirtelim.
  return axios.post(`${API_URL}/upload`, formData, getAuthHeaders('multipart/form-data'));
};

const matchCv = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_URL}/match`, formData, getAuthHeaders('multipart/form-data'));
};

const CvService = {
  uploadCv,
  matchCv,
};

export default CvService;