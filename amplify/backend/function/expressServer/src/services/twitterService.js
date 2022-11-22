const Tweet = require('../models/tweet.model');


///// AUTHOR WARREN KAVANAGH /////

/// getCompanySentimentCount ///
// Inputs:
//      symbol - A stock symbol which should match to the stock field in 
//  Returns:
//      results - An array containing information on the number of positive, neutral and negative articles in the database
const getCompanySentimentCount = async (symbol) => {
  try {
    /// Query can be updated later if we want to get actual articles not just count
    const queryResults = await Tweet.aggregate([
      { $match: { stock: symbol } },
      {
        $group: { _id: '$sentiment', count: { $sum: 1 } },
      },
      {
        $facet: {
          Positive: [
            {
              $match: { _id: 'positive' },
            },
            { $project: { sentiment: '$_id', _id: 0, count: 1 } },
          ],
          Negative: [
            {
              $match: { _id: 'negative' },
            },
            { $project: { sentiment: '$_id', _id: 0, count: 1 } },
          ],
          Neutral: [
            {
              $match: { _id: 'neutral' },
            },
            { $project: { sentiment: '$_id', _id: 0, count: 1 } },
          ],
        },
      },
    ]);
    /// The result is an array, facet command always returns array [{positive:[{count: 2, sentiment: "postive"}]}] ...
    /// There will always be positive, neutral and negative keys in this array however if the key points to empty object it means there are no articles
    /// for that sentiment
    sentiments = queryResults[0];
    results = [];
    for (let key in sentiments) {
      if (sentiments[key].length === 0) {
        results.push({ name: key, value: 0 });
      } else {
        results.push({ name: key, value: sentiments[key][0].count });
      }
    }
    /// Results will be in the form required for frontend graphs
    //[
    // { name: 'positive', value: 12 },
    // { name: 'negative', value: 40 },
    // { name: 'neutral', value: 50 }
    //]
    return results;
  } catch (error) {
    throw new Error(
      `Error has occured in the getOverallSentiment function.\nError details:\n\t${error}`
    );
  }
};

module.exports = {
  getCompanySentimentCount,
};
