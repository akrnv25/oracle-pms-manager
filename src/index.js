const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();
app.use(cors());
app.use('/api', authMiddleware, routes);

app.listen(config.port, () => {
  console.log(`App is listening on port ${config.port}`);
});
