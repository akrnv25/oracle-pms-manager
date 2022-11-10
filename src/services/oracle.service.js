const axios = require('axios');
const config = require('../config');
const qs = require('qs');

class OracleService {
  get(path, queryParams) {
    const method = 'get';
    const queryParamsStr = qs.stringify(queryParams, { addQueryPrefix: true });
    const url = `${config.hostName}${path}${queryParamsStr}`;
    const headers = this._prepareHeaders();
    return axios({ method, url, headers })
      .then(({ data }) => ({ success: true, data }))
      .catch(e => this._handleError(e));
  }

  _prepareHeaders() {
    return {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'x-hotelid': config.hotelId,
      'x-app-key': config.appKey,
      'Authorization': `Bearer ${config.token}`
    };
  }

  _handleError(e) {
    const error = {
      code: e.response.status,
      message: e.response.data?.error ? e.response.data.error : e.response.statusText
    };
    return Promise.reject({ success: false, error });
  }
}

module.exports = new OracleService();
