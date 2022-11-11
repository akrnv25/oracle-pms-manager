const oracleApiService = require('../services/oracle-api.service');

class GuestsController {
  create(req, res) {
    const url = '/crm/v1/guests';
    const data = {};
    oracleApiService
      .post(url, data)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }
}

module.exports = new GuestsController();
