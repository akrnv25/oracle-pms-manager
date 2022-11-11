const express = require('express');
const profilesController = require('../controllers/profiles.controller');

const router = express.Router();

router.get('/:profileId', profilesController.get.bind(profilesController));

module.exports = router;
