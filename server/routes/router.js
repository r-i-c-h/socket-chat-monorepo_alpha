const express = require('express');
const router = express.Router();
const PORT = process.env.PORT || 5000;

router.get('/', (req, res) => {
  res.send({ response: `I am alive. I think you want to chat on port ${PORT}` }).status(200);
})

module.exports = router;