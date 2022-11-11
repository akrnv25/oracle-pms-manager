const express = require('express');
const guestsController = require('../controllers/guests.controller');
const bodyParser = require('body-parser');

const router = express.Router();

router.post('/', bodyParser.json(), guestsController.create.bind(guestsController));

module.exports = router;
