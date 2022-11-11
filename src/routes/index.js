const express = require('express');
const reservationsRoutes = require('./reservations.routes');
const roomsRoutes = require('./rooms.routes');
const guestsRoutes = require('./guests.routes');
const profilesRoutes = require('./profiles.routes');

const router = express.Router();

router.use('/reservations', reservationsRoutes);
router.use('/rooms', roomsRoutes);
router.use('/guests', guestsRoutes);
router.use('/profiles', profilesRoutes);

module.exports = router;
