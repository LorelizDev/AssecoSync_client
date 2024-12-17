import axios from 'axios';
import { useAuthStore } from '../context/authStore';

const URL = 'http://localhost:8000/api/auth';

// Función para manejar errores de forma centralizada
const handleError = (error) => {
  if (error.response) {
    // Error de respuesta de la API
    console.error('Error en respuesta:', error.response.data);
    return error.response.data.message || 'Ocurrió un error en la API';
  } else if (error.request) {
    // Error en la solicitud (sin respuesta)
    console.error('No se recibió respuesta del servidor:', error.request);
    return 'No se recibió respuesta del servidor';
  } else {
    // Otro tipo de error (configuración, etc.)
    console.error('Error desconocido:', error.message);
    return error.message || 'Ocurrió un error desconocido';
  }
};

// Función de login
export const loginEmployee = async (data) => {
  try {
    const response = await axios.post(`${URL}/login`, data);

    // Validación de la respuesta del servidor
    if (response.status === 200 && response.data?.token) {
      useAuthStore.getState().setToken(response.data.token); // Guardar el token en Zustand
      console.log('Login exitoso');
      return { success: true, token: response.data.token };
    } else {
      const errorMessage =
        response.data?.message || 'No se proporcionó un mensaje';
      console.error('Error al iniciar sesión:', errorMessage);
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    const errorMessage = handleError(error);
    return { success: false, message: errorMessage };
  }
};

// Función de registro
export const registerEmployee = async (data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token de autenticación no encontrado');
    }

    const response = await axios.post(`${URL}/register`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Validación de la respuesta
    if (response.status === 201 && response.data) {
      console.log('Empleado registrado exitosamente');
      return {
        success: true,
        message: 'Empleado registrado exitosamente',
        data: response.data,
      };
    } else {
      const errorMessage =
        response.data?.message || 'Error al registrar al empleado';
      console.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    const errorMessage = handleError(error);
    return { success: false, message: errorMessage };
  }
};
