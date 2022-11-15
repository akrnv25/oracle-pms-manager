const express = require('express');
const actionsController = require('../controllers/actions.controller');
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/availability', actionsController.getAvailability.bind(actionsController));
router.post('/guests', bodyParser.json(), actionsController.createGuest.bind(actionsController));
router.get(
  '/guests/:profileId',
  bodyParser.json(),
  actionsController.getGuest.bind(actionsController)
);
router.get('/reservations', actionsController.getReservations.bind(actionsController));
router.post(
  '/reservations',
  bodyParser.json(),
  actionsController.createReservation.bind(actionsController)
);
router.post('/check-in', bodyParser.json(), actionsController.checkIn.bind(actionsController));
router.post(
  '/assign-room',
  bodyParser.json(),
  actionsController.assignRoom.bind(actionsController)
);
router.get('/rooms', actionsController.getRooms.bind(actionsController));

module.exports = router;
