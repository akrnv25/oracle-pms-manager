const oracleApiService = require('../services/oracle-api.service');
const config = require('../config');

class ReservationsController {
  getAll(req, res) {
    const path = `/rsv/v1/hotels/${config.hotelId}/reservations`;
    oracleApiService
      .get(path)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }
}

module.exports = new ReservationsController();
