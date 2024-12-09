import axios from 'axios';

const axiosInstance = axios.create({
  URL: 'http://localhost:8000/api/auth',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  },
});

const handleError = (error) => {
  if (error.response) {
    console.error('Error de respuesta:', error.response.data);
    console.error('Código de estado:', error.response.status);
  } else if (error.request) {
    console.error('Error de solicitud:', error.request);
  } else {
    console.error('Error al configurar la solicitud:', error.message);
  }
  throw error;
};

export const registerEmployee = async (data) => {
  try {
    // Enviar solicitud de registro
    const token = localStorage.getItem('authToken');
    const response = await axios.post(`${URL}/register`, data
      , {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }

    );

    return { success: true, data: response.data };
  } catch (error) {
    let errorMessage;

    if (error.response) {
      if (error.response.status === 400) {
        errorMessage =
          "Los datos ingresados no son válidos. Por favor, revisa el formulario.";
      } else if (error.response.status === 409) {
        errorMessage =
          "Este usuario ya está registrado. Intenta iniciar sesión.";
      } else {
        errorMessage =
          "Ocurrió un problema al registrarse. Inténtalo nuevamente.";
      }
    } else if (error.request) {
      // Errores de red
      errorMessage =
        "No se pudo conectar con el servidor. Verifica tu conexión a Internet.";
    } else {
      errorMessage = "Ocurrió un error inesperado. Inténtalo más tarde.";
    }

    console.error("Error al registrarse:", errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const getEmployees = async () => {
  try {
    const { data } = await axiosInstance.get('/');
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getEmployeeById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createNewEmployee = async (employeeData) => {
  try {
    const { data } = await axiosInstance.post('/', employeeData);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateEmployee = async (id, updatedData) => {
  try {
    const { data } = await axiosInstance.put(`/${id}`, updatedData);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteEmployee = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
