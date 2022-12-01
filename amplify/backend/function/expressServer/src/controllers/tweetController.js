const Stock = require('../models/stock.model');
const Tweet = require('../models/tweet.model');

// @desc Add new tweet data
// @route POST /api/tweet/addTweet
// @access Public

const addTweet = async (req, res, next) => {
  try {
    const newTweet = new Tweet({
      id: req.body.id,
      stock: req.body.stock,
      date: req.body.date,
      username: req.body.username,
      content: req.body.content,
    });

    const tweet = await newTweet.save();

    res.json({ tweet });
  } catch (err) {
    console.error(err.message);
    res.status(500)
    res.errormessage = 'Server error in add Tweet';
    return next(err);
  }
};

// @desc Get tweets by stock symbol
// @route POST /api/tweet/:symbol
// @access Public

const getTweets = async (req, res, next) => {
  try {
    const tweet = await Tweet.find({ stock: req.params.stock }).limit(5);

    res.json({ tweet });
  } catch (err) {
    console.error(err.message);
    res.status(500)
    res.errormessage = 'Server error in get Tweets';
    return next(err);
  }
};

// @desc Get all tweets (for testing) limit to 20 returning now for demo
// @route POST /api/tweet/all
// @access Public

const getAllTweets = async (req, res, next) => {
  try {
    const tweet = await Tweet.find().limit(20);
    if (!tweet.length) {
      // No stock found
      res.status(404);
      res.errormessage = 'Tweet not found';
      return next(new Error('Tweet not found'));
    }

    res.json(tweet);
  } catch (err) {
    console.error(err.message);
    res.status(500)
    res.errormessage = 'Server error in get All Tweets';
    return next(err);
  }
};

module.exports = {
  addTweet,
  getTweets,
  getAllTweets,
};
