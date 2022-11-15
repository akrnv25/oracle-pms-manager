const oracleApiService = require('../services/oracle-api.service');

class ProfilesService {
  get(profileId) {
    const path = `/crm/v1/profiles/${profileId}`;
    const queryParams = { fetchInstructions: ['Communication', 'Profile'] };
    return oracleApiService.get(path, queryParams);
  }
}

module.exports = new ProfilesService();
