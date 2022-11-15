const oracleApiService = require('../services/oracle-api.service');
const config = require('../config');

class RoomsController {
  getAll(req, res) {
    const { roomType, hotelRoomStatus, hotelRoomFrontOfficeStatus } = req.query;
    const queryParams = { roomType, hotelRoomStatus, hotelRoomFrontOfficeStatus };
    const path = `/fof/v0/hotels/${config.hotelId}/rooms`;
    oracleApiService
      .get(path, queryParams)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }
}

module.exports = new RoomsController();
