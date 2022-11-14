const oracleApiService = require('../services/oracle-api.service');
const config = require('../config');

class GuestsController {
  create(req, res) {
    const path = '/crm/v1/guests';
    const { givenName, surname } = req.body;
    const data = {
      guestDetails: {
        customer: {
          personName: [
            {
              givenName: givenName,
              middleName: '',
              surname: surname,
              nameSuffix: '',
              nameTitle: '',
              envelopeGreeting: '',
              salutation: '',
              nameType: 'PRIMARY',
              language: 'E'
            }
          ],
          language: 'E',
          nationality: 'US'
        },
        profileType: 'GUEST',
        statusCode: 'ACTIVE',
        registeredProperty: config.hotelId,
        markForHistory: false
      }
    };
    oracleApiService
      .post(path, data)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }
}

module.exports = new GuestsController();
