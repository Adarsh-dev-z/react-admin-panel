const { check } = require('express-validator');

exports.validateUserRegistration = [
  check('username')
    .trim()  // Removes leading/trailing spaces
    .notEmpty().withMessage('Username is required')
    .custom(value => value.trim() !== '').withMessage('Username cannot contain only spaces'),
  
  check('email')
    .trim()  // Removes leading/trailing spaces
    .isEmail().withMessage('Invalid email address')
    .custom(value => value.trim() !== '').withMessage('Email cannot contain only spaces'),

  check('phone')
    .trim()  // Removes leading/trailing spaces
    .isMobilePhone().withMessage('Invalid phone number')
    .custom(value => value.trim() !== '').withMessage('Phone number cannot contain only spaces'),

  check('password')
    .trim()  // Removes leading/trailing spaces
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
    .custom(value => value.trim() !== '').withMessage('Password cannot contain only spaces'),
];
