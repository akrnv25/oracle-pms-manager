const oracleApiService = require('../services/oracle-api.service');
const config = require('../config');

class ReservationsService {
  getAll(givenName, surname) {
    const path = `/rsv/v1/hotels/${config.hotelId}/reservations`;
    const queryParams = { givenName, surname };
    return oracleApiService.get(path, queryParams);
  }

  create(roomType, profileId, ratePlanCode, arrivalDate, departureDate) {
    const path = `/rsv/v1/hotels/${config.hotelId}/reservations`;
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
    return oracleApiService.post(path, data);
  }

  checkIn(reservationId, roomId) {
    const path = `/fof/v1/hotels/${config.hotelId}/reservations/${reservationId}/checkIns`;
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
    return oracleApiService.post(path, data);
  }

  assignRoom(reservationId, roomId) {
    const path = `/fof/v0/hotels/${config.hotelId}/reservations/${reservationId}/roomAssignments`;
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
    return oracleApiService.post(path, data);
  }
}

module.exports = new ReservationsService();
