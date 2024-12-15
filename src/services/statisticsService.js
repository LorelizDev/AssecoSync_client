import axios from 'axios';

const URL = 'http://localhost:8000/api/stats';

export const fetchTimeLogStatistics = async (field, interval) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URL}/timelogs?field=${field}&interval=${interval}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching time logs statistics:', error);
    throw error;
  }
};
