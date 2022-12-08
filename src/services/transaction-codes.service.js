const config = require('../config');
const oracleApiService = require('./oracle-api.service');

class TransactionCodesService {
  constructor() {}

  getAll() {
    const path = `/csh/v1/hotels/${config.hotelId}/transactionCodes`;
    const queryParams = { includeArticles: true };
    return oracleApiService.get(path, queryParams);
  }
}

module.exports = new TransactionCodesService();
