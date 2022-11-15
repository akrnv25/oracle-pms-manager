const oracleApiService = require('../services/oracle-api.service');
const config = require('../config');

class GuestsService {
  create(givenName, surname) {
    const path = '/crm/v1/guests';
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
    return oracleApiService.post(path, data);
  }
}

module.exports = new GuestsService();
