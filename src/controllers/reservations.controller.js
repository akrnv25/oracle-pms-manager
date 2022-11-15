const oracleApiService = require('../services/oracle-api.service');
const config = require('../config');

class ReservationsController {
  getAll(req, res) {
    const path = `/rsv/v1/hotels/${config.hotelId}/reservations`;
    const { givenName, surname } = req.query;
    const queryParams = { givenName, surname };
    oracleApiService
      .get(path, queryParams)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }

  create(req, res) {
    const path = `/rsv/v1/hotels/${config.hotelId}/reservations`;
    const { roomType, profileId, ratePlanCode, arrivalDate, departureDate } = req.body;
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
              roomTypeCharged: roomType,
              ratePlanCode: ratePlanCode,
              roomType: roomType,
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

  checkIn(req, res) {
    const reservationId = req.params.reservationId;
    const path = `/fof/v1/hotels/${config.hotelId}/reservations/${reservationId}/checkIns`;
    const { roomId } = req.body;
    const data = {
      reservation: {
        roomId: roomId,
        ignoreWarnings: true,
        stopCheckin: false,
        printRegistration: false
      },
      fetchReservationInstruction: ['ReservationDetail'],
      includeNotifications: true
    };
    oracleApiService
      .post(path, data)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }

  assignRoom(req, res) {
    const reservationId = req.params.reservationId;
    const path = `/fof/v0/hotels/${config.hotelId}/reservations/${reservationId}/roomAssignments`;
    const { roomId } = req.body;
    const data = {
      criteria: {
        hotelId: config.hotelId,
        reservationIdList: [
          {
            id: reservationId,
            type: 'Reservation'
          }
        ],
        roomId: roomId,
        updateRoomTypeCharged: false,
        roomNumberLocked: true
      }
    };
    oracleApiService
      .post(path, data)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }
}

module.exports = new ReservationsController();
