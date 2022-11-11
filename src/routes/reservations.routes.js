const express = require('express');
const reservationsController = require('../controllers/reservations.controller');

const router = express.Router();

router.get('/', reservationsController.getAll.bind(reservationsController));
router.post('/', reservationsController.create.bind(reservationsController));

module.exports = router;
