import axios from 'axios';

// URL base para solicitudes API
const BASE_URL = 'http://localhost:8000/api';

/**
 * Crear una instancia de Axios con inyección dinámica de token
 * @param {string} token - Token de autenticación
 * @returns {AxiosInstance} Instancia de Axios configurada
 */
const createAxiosInstance = (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const calendarServices = {
  /**
   * Obtener todas las solicitudes de ausencia
   * @param {string} token - Token de autenticación
   * @returns {Promise} Lista de solicitudes de ausencia
   */
  getAllLeaveRequests: async (token) => {
    try {
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.get('/leave-requests');
      return response.data;
    } catch (error) {
      console.error('Error al obtener solicitudes de ausencia:', error);
      throw error;
    }
  },

  /**
   * Obtener tipos de solicitudes de ausencia
   * @param {string} token - Token de autenticación
   * @returns {Promise} Lista de tipos de solicitudes
   */
  getLeaveRequestTypes: async (token) => {
    try {
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.get('/type-requests');
      return response.data;
    } catch (error) {
      console.error('Error al obtener tipos de solicitudes:', error);
      throw error;
    }
  },

  /**
   * Crear una nueva solicitud de ausencia
   * @param {Object} leaveRequestData - Datos de la solicitud
   * @param {string} token - Token de autenticación
   * @returns {Promise} Solicitud creada
   */
  createLeaveRequest: async (leaveRequestData, token) => {
    try {
      const axiosInstance = createAxiosInstance(token);

      // Obtener ID del tipo de vacaciones
      const typeResponse = await axiosInstance.get('/type-requests');
      const vacationType = typeResponse.data.find(
        (type) => type.type === 'Vacaciones'
      );

      const requestData = {
        ...leaveRequestData,
        type_id: vacationType ? vacationType.id : null,
        status_id: 1, // Estado por defecto "pendiente"
      };

      const response = await axiosInstance.post('/leave-requests', requestData);
      return response.data;
    } catch (error) {
      console.error('Error al crear solicitud de ausencia:', error);
      throw error;
    }
  },
};
