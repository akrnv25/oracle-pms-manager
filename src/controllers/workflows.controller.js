const roomsService = require('../services/rooms.service');
const reservationsService = require('../services/reservations.service');
const availabilityService = require('../services/availability.service');

class WorkflowsController {
  checkIn(req, res) {
    availabilityService
      .get()
      .then(() => {
        return reservationsService.create();
      })
      .then(() => {
        return roomsService.getAll();
      })
      .then(() => {
        return reservationsService.assignRoom();
      })
      .then(() => {
        return reservationsService.checkIn();
      })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch(failedRes => {
        res.status(400).json(failedRes);
      });
  }
}

module.exports = new WorkflowsController();
