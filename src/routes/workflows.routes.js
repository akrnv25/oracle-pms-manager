const express = require('express');
const workflowsController = require('../controllers/workflows.controller');
const bodyParser = require('body-parser');

const router = express.Router();

router.post('/check-in', bodyParser.json(), workflowsController.checkIn.bind(workflowsController));
router.post(
  '/check-out',
  bodyParser.json(),
  workflowsController.checkOut.bind(workflowsController)
);
router.post('/charge', bodyParser.json(), workflowsController.charge.bind(workflowsController));

module.exports = router;
