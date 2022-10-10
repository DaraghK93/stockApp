const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
    },
    date: {
      type: String,
    },
    username: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { collection: 'sample_tweet_data' }
);

module.exports = Tweet = mongoose.model('tweet', TweetSchema);
