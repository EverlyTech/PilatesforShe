const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Events endpoint - Coming soon' });
});

module.exports = router;
