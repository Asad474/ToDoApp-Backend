const express = require('express');
const router = express.Router();
const refreshtokencontrollers = require('../controllers/refreshtokencontroller');

router.route('/')
    .post(refreshtokencontrollers.newAccessToken)
    .delete(refreshtokencontrollers.logout);

module.exports = router;