const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/errorMiddleware');
const { addTweet, getTweets } = require('../controllers/tweetController');

// maybe change name to ticker symbol instead

// get all tweets relating to a ticker symbol
router.get('/:stock', getTweets);
// add a tweet for a given stock
router.post('/addTweet', addTweet);

module.exports = router;
