const roomsService = require('../services/rooms.service');
const reservationsService = require('../services/reservations.service');
const availabilityService = require('../services/availability.service');
const uniq = require('../utilities/uniq');

class WorkflowsController {
  checkIn(req, res) {
    const { profileId, arrivalDate, departureDate, roomStayQuantity } = req.body;
    let ratePlanCode = 'RACK-TAX';
    let hotelRoomStatus = 'Inspected';
    let hotelRoomFrontOfficeStatus = 'Vacant';
    let roomType;
    let reservationId;
    let roomId;
    // 1. Request available rooms for given dates
    availabilityService
      .get(arrivalDate, departureDate, roomStayQuantity, ratePlanCode)
      .then(availabilityRes => {
        const roomRates =
          (availabilityRes?.data?.hotelAvailability &&
            availabilityRes?.data?.hotelAvailability[0] &&
            availabilityRes?.data?.hotelAvailability[0].roomStays &&
            availabilityRes?.data?.hotelAvailability[0].roomStays[0] &&
            availabilityRes?.data?.hotelAvailability[0].roomStays[0].roomRates) ??
          [];
        const roomTypes = uniq(roomRates.map(roomRate => roomRate?.roomType));
        if (roomTypes?.length === 0) {
          throw new Error('Not available rooms');
        }
        // 2. We will place the guest in the first of the available room types
        roomType = roomTypes[0];
      })
      .then(() => {
        // 3. Create a reservation for a room of the selected type for a guest
        return reservationsService
          .create(roomType, profileId, ratePlanCode, arrivalDate, departureDate)
          .then(reservationRes => {
            const link =
              (reservationRes?.data?.links &&
                reservationRes?.data?.links[0] &&
                reservationRes?.data?.links[0].href) ??
              '';
            const linkChips = link.split('/').reverse();
            reservationId = linkChips.length && linkChips[0];
            if (!reservationId) {
              throw new Error('Unsuccessful attempt to reserve a room');
            }
          });
      })
      .then(() => {
        // 4. We request available rooms of the selected type for the selected dates
        return roomsService
          .getAllByParams(
            roomType,
            hotelRoomStatus,
            hotelRoomFrontOfficeStatus,
            arrivalDate,
            departureDate
          )
          .then(roomsRes => {
            // 5. We will place the guest in the first of the received available rooms
            roomId =
              roomsRes?.data?.hotelRoomsDetails?.room &&
              roomsRes?.data?.hotelRoomsDetails?.room[0] &&
              roomsRes?.data?.hotelRoomsDetails?.room[0].roomId;
            if (!roomId) {
              throw new Error('There are no available rooms to assign to the reservation');
            }
          });
      })
      .then(() => {
        // 6. We assign the selected room to the reservation
        return reservationsService.assignRoom(reservationId, roomId);
      })
      .then(() => {
        // 7. We perform guest check-in. Check-in is possible only on the same day with a reservation
        return reservationsService.checkIn(reservationId, roomId);
      })
      .then(() => {
        const data = {
          profileId,
          arrivalDate,
          departureDate,
          ratePlanCode,
          roomType,
          reservationId,
          roomId
        };
        const successRes = { success: true, data };
        res.status(200);
        res.json(successRes);
      })
      .catch(failedRes => {
        res.status(400);
        res.json(failedRes);
      });
  }

  checkOut(req, res) {
    const { reservationId, profileId, departureDate } = req.body;
    // 1. Checkout is available only on the day specified in the reservation. Update the departure date in the reservation
    reservationsService
      .update(reservationId, departureDate)
      .then(() => {
        // 2. Request all user folios (guest invoices)
        return reservationsService.getFolio(reservationId);
      })
      .then(folioRes => {
        const folioWindows = folioRes?.data?.reservationFolioInformation?.folioWindows ?? [];
        // 3. Filtering invoices that the user must pay
        const folioWindowsToPayment = folioWindows.filter(
          folioWindow => folioWindow.balance.amount > 0
        );
        // 4. Create invoice payment requests for each unpaid folio
        const createPayments$ = folioWindowsToPayment.map(folioWindow => {
          const folioWindowNo = folioWindow.folioWindowNo;
          const amount = folioWindow.balance.amount;
          const currencyCode = folioWindow.balance.currencyCode;
          return reservationsService.createPayment(
            reservationId,
            folioWindowNo,
            amount,
            currencyCode
          );
        });
        return Promise.all(createPayments$);
      })
      .then(() => {
        // 5. After paying for all folios, close them
        return reservationsService.closeFolio(reservationId, profileId);
      })
      .then(() => {
        // 6. Guest checkout
        return reservationsService.checkOut(reservationId);
      })
      .then(() => {
        res.status(200);
        res.json({ success: true });
      })
      .catch(failedRes => {
        res.status(400);
        res.json(failedRes);
      });
  }

  charge(req, res) {
    const { reservationId, transactionCode, amount, currencyCode, quantity, product, cashierId } =
      req.body;
    // 1. Create charge
    reservationsService
      .createCharge(
        reservationId,
        transactionCode,
        amount,
        currencyCode,
        quantity,
        product,
        cashierId
      )
      .then(() => {
        // 2. Return guest folio
        return reservationsService.getFolio(reservationId);
      })
      .then(folioRes => {
        res.status(200);
        res.json(folioRes);
      })
      .catch(failedRes => {
        res.status(400);
        res.json(failedRes);
      });
  }
}

module.exports = new WorkflowsController();
