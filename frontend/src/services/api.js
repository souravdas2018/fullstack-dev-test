import axios from 'axios';

// Create an Axios instance with default config for API calls
const api = axios.create({
  baseURL: '/api',           // Base URL for all API requests
  timeout: 5000,             // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json'  // Default request content type
  }
});

export const videoService = {
  /**
   * Fetch top videos, limited by a number (default 5)
   * @param {number} limit - Number of top videos to fetch
   * @returns {Promise<Object>} Response data containing top videos
   */
  async getTopVideos(limit = 5) {
    const response = await api.get(`/videos/top?limit=${limit}`);
    return response.data;
  },

  /**
   * Fetch daily statistics for videos
   * @returns {Promise<Object>} Response data containing daily stats
   */
  async getDailyStats() {
    const response = await api.get('/videos/daily-stats');
    return response.data;
  },

  /**
   * Fetch data used to render bubble charts
   * @returns {Promise<Object>} Response data for bubble chart
   */
  async getBubbleChartData() {
    const response = await api.get('/videos/bubble-chart');
    return response.data;
  },

  /**
   * Fetch overall statistics for videos
   * @returns {Promise<Object>} Response data containing overall stats
   */
  async getOverallStats() {
    const response = await api.get('/videos/overall-stats');
    return response.data;
  }
};

export default api;
