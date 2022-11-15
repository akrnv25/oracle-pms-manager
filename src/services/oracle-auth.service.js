const axios = require('axios');
const config = require('../config');

class OracleAuthService {
  getTokens() {
    const method = 'post';
    const url = `${config.hostName}/oauth/v1/tokens`;
    const headers = this._prepareHeaders();
    const data = {
      grant_type: 'password',
      username: config.username,
      password: config.password
    };
    return axios({ method, url, headers, data })
      .then(r => ({ success: true, data: r.data }))
      .catch(e => this._handleError(e));
  }

  _prepareHeaders() {
    return {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `${config.authTokenType} ${config.authToken}`,
      'x-app-key': config.appKey
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

module.exports = new OracleAuthService();
