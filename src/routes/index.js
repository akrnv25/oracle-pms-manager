const express = require('express');
const reservationsRoutes = require('./reservations.routes');
const roomsRoutes = require('./rooms.routes');

const router = express.Router();

router.use('/reservations', reservationsRoutes);
router.use('/rooms', roomsRoutes);

module.exports = router;
