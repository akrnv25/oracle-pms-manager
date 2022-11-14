const config = require('../config');
const oracleApiService = require('../services/oracle-api.service');

class AvailabilityController {
  get(req, res) {
    const path = `/par/v0/hotels/${config.hotelId}/availability`;
    const { roomStayStartDate, roomStayEndDate, roomStayQuantity, ratePlanCode } = req.body;
    const queryParams = {
      roomStayStartDate: roomStayStartDate,
      roomStayEndDate: roomStayEndDate,
      ratePlanCode: ratePlanCode,
      roomStayQuantity: roomStayQuantity,
      adults: 1,
      children: 0,
      limit: 10
    };
    oracleApiService
      .get(path, queryParams)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }
}

module.exports = new AvailabilityController();
