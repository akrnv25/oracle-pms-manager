const express = require('express');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(cors());

app.listen(config.port, () => {
  console.log(`App is listening on port ${config.port}`);
});
