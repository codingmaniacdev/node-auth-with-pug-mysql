// routes/index.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const dashboardController = require('../controllers/dashboardController');
const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');

router.get('/', usersController.index);
router.post('/authenticate', loginValidation, usersController.index);
router.get('/register', usersController.register);
router.post('/store',registerValidation, usersController.register);
router.get('/forgot-password', usersController.forgotPassword);

router.get('/delete/:id', usersController.remove)

router.get('/dashboard', dashboardController.index);


module.exports = router;
