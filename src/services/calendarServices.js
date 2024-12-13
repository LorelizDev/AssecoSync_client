import axios from 'axios';

// Base URL for API requests
const BASE_URL = 'http://localhost:8000/api';

/**
 * Service layer for handling leave request operations
 */
export const calendarServices = {
  /**
   * Fetch all leave requests
   * @returns {Promise} Array of leave requests
   */
  getAllLeaveRequests: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/leave-requests`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      throw error;
    }
  },

  /**
   * Create a new leave request
   * @param {Object} leaveRequestData Leave request details
   * @returns {Promise} Created leave request
   */
  createLeaveRequest: async (leaveRequestData) => {
    try {
      // Buscar el ID real de tipo "Vacaciones"
      const typeResponse = await axios.get(`${BASE_URL}/type-requests`);
      const vacationType = typeResponse.data.find(
        (type) => type.type === 'Vacaciones'
      );

      const requestData = {
        ...leaveRequestData,
        type_id: vacationType ? vacationType.id : null, // Usar el ID numérico de vacaciones
        status_id: 1, // Default to pending status
      };

      const response = await axios.post(
        `${BASE_URL}/leave-requests`,
        requestData
      );
      return response.data;
    } catch (error) {
      console.error('Error creating leave request:', error);
      throw error;
    }
  },

  /**
   * Fetch leave request types
   * @returns {Promise} Array of leave request types
   */
  getLeaveRequestTypes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/type-requests`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leave request types:', error);
      throw error;
    }
  },
};
