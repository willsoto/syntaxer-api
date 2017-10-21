const express = require('express');

const router = express.Router();

router.use('/atom', require('./atom'));
router.use('/sublime', require('./sublime'));

module.exports = router;
