import axios from 'axios';

const URL = 'http://localhost:8000/api/logs';

//POST

export const registerTime = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${URL}/${id}`, data, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      return {
        success: true,
        message: 'Tiempo registrado exitosamente',
        data: response.data
      };
    } catch (error) {
      console.error("Error al registrar el tiempo:", error.response?.data || error.message);
      throw error;
    }
  };

//PUT

export const updateTime = async (id, updatedData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${URL}/${id}`, updatedData
      , {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
      return response.data
  } catch (error) {
      console.error('Error al actualizar el tiempo:', error.response?.data || error.message);
      throw error;
  }
};