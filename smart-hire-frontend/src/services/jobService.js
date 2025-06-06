// src/services/jobService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/job'; // Backend job endpoint

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

const addJob = (title, description, required_skills) => {
  return axios.post(`${API_URL}/add`, { title, description, required_skills }, getAuthHeaders());
};

const getAllJobs = () => {
  return axios.get(`${API_URL}/all`, getAuthHeaders());
};

const JobService = {
  addJob,
  getAllJobs,
};

export default JobService;