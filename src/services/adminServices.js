import axios from 'axios';

const axiosInstance = axios.create({
  URL: 'http://localhost:8000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
});

const handleError = (error) => {
  if (error.response) {
    console.error('Error de respuesta:', error.response.data);
    console.error('Código de estado:', error.response.status);
  } else if (error.request) {
    console.error('Error de solicitud:', error.request);
  } else {
    console.error('Error al configurar la solicitud:', error.message);
  }
  throw error;
};

export const getEmployees = async () => {
  try {
    const { data } = await axiosInstance.get('/');
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getEmployeeById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createNewEmployee = async (employeeData) => {
  try {
    const { data } = await axiosInstance.post('/', employeeData);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateEmployee = async (id, updatedData) => {
  try {
    const { data } = await axiosInstance.put(`/${id}`, updatedData);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteEmployee = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
