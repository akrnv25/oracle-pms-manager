const oracleApiService = require('../services/oracle-api.service');

class ProfilesController {
  get(req, res) {
    const profileId = req.params.profileId;
    const path = `/crm/v1/profiles/${profileId}`;
    const queryParams = { fetchInstructions: ['Communication', 'Profile'] };
    oracleApiService
      .get(path, queryParams)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }
}

module.exports = new ProfilesController();
