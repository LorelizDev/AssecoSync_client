import axios from 'axios';

const URL = 'http://localhost:8000/api/stats';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token de autenticación no disponible.');
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

const validateParams = (field, interval) => {
  if (!field || !interval) {
    throw new Error('Ambos parámetros "field" e "interval" son requeridos.');
  }
};

const buildUrl = (field, interval) => {
  return `${URL}/timelogs?field=${encodeURIComponent(field)}&interval=${encodeURIComponent(interval)}`;
};

export const fetchTimeLogStatistics = async (field, interval) => {
  try {
    validateParams(field, interval);
    const headers = getAuthHeaders();
    const url = buildUrl(field, interval);
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(
      'Error al obtener estadísticas de registros de tiempo:',
      error.message
    );
    throw error;
  }
};
