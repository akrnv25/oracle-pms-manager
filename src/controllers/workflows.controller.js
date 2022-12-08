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
        roomType = roomTypes[0];
      })
      .then(() => {
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
        return roomsService
          .getAllByParams(
            roomType,
            hotelRoomStatus,
            hotelRoomFrontOfficeStatus,
            arrivalDate,
            departureDate
          )
          .then(roomsRes => {
            roomId =
              roomsRes?.data?.hotelRoomsDetails?.room &&
              roomsRes?.data?.hotelRoomsDetails?.room[0] &&
              roomsRes?.data?.hotelRoomsDetails?.room[0].roomId;
            if (!roomId) {
              throw new Error('There are no available rooms to assign to the reservation');
            }
          });
      })
      .then(() => reservationsService.assignRoom(reservationId, roomId))
      .then(() => reservationsService.checkIn(reservationId, roomId))
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
}

module.exports = new WorkflowsController();
