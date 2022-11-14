const oracleApiService = require('../services/oracle-api.service');
const config = require('../config');

class ReservationsController {
  getAll(req, res) {
    const path = `/rsv/v1/hotels/${config.hotelId}/reservations`;
    oracleApiService
      .get(path)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }

  create(req, res) {
    const path = `/rsv/v1/hotels/${config.hotelId}/reservations`;
    const { roomTypeCode, profileId, ratePlanCode, arrivalDate, departureDate } = req.body;
    const data = {
      reservations: {
        reservation: {
          reservationGuests: {
            profileInfo: {
              profileIdList: {
                id: profileId,
                type: 'Profile'
              }
            }
          },
          reservationPaymentMethods: {
            paymentMethod: 'CA'
          },
          markAsRecentlyAccessed: true,
          hotelId: config.hotelId,
          reservationStatus: 'Reserved',
          roomStay: {
            guarantee: {
              onHold: false,
              guaranteeCode: '6PM'
            },
            roomRates: {
              numberOfUnits: 1,
              rates: {
                rate: {
                  start: arrivalDate,
                  end: departureDate,
                  base: {
                    amountBeforeTax: 200,
                    currencyCode: 'USD'
                  }
                }
              },
              start: arrivalDate,
              end: departureDate,
              marketCode: 'LEISURE',
              sourceCode: 'PHONE',
              roomTypeCharged: roomTypeCode,
              ratePlanCode: ratePlanCode,
              roomType: roomTypeCode,
              pseudoRoom: false
            },
            guestCounts: {
              children: 0,
              adults: 1
            },
            arrivalDate: arrivalDate,
            departureDate: departureDate
          }
        }
      }
    };
    oracleApiService
      .post(path, data)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }
}

module.exports = new ReservationsController();
