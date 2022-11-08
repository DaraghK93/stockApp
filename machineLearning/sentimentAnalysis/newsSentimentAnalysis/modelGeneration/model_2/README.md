# Model 2
The biggest change for this model being trained compared to model_1 is that there is now a feature for neutral word count. 
The words list for neutral word count is generated within the script and stored in ```/data``` directory. 

There are now only 100 most common words for positive neutral and negative being used for word count. 

Summary of results from ```highestEvaluationResults.csv```, may be slightly different if script re-run.

|evaulation metric |model             |score |
|------------------|------------------|------|
|accuracy          |MLPClassifier     |61.98%|
|positive precision|MultinomialNB     |78.71%|
|negative precision|MultinomialNB     |77.95%|
|positive recall   |ComplementNB      |57.35%|
|negative recall   |ComplementNB      |58.86%|
|positive f_measure|LogisticRegression|55.88%|
|negative f_measure|ComplementNB      |60.10%|


Full set of results from ```evaluationResults.csv```, may be slightly different if script re-run.

|model             |accuracy          |positive precision|negative precision|positive recall|negative recall|positive f_measure|negative f_measure|
|------------------|------------------|------------------|------------------|---------------|---------------|------------------|------------------|
|NaiveBayesClassifier|57.03%            |52.51%            |60.50%            |40.89%         |51.53%         |45.98%            |55.66%            |
|DecisionTreeClassifier|52.16%            |49.36%            |47.25%            |37.19%         |32.92%         |42.42%            |38.80%            |
|BernoulliNB       |59.93%            |54.06%            |61.25%            |56.26%         |58.58%         |55.14%            |59.88%            |
|MultinomialNB     |56.34%            |78.71%            |77.95%            |24.10%         |30.34%         |36.90%            |43.68%            |
|ComplementNB      |60.03%            |54.12%            |61.39%            |57.35%         |58.86%         |55.69%            |60.10%            |
|KNeighborsClassifier|59.14%            |61.13%            |57.89%            |40.86%         |53.22%         |48.98%            |55.46%            |
|RandomForestClassifier|59.53%            |58.89%            |60.71%            |46.07%         |49.56%         |51.70%            |54.57%            |
|LogisticRegression|61.79%            |61.29%            |65.77%            |51.35%         |52.26%         |55.88%            |58.24%            |
|MLPClassifier     |61.98%            |61.71%            |62.69%            |49.98%         |56.93%         |55.23%            |59.67%            |
|AdaBoostClassifier|61.41%            |59.22%            |63.38%            |52.35%         |55.44%         |55.58%            |59.14%            |