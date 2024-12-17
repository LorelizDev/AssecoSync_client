import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';
const URL = 'http://localhost:8000/api/employees';

const handleError = (error) => {
  if (error.response) {
    // Error con la respuesta del servidor
    console.error('Error en la respuesta:', error.response.data);
    return `Error del servidor: ${error.response.data?.message || 'Error desconocido'}`;
  } else if (error.request) {
    // Error en la solicitud (sin respuesta)
    console.error('No se recibió respuesta del servidor:', error.request);
    return 'No se recibió respuesta del servidor. Por favor, intente nuevamente.';
  } else {
    // Error en la configuración de la solicitud
    console.error('Error en la solicitud:', error.message);
    return `Error: ${error.message}`;
  }
};

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('El token de autenticación no está disponible.');
  }
  return token;
};

export const getAllEmployees = async () => {
  try {
    const token = getToken();
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error('No se recibieron datos de empleados.');
    }

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error al traer los empleados:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const getEmployeeById = async (id) => {
  try {
    const token = getToken();
    const response = await axios.get(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error('No se recibió información del empleado.');
    }

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error al obtener el empleado:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateEmployee = async (id, updatedData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error('No se recibió respuesta al actualizar el empleado.');
    }

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error al actualizar el empleado:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const deleteEmployee = async (id) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error('No se recibió respuesta al borrar el empleado.');
    }

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Error al borrar el empleado:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const leaveRequestService = {
  getAllLeaveRequestsWithEmployees: async (token) => {
    try {
      if (!token) {
        throw new Error('El token de autenticación es necesario.');
      }

      const leaveRequestsResponse = await axios.get(
        `${BASE_URL}/leave-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const employeesResponse = await axios.get(`${BASE_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Verificar que las respuestas contienen datos
      if (!leaveRequestsResponse.data || !employeesResponse.data) {
        throw new Error(
          'No se recibieron datos de solicitudes de ausencia o empleados.'
        );
      }

      // Relacionar los empleados con las solicitudes de ausencia
      const leaveRequests = leaveRequestsResponse.data.map((request) => {
        const employee = employeesResponse.data.find(
          (emp) => emp.id === request.employeeId
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
        'Error al obtener solicitudes de ausencia con empleados:',
        errorMessage
      );
      throw new Error(errorMessage);
    }
  },
};
