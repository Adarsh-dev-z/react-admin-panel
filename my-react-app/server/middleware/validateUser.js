const { check } = require('express-validator');

exports.validateUserRegistration = [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('phone').isMobilePhone().withMessage('Invalid phone number'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
];
