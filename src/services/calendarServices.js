import axios from 'axios';

// URL base para solicitudes API
const BASE_URL = 'http://localhost:8000/api';

const createAxiosInstance = (token) => {
  if (!token) {
    throw new Error('El token de autenticación es requerido.');
  }
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleError = (error) => {
  if (error.response) {
    // Respuesta del servidor con error
    console.error('Error de respuesta:', error.response.data);
    return `Error del servidor: ${error.response.data?.message || 'Error desconocido'}`;
  } else if (error.request) {
    // No se recibió respuesta del servidor
    console.error('No se recibió respuesta del servidor:', error.request);
    return 'No se recibió respuesta del servidor. Por favor, intente nuevamente.';
  } else {
    // Error en la configuración de la solicitud
    console.error('Error en la solicitud:', error.message);
    return `Error: ${error.message}`;
  }
};

export const calendarServices = {
  getAllLeaveRequests: async (token) => {
    try {
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.get('/leave-requests');
      return response.data || []; // Aseguramos que siempre se retorne un array vacío si no hay datos
    } catch (error) {
      const errorMessage = handleError(error);
      console.error('Error al obtener solicitudes de ausencia:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  getLeaveRequestTypes: async (token) => {
    try {
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.get('/type-requests');
      return response.data || []; // Aseguramos que siempre se retorne un array vacío si no hay datos
    } catch (error) {
      const errorMessage = handleError(error);
      console.error('Error al obtener tipos de solicitudes:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  getLeaveRequestTypeById: async (typeId, token) => {
    try {
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.get(`/type-requests/${typeId}`);
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error('Error al obtener el tipo de solicitud:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  createLeaveRequest: async (leaveRequestData, token) => {
    try {
      const axiosInstance = createAxiosInstance(token);

      // Obtener el ID del tipo de vacaciones
      const typeResponse = await axiosInstance.get('/type-requests');
      if (!typeResponse.data || typeResponse.data.length === 0) {
        throw new Error('No se encontraron tipos de solicitud disponibles.');
      }

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

      const response = await axiosInstance.post('/leave-requests', requestData);
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error('Error al crear solicitud de ausencia:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  getAllLeaveRequestsWithEmployees: async (token) => {
    try {
      const axiosInstance = createAxiosInstance(token);

      const leaveRequestsResponse = await axiosInstance.get('/leave-requests');
      const employeesResponse = await axiosInstance.get('/employees');

      // Validación de que las respuestas contienen datos
      if (!leaveRequestsResponse.data || !employeesResponse.data) {
        throw new Error('Datos incompletos en la respuesta del servidor.');
      }

      // Relacionar los empleados con las solicitudes de ausencia
      const leaveRequests = leaveRequestsResponse.data.map((request) => {
        const employee = employeesResponse.data.find(
          (emp) => emp.id === request.employeeId // Relacionamos por id del empleado
        );
        return {
          ...request,
          employee,
        };
      });
      return leaveRequests;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error(
        'Error al obtener las solicitudes de ausencia con empleados:',
        errorMessage
      );
      throw new Error(errorMessage);
    }
  },

  updateLeaveRequestStatus: async (requestId, statusId, token) => {
    try {
      const axiosInstance = createAxiosInstance(token);
      const response = await axiosInstance.patch(
        `/leave-requests/${requestId}`,
        { statusId }
      );
      return response.data;
    } catch (error) {
      const errorMessage = handleError(error);
      console.error(
        'Error al actualizar la solicitud de ausencia:',
        errorMessage
      );
      throw new Error(errorMessage);
    }
  },
};
