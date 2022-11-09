const express = require('express');
const reservationsRoutes = require('./reservations.routes');

const router = express.Router();

router.use('/reservations', reservationsRoutes);

module.exports = router;
