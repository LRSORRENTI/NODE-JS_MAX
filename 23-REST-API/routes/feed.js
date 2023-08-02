const express = require('express');

// import the feed controller 
const feedController = require('../controllers/feed')

const router = express.Router();


// here is where we'll define some routes, first 
// to /posts where later on we'll have some posts 


router.get('/posts', feedController.getPosts)
// so the getposts method is the function that should 
// execute for this route, and we also need to register 
// this route in app.js 

module.exports = router;