import axios from 'axios';

const URL = 'http://localhost:8000/api/logs';

// Función para obtener el token de localStorage y verificar si está presente
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('El token de autenticación no está disponible.');
  }
  return token;
};

// Función para manejar los errores y devolver un mensaje adecuado
const handleError = (error) => {
  if (error.response) {
    console.error(
      'Error de respuesta:',
      error.response.data,
      'Código de estado:',
      error.response.status
    );
  } else if (error.request) {
    console.error('Error de solicitud:', error.request);
  } else {
    console.error('Error al configurar la solicitud:', error.message);
  }
  throw error;
};

// Función para iniciar el cronómetro (POST)
export const startTimeLog = async (workLocation) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${URL}`,
      { location: workLocation },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para pausar el cronómetro (PUT)
export const updateTimeLogByAction = async (id, action) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(
      `${URL}/${id}`,
      { action },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Función para obtener el registro activo (GET)
export const getActiveTimeLog = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${URL}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const activeTimeLog = response.data.find(
      (timeLog) => timeLog.status !== 'closed'
    );
    return activeTimeLog || null;
  } catch (error) {
    console.error('Error fetching active time log:', error);
    return null; //
  }
};
