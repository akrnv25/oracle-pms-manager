const oracleApiService = require('../services/oracle-api.service');
const config = require('../config');

class RoomsService {
  getAllByParams(
    roomType,
    hotelRoomStatus,
    hotelRoomFrontOfficeStatus,
    hotelRoomStartDate,
    hotelRoomEndDate
  ) {
    const queryParams = {
      roomType,
      hotelRoomStatus,
      hotelRoomFrontOfficeStatus,
      hotelRoomStartDate,
      hotelRoomEndDate
    };
    const path = `/fof/v0/hotels/${config.hotelId}/rooms`;
    return oracleApiService.get(path, queryParams);
  }
}

module.exports = new RoomsService();
