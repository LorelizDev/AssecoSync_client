// import axios from 'axios';
import useAuthStore from '../context/authStore';

const URL = 'http://localhost:8000';

// Function to add the authorization header to the request
const addAuthHeader = (config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Interceptor to handle expired tokens
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export const registerNewEmployee = async (data) => {
  const config = addAuthHeader({});
  return await axios.post(`${URL}/employee`, data, config);
};

export const loginEmployee = async (data) => {
  return await axios.post(`${URL}/login`, data);
};

export const refreshToken = async () => {
  const config = addAuthHeader({});
  return await axios.post(`${URL}/refresh-token`, null, config);
};

// Login function
export const handleLogin = async (data) => {
  try {
    const response = await loginEmployee(data);
    const { token, role, user } = response.data;
    useAuthStore.getState().login(token, role, user);
  } catch (error) {
    console.error('Login error:', error);
  }
};

// Register function
export const handleRegister = async (data) => {
  try {
    await registerNewEmployee(data);
    // Handle successful registration
  } catch (error) {
    console.error('Registration error:', error);
  }
};
