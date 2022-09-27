const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.route('/register').post(userController.registerUser);
router.route('/login').post(userController.loginUser);
router.route('/logout').post(userController.logoutUser);
module.exports = router;
