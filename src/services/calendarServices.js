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

  getLeaveRequestTypeById: async (typeId, token) => {
    try {
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.get(`/type-requests/${typeId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el tipo de solicitud:', error);
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

      // Log de los datos iniciales recibidos
      console.log(
        'Datos iniciales recibidos en el servicio:',
        leaveRequestData
      );

      // Obtener el ID del tipo de vacaciones
      const typeResponse = await axiosInstance.get('/type-requests');
      console.log('Respuesta de /type-requests:', typeResponse.data);

      const vacationType = typeResponse.data.find(
        (type) => type.type === 'Vacaciones'
      );

      if (!vacationType) {
        throw new Error('No se encontró el tipo de solicitud "Vacaciones".');
      }

      const requestData = {
        ...leaveRequestData,
        statusId: 1, // Estado por defecto "pendiente"
      };

      // Log para verificar los datos finales enviados al backend
      console.log('Datos enviados al backend:', requestData);

      const response = await axiosInstance.post('/leave-requests', requestData);

      // Log para confirmar la respuesta del backend
      console.log(
        'Respuesta del backend al crear la solicitud:',
        response.data
      );

      return response.data;
    } catch (error) {
      console.error('Error al crear solicitud de ausencia:', error);

      if (error.response) {
        // Log adicional para depurar la respuesta del backend
        console.error('Respuesta del backend con error:', error.response.data);
      }

      throw error;
    }
  },
  // Obtener todas las solicitudes de ausencia con los empleados relacionados
  getAllLeaveRequestsWithEmployees: async (token) => {
    try {
      const axiosInstance = createAxiosInstance(token);

      // Obtener las solicitudes de ausencia
      const leaveRequestsResponse = await axiosInstance.get('/leave-requests');

      // Obtener todos los empleados
      const employeesResponse = await axiosInstance.get('/employees');

      // Relacionar los empleados con las solicitudes de ausencia
      const leaveRequests = leaveRequestsResponse.data.map((request) => {
        const employee = employeesResponse.data.find(
          (emp) => emp.id === request.employeeId // Relacionamos por id del empleado
        );
        return {
          ...request,
          employee, // Asociamos los datos del empleado con la solicitud
        };
      });
      return leaveRequests;
    } catch (error) {
      console.error(
        'Error al obtener las solicitudes de ausencia con empleados:',
        error
      );
      throw error;
    }
  },

  // Actualizar el estado de la solicitud de ausencia (Aprobar/Rechazar)
  updateLeaveRequestStatus: async (requestId, statusId, token) => {
    try {
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.patch(
        `/leave-requests/${requestId}`,
        {
          statusId,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la solicitud de ausencia:', error);
      throw error;
    }
  },
};
