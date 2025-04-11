const axios = require('axios');
const config = require('../config/config');

class ExternalApiService {
  static async callApi(requestData) {
    try {
      if (!requestData || Object.keys(requestData).length === 0) {
        throw new Error('Request body is empty');
      }

      const authString = Buffer.from(
        `${config.EXTERNAL_API.AUTH.username}:${config.EXTERNAL_API.AUTH.password}`
      ).toString('base64');

      const response = await axios.post(
        config.EXTERNAL_API.URL,
        requestData,
        {
          headers: {
            'Authorization': `Basic ${authString}`,
            'Content-Type': 'application/json',
          },
          timeout: config.EXTERNAL_API.TIMEOUT,
          responseType: 'json',
          validateStatus: function (status) {
            return status >= 200 && status < 300;
          }
        }
      );

      if (!response.data) {
        throw new Error('Empty response from external API');
      }

      return response.data;
    } catch (error) {
      console.error('External API error:', error);
      
      let statusCode = 500;
      let errorMessage = error.message;
      
      if (error.response) {
        statusCode = error.response.status;
        errorMessage = error.response.data || error.message;
      } else if (error.request) {
        errorMessage = 'No response received from external API';
      }
      
      throw {
        status: statusCode,
        message: errorMessage,
        details: error.config?.url ? `Failed to call ${error.config.url}` : undefined
      };
    }
  }
}

module.exports = ExternalApiService;