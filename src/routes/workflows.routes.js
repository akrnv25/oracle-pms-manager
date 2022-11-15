const express = require('express');
const workflowsController = require('../controllers/workflows.controller');

const router = express.Router();

router.post('/check-in', workflowsController.checkIn.bind(workflowsController));

module.exports = router;
