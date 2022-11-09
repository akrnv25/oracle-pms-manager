const express = require('express');

const router = express.Router();

// {{HostName}}/rsv/v1/hotels/{{HotelId}}/reservations
router.get('/', (req, res) => {
  res.status(200);
  res.json({ success: true });
});

module.exports = router;
