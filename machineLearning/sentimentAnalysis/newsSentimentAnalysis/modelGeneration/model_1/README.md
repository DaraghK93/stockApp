# Model 1
This is the first version of the model trained. 

The model is trained on:

1. positive polarity score
2. negative polarity score
3. neutral polarity score
4. compound polarity score
5. positive word count
6. negative word count

The words list are built within the script and stored in the ```data``` directory. 

Summary of results from ```highestEvaluationResults.csv```, may be slightly different if script re-run.

|evaulation metric |model             |score |
|------------------|------------------|------|
|accuracy          |LogisticRegression|57.31%|
|positive precision|MultinomialNB     |56.48%|
|negative precision|MultinomialNB     |76.02%|
|positive recall   |BernoulliNB       |53.62%|
|negative recall   |BernoulliNB       |60.20%|
|positive f_measure|ComplementNB      |51.52%|
|negative f_measure|BernoulliNB       |59.40%|