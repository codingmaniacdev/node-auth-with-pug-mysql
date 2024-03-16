const { body }  = require('express-validator');

const validate = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
    body('confirm_password').notEmpty().withMessage('Please confirm your password'),
    body('confirm_password').custom((password, {req}) => {
        if(password !== req.body.password) {
            throw new Error('Please confirm your password')
        }
        return true;
    })
];

module.exports = validate;