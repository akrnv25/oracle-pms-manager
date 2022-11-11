const express = require('express');
const guestsController = require('../controllers/guests.controller');

const router = express.Router();

router.post('/', guestsController.create.bind(guestsController));

module.exports = router;
