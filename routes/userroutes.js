const express = require('express');
const router = express.Router(); 
const usercontroller = require('../controllers/usercontroller');

router.post('/login', usercontroller.loginuser);
router.post('/register', usercontroller.registeruser);

module.exports = router;  