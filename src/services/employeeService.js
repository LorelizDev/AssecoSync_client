import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';
const URL = 'http://localhost:8000/api/employees';

export const getAllEmployees = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al traer los empleados:', error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el empleado:', error);
    throw error;
  }
};

export const updateEmployee = async (id, updatedData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error al actualizar el empleado:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al borrar el empleado:', error);
    throw error;
  }
};

export const leaveRequestService = {
  getAllLeaveRequestsWithEmployees: async (token) => {
    try {
      // Obtener las solicitudes de ausencia
      const leaveRequestsResponse = await axios.get(
        `${BASE_URL}/leave-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Obtener todos los empleados
      const employeesResponse = await axios.get(`${BASE_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
      console.error('Error fetching leave requests with employees:', error);
      throw error;
    }
  },
};
