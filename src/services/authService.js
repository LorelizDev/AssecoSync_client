import axios from 'axios';
import { useAuthStore } from '../context/authStore';

const URL = 'http://localhost:8000/api/auth';

export const loginEmployee = async (data) => {
  try {
    const response = await axios.post(`${URL}/login`, data);

    // Verificar la respuesta del servidor
    if (response.status === 200 && response.data?.token) {
      useAuthStore.getState().setToken(response.data.token); // Guardar el token en Zustand
      console.log('Login exitoso');
      return { success: true, token: response.data.token };
    } else {
      console.error('Error al iniciar sesión:', response.data?.message || 'No se proporcionó un mensaje');
      return { success: false, message: response.data?.message };
    }
  } catch (error) {
    console.error('Error al conectar con el servidor:', error);
    return { success: false, message: error.message };
  }
};

export const registerEmployee = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${URL}/register`, data, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return {
      success: true,
      message: 'Empleado registrado exitosamente',
      data: response.data
    };
  } catch (error) {
    console.error("Error al registrar el nuevo empleado:", error.response?.data || error.message);
    throw error;
  }
};





