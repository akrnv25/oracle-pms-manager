const express = require('express');
const availabilityController = require('../controllers/availability.controller');
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/', bodyParser.json(), availabilityController.get.bind(availabilityController));

module.exports = router;
