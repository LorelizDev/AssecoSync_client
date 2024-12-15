import axios from 'axios';

const URL = 'http://localhost:8000/api/logs';

// Función para iniciar el cronómetro (POST)
export const startTimeLog = async (workLocation) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${URL}`,
      {
        location: workLocation,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating time log:', error);
    throw error;
  }
};

// Función para pausar el cronómetro (PUT)
export const updateTimeLogByAction = async (id, action) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${URL}/${id}`,
      {
        action: action,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating time log:', error);
    throw error;
  }
};

// Función para obtener el registro activo (GET)
export const getActiveTimeLog = async () => {
  try {
    const token = localStorage.getItem('token');
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
    return null;
  }
};
