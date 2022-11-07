const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
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
    imageUrl: {
      type: String,
    },
    content: {
      type: String,
    },
    sentiment: {
      type: String,
    },
    isVerified: {
      type: String,
    },
    displayname: {
      type: String,
    },
    likeCount: {
      type: String,
    },
  },
  { collection: 'tweets' }
);

module.exports = Tweet = mongoose.model('tweet', TweetSchema);
