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

  create(req, res) {
    const path = `/rsv/v1/hotels/${config.hotelId}/reservations`;
    const data = {}; // todo: need read docs
    oracleApiService
      .post(path, data)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }
}

module.exports = new ReservationsController();
