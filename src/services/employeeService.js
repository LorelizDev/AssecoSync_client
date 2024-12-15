import axios from 'axios';

const URL = 'http://localhost:8000/api/employees';

export const getAllEmployees = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al traer los empleados:', error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el empleado:', error);
    throw error;
  }
};

export const updateEmployee = async (id, updatedData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error al actualizar el empleado:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al borrar el empleado:', error);
    throw error;
  }
};
