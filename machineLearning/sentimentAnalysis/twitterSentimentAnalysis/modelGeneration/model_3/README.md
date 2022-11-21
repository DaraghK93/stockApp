## Model 1

This is trained on 'combined' dataset.

The features extracted for this model are

1. positive polarity score
2. negative polarity score
3. neutral polarity score
4. compound polarity score
5. positive word count
6. negative word count

The full results of this testing can be found in evaluation results and highest evaluation sores.

The difference between this and model 2 is there is less neutral data included in the training to try combat over classification of negative tweets as the system was too sensitive to classifying tweets as neutral.

## Future work / Observations

While looking through my training data I noticed a correlation between 'positive' and 'negative' and very extreme VADER 'compound' scores.

Will need to get more positive and neutral data to train better models in the future.
