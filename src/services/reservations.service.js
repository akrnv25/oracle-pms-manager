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

  update(reservationId, departureDate) {
    const path = `/rsv/v1/hotels/${config.hotelId}/reservations/${reservationId}`;
    const data = {
      reservations: [
        {
          reservationIdList: [
            {
              type: 'Reservation',
              id: reservationId
            }
          ],
          roomStay: {
            departureDate: departureDate
          },
          hotelId: config.hotelId
        }
      ]
    };
    return oracleApiService.put(path, data);
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

  getFolio(reservationId) {
    const path = `/csh/v0/hotels/${config.hotelId}/reservations/${reservationId}/folios`;
    const queryParams = {
      folioWindowNo: 1,
      fetchInstructions: ['Postings', 'Transactioncodes'],
      limit: 50
    };
    return oracleApiService.get(path, queryParams);
  }

  closeFolio(reservationId, profileId) {
    const path = `/csh/v0/hotels/${config.hotelId}/reservations/${reservationId}/folios`;
    const data = {
      criteria: {
        reservationId: {
          idContext: 'OPERA',
          id: reservationId,
          type: 'Reservation'
        },
        profileId: {
          idContext: 'OPERA',
          id: profileId,
          type: 'Profile'
        },
        fiscalFolioInstruction: 'New',
        allFolioWindow: false,
        folioQueue: {
          generateFiscalFolio: false
        },
        cashierId: 1000,
        hotelId: config.hotelId,
        eventType: 'CheckOut',
        folioWindowNo: 1,
        correction: false,
        debitFolio: false
      }
    };
    return oracleApiService.post(path, data);
  }

  checkOut(reservationId) {
    const path = `/csh/v0/hotels/${config.hotelId}/reservations/${reservationId}/checkOuts`;
    const data = {
      reservation: {
        reservationIdList: {
          id: reservationId,
          type: 'Reservation'
        },
        stopCheckout: false,
        cashierId: 3,
        hotelId: config.hotelId,
        eventType: 'CheckOut',
        autoCheckout: false,
        checkoutInstr: {
          roomStatus: 'Dirty',
          ignoreWarnings: true
        }
      },
      verificationOnly: false
    };
    return oracleApiService.post(path, data);
  }

  createPayment(reservationId, folioWindowNo, amount, currencyCode) {
    const path = `/csh/v0/hotels/${config.hotelId}/reservations/${reservationId}/payments`;
    const data = {
      criteria: {
        overrideInsufficientCC: false,
        applyCCSurcharge: false,
        vATOffset: false,
        reservationId: {
          idContext: 'OPERA',
          id: reservationId,
          type: 'Reservation'
        },
        paymentMethod: {
          paymentMethod: 'CA'
        },
        postingReference: 'CA Posting - Window 1',
        postingAmount: {
          amount: amount,
          currencyCode: currencyCode
        },
        cashierId: 1000,
        hotelId: config.hotelId,
        folioWindowNo: folioWindowNo,
        overrideARCreditLimit: false
      }
    };
    return oracleApiService.post(path, data);
  }
}

module.exports = new ReservationsService();
