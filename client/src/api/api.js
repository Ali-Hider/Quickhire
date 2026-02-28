import axios from "axios";

const API_URL = "http://localhost:5000/api"; // your backend URL

// Auth
export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

// Jobs
export const getJobs = () => axios.get(`${API_URL}/jobs`);
export const getJobById = (id) => axios.get(`${API_URL}/jobs/${id}`);
export const createJob = (data, config) => axios.post(`${API_URL}/jobs`, data, config);
export const updateJob = (id, data, config) => axios.put(`${API_URL}/jobs/${id}`, data, config);
export const deleteJob = (id, config) => axios.delete(`${API_URL}/jobs/${id}`, config);

// Applications
export const submitApplication = (data) =>
  axios.post(`${API_URL}/applications`, data);