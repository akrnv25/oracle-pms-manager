const oracleApiService = require('../services/oracle-api.service');
const config = require('../config');

class RoomsService {
  getAll(roomType, hotelRoomStatus, hotelRoomFrontOfficeStatus) {
    const queryParams = { roomType, hotelRoomStatus, hotelRoomFrontOfficeStatus };
    const path = `/fof/v0/hotels/${config.hotelId}/rooms`;
    return oracleApiService.get(path, queryParams);
  }
}

module.exports = new RoomsService();
