import axios from 'axios';

// Base URL for API requests
const BASE_URL = 'http://localhost:3001';

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
      const response = await axios.get(`${BASE_URL}/LeaveRequest`);
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
      const response = await axios.post(`${BASE_URL}/LeaveRequest`, {
        ...leaveRequestData,
        status_id: 1, // Default to pending status
      });
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
      const response = await axios.get(`${BASE_URL}/TypeRequest`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leave request types:', error);
      throw error;
    }
  },
};
