const { body }  = require('express-validator');

const loginValidation = [
    body('email').isEmail().withMessage('Email is required and it must be valid'),
    body('password').notEmpty().withMessage('Please enter a valid password'),
];

module.exports = loginValidation;