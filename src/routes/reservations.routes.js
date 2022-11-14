const express = require('express');
const reservationsController = require('../controllers/reservations.controller');
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/', reservationsController.getAll.bind(reservationsController));
router.post('/', bodyParser.json(), reservationsController.create.bind(reservationsController));

module.exports = router;
