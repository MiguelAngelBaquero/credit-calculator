const ExternalApiService = require('../services/externalApiService');

class ProxyController {
  static async proxyRequest(req, res) {
    try {
      const response = await ExternalApiService.callApi(req.body);
      res.json(response);
    } catch (error) {
      res.status(error.status || 500).json({ 
        error: error.message,
        details: error.details
      });
    }
  }
}

module.exports = ProxyController;