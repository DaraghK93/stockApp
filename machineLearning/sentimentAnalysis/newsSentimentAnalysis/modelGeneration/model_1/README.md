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


Full set of results from ```evaluationResults.csv```, may be slightly different if script re-run.

|model             |accuracy          |positive precision|negative precision|positive recall|negative recall|positive f_measure|negative f_measure|
|------------------|------------------|------------------|------------------|---------------|---------------|------------------|------------------|
|NaiveBayesClassifier|54.65%            |51.72%            |59.39%            |40.53%         |43.76%         |45.45%            |50.39%            |
|DecisionTreeClassifier|50.56%            |44.38%            |51.51%            |35.32%         |34.80%         |39.33%            |41.54%            |
|BernoulliNB       |54.71%            |48.04%            |58.63%            |53.62%         |60.20%         |50.67%            |59.40%            |
|MultinomialNB     |50.62%            |56.48%            |76.02%            |22.16%         |26.88%         |31.84%            |39.72%            |
|ComplementNB      |56.49%            |53.56%            |59.94%            |49.63%         |58.84%         |51.52%            |59.39%            |
|KNeighborsClassifier|55.32%            |56.29%            |56.55%            |33.60%         |51.28%         |42.08%            |53.79%            |
|RandomForestClassifier|55.48%            |54.27%            |58.41%            |37.83%         |48.48%         |44.58%            |52.98%            |
|LogisticRegression|57.31%            |55.16%            |64.08%            |45.59%         |52.52%         |49.92%            |57.73%            |
|MLPClassifier     |56.92%            |53.54%            |62.38%            |48.25%         |53.80%         |50.76%            |57.77%            |
|AdaBoostClassifier|56.91%            |55.90%            |59.92%            |38.75%         |56.52%         |45.77%            |58.17%            |
