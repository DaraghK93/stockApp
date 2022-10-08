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
    res.errormessage = 'Server error';
    return next(err);
  }
};

// @desc Get tweets by stock symbol
// @route POST /api/tweet/:symbol
// @access Public

const getTweets = async (req, res, next) => {
  try {
    const tweet = await Tweet.find({ stock: req.params.stock });
    console.log(req.params.stock);
    if (!tweet.length) {
      // No stock found
      res.status(404);
      res.errormessage = 'Tweet not found';
      return next(new Error('Tweet not found'));
    }

    res.json({ tweet });
  } catch (err) {
    console.error(err.message);
    res.errormessage = 'Server error';
    return next(err);
  }
};

module.exports = {
  addTweet,
  getTweets,
};
