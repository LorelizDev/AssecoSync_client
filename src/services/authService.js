import axios from 'axios';

const URL = 'http://localhost:8000';

export const registerNewEmployee = async (data) => {
  return await axios.post(`${URL}/employee`, data);
};
export const loginEmployee = async (data) => {
  return await axios.post(`${URL}/login`, data);
};
