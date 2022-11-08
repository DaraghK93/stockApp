# Model 3
The biggest change for this model being trained is the increase in the number of words being used for the word count. 
Instead of only the top 100 most common positve, negative and neutral words being used, now the top 1000 are being used. 
This did see a increase in the results metrics score. 

Summary of results from ```highestEvaluationResults.csv```, may be slightly different if script re-run.

|evaulation metric |model             |score |
|------------------|------------------|------|
|accuracy          |MLPClassifier     |70.88%|
|positive precision|MultinomialNB     |70.39%|
|negative precision|LogisticRegression|74.77%|
|positive recall   |KNeighborsClassifier|70.15%|
|negative recall   |ComplementNB      |88.48%|
|positive f_measure|LogisticRegression|66.92%|
|negative f_measure|MLPClassifier     |68.79%|

Full set of results from ```evaluationResults.csv```, may be slightly different if script re-run.

|model             |accuracy          |positive precision|negative precision|positive recall|negative recall|positive f_measure|negative f_measure|
|------------------|------------------|------------------|------------------|---------------|---------------|------------------|------------------|
|NaiveBayesClassifier|58.83%            |54.31%            |65.54%            |41.72%         |52.74%         |47.19%            |58.45%            |
|DecisionTreeClassifier|57.16%            |52.80%            |53.52%            |52.98%         |43.82%         |52.89%            |48.18%            |
|BernoulliNB       |66.42%            |63.16%            |68.71%            |52.42%         |62.38%         |57.29%            |65.39%            |
|MultinomialNB     |68.89%            |70.39%            |74.73%            |55.71%         |58.58%         |62.19%            |65.68%            |
|ComplementNB      |63.17%            |66.97%            |48.21%            |54.85%         |88.48%         |60.30%            |62.41%            |
|KNeighborsClassifier|65.97%            |54.77%            |68.42%            |70.15%         |65.55%         |61.51%            |66.95%            |
|RandomForestClassifier|68.80%            |66.35%            |70.80%            |60.80%         |61.98%         |63.45%            |66.10%            |
|LogisticRegression|70.35%            |67.38%            |74.77%            |66.47%         |60.70%         |66.92%            |67.01%            |
|MLPClassifier     |70.88%            |68.25%            |72.12%            |64.88%         |65.75%         |66.52%            |68.79%            |
|AdaBoostClassifier|69.87%            |67.24%            |72.34%            |62.21%         |63.75%         |64.63%            |67.77%            |
