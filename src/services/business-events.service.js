const oracleApiService = require('../services/oracle-api.service');
const config = require('../config');

class BusinessEventsService {
  constructor() {}

  getAll() {
    const path = `/int/v1/externalSystem/WIGI/hotels/${config.hotelId}/businessEvents`;
    return oracleApiService.get(path, {});
  }
}

module.exports = new BusinessEventsService();
