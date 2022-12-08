const roomsService = require('../services/rooms.service');
const reservationsService = require('../services/reservations.service');
const guestsService = require('../services/guests.service');
const profilesService = require('../services/profiles.service');
const availabilityService = require('../services/availability.service');
const businessEventsService = require('../services/business-events.service');

class ActionsController {
  getAvailability(req, res) {
    const { roomStayStartDate, roomStayEndDate, roomStayQuantity, ratePlanCode } = req.query;
    availabilityService
      .get(roomStayStartDate, roomStayEndDate, roomStayQuantity, ratePlanCode)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }

  createGuest(req, res) {
    const { givenName, surname } = req.body;
    guestsService
      .create(givenName, surname)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }

  getGuest(req, res) {
    const profileId = req.params.profileId;
    profilesService
      .get(profileId)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }

  getReservations(req, res) {
    const { givenName, surname } = req.query;
    reservationsService
      .getAll(givenName, surname)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }

  createReservation(req, res) {
    const { roomType, profileId, ratePlanCode, arrivalDate, departureDate } = req.body;
    reservationsService
      .create(roomType, profileId, ratePlanCode, arrivalDate, departureDate)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }

  checkIn(req, res) {
    const { roomId, reservationId } = req.body;
    reservationsService
      .checkIn(reservationId, roomId)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }

  assignRoom(req, res) {
    const { roomId, reservationId } = req.body;
    reservationsService
      .assignRoom(reservationId, roomId)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }

  getRooms(req, res) {
    const { roomType, hotelRoomStatus, hotelRoomFrontOfficeStatus } = req.query;
    roomsService
      .getAllByParams(roomType, hotelRoomStatus, hotelRoomFrontOfficeStatus)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }

  getBusinessEvents(req, res) {
    businessEventsService
      .getAll()
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }

  getFolio(req, res) {
    const reservationId = req.params.reservationId;
    reservationsService
      .getFolio(reservationId)
      .then(successRes => res.status(200).json(successRes))
      .catch(failedRes => res.status(400).json(failedRes));
  }
}

module.exports = new ActionsController();
