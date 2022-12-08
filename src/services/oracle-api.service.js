const axios = require('axios');
const config = require('../config');
const qs = require('qs');
const storageService = require('./storage.service');
const storageKeys = require('../consts/storage-keys');

class OracleApiService {
  get(path, queryParams) {
    const method = 'get';
    const preparedQueryParams = this._prepareQueryParams(queryParams);
    const url = `${config.hostName}${path}${preparedQueryParams}`;
    const headers = this._prepareHeaders();
    return axios({ method, url, headers })
      .then(r => ({ success: true, data: r.data }))
      .catch(e => this._handleError(e));
  }

  post(path, data) {
    const method = 'post';
    const url = `${config.hostName}${path}`;
    const headers = this._prepareHeaders();
    return axios({ method, url, headers, data })
      .then(r => ({ success: true, data: r.data }))
      .catch(e => this._handleError(e));
  }

  put(path, data) {
    const method = 'put';
    const url = `${config.hostName}${path}`;
    const headers = this._prepareHeaders();
    return axios({ method, url, headers, data })
      .then(r => ({ success: true, data: r.data }))
      .catch(e => this._handleError(e));
  }

  _prepareQueryParams(queryParams) {
    const checkedQueryParams =
      queryParams &&
      Object.keys(queryParams).reduce((acc, key) => {
        if (queryParams[key] !== '') {
          acc[key] = queryParams[key];
        }
        return acc;
      }, {});
    return qs.stringify(checkedQueryParams, {
      addQueryPrefix: true,
      arrayFormat: 'repeat',
      skipNulls: true
    });
  }

  _prepareHeaders() {
    const token = storageService.getItem(storageKeys.TOKEN);
    const tokenType = storageService.getItem(storageKeys.TOKEN_TYPE);
    return {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'x-hotelid': config.hotelId,
      'x-app-key': config.appKey,
      'Authorization': `${tokenType} ${token}`
    };
  }

  _handleError(e) {
    const error = {
      code: e.response.status,
      message: e.response.statusText
    };
    const data = e.response.data;
    return Promise.reject({ success: false, error, data });
  }
}

module.exports = new OracleApiService();
