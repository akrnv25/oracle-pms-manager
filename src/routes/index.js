const express = require('express');
const actionsRoutes = require('./actions.routes');
const workflowsRoutes = require('./workflows.routes');

const router = express.Router();

router.use('/actions', actionsRoutes);
router.use('/workflows', workflowsRoutes);

module.exports = router;
