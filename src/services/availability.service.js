const oracleApiService = require('./oracle-api.service');
const config = require('../config');

class AvailabilityService {
  get(roomStayStartDate, roomStayEndDate, roomStayQuantity, ratePlanCode) {
    const path = `/par/v0/hotels/${config.hotelId}/availability`;
    const queryParams = {
      roomStayStartDate: roomStayStartDate,
      roomStayEndDate: roomStayEndDate,
      ratePlanCode: ratePlanCode,
      roomStayQuantity: roomStayQuantity,
      adults: 1,
      children: 0,
      limit: 10
    };
    return oracleApiService.get(path, queryParams);
  }
}

module.exports = new AvailabilityService();
