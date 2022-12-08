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
router.get('/business-events', actionsController.getBusinessEvents.bind(actionsController));
router.get('/folios/:reservationId', actionsController.getFolio.bind(actionsController));
router.get('/transaction-codes', actionsController.getTransactionCodes.bind(actionsController));
router.post('/charges', bodyParser.json(), actionsController.createCharge.bind(actionsController));

module.exports = router;
