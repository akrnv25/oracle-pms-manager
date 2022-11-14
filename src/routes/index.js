const express = require('express');
const reservationsRoutes = require('./reservations.routes');
const guestsRoutes = require('./guests.routes');
const profilesRoutes = require('./profiles.routes');
const availabilityRoutes = require('./avialability.routes');

const router = express.Router();

router.use('/reservations', reservationsRoutes);
router.use('/guests', guestsRoutes);
router.use('/profiles', profilesRoutes);
router.use('/availability', availabilityRoutes);

module.exports = router;
