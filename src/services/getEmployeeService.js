import axios from 'axios';

    const URL = 'http://localhost:8000/api/external/employees'
    const headers=  {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    }

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

    export const getEmployeeByIdFromExternalDb = async (id) => {
        console.log(headers)
        try {
        const { data } = await axios.get(`${URL}/${id}`, headers
        );
        console.log(data)
        return data;
        } catch (error) {
        handleError(error);
        }
    };