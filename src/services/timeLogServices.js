import axios from 'axios';

const URL = 'http://localhost:8000/api/logs';

// Función para iniciar el cronómetro (POST)
export const startTimeLog = (workLocation, token) => {
  return axios.post(`${URL}`, {
    location: workLocation,
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

// Función para pausar el cronómetro (PUT)
export const pauseTimeLog = (id, token) => {

  return axios.put(`${URL}/${id}`, {
    action: 'pause'
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

// Función para reanudar el cronómetro (PUT)
export const resumeTimeLog = (id, token) => {
  return axios.put(`${URL}/${id}`, {
    action: 'resume'
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

// Función para detener el cronómetro (PUT)
export const stopTimeLog = (id, token) => {
  return axios.put(`${URL}/${id}`, {
    action: 'end'
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};



