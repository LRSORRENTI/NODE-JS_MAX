// const express = require('express')
// const { body } = require('express-validator/src/')


// const User = require('../models/user');

// const authController = require('../controllers/auth');

// const router = express.Router();

// router.put('/signup', [
//     // inside here we'll add an array of 
//     // validation related middleware 
//     body('email').isEmail().withMessage('Please enter \
//     a valid email')
//     .custom((value, {req}) => {
//         // this custom check will return a promise 
//         return User.findOne({email: value})
//         .then(userDoc => {
//             if(userDoc){
//                 return Promise.reject('Email already exists');
//             }
//         });
//     }).normalizeEmail(),
//     body('password').trim().isLength({min: 5}),
//     body('name').trim().not().isEmpty()
//     // above we add a check for min password length,
//     // 5 chars min 

//     // and we check the name as it shouldn't be empty

   
// ],
//     // and we'll use the authController as the final
//     // middleware
//         authController.signup
// )

// // Starting to implement User LOgin Routes:

// router.post('/login', authController.login);

// module.exports = router;

const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

router.post('/login', authController.login);

router.get('/status', isAuth, authController.getUserStatus);

router.patch(
  '/status',
  isAuth,
  [
    body('status')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.updateUserStatus
);

module.exports = router;
