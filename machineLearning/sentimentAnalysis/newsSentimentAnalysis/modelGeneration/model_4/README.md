# Model 4
The big change within this model is using the words list fund by Caolan avaiable at  https://sraf.nd.edu/loughranmcdonald-master-dictionary/ for the word ocunt instead of generating it witin the script. 

Unfortuntely the results have trended down in percentage compared to previous models for the training dataset. However possibly altering the training/test split may solve this. 

The words are more general negative, positive and neutral words. 

Summary of results from ```highestEvaluationResults.csv```, may be slightly different if script re-run.

|evaulation metric |model             |score |
|------------------|------------------|------|
|accuracy          |AdaBoostClassifier|56.56%|
|positive precision|BernoulliNB       |68.74%|
|negative precision|LogisticRegression|64.01%|
|positive recall   |NaiveBayesClassifier|41.41%|
|negative recall   |KNeighborsClassifier|68.14%|
|positive f_measure|NaiveBayesClassifier|46.19%|
|negative f_measure|BernoulliNB       |55.87%|

Full set of results from ```evaluationResults.csv```, may be slightly different if script re-run.

|model             |accuracy          |positive precision|negative precision|positive recall|negative recall|positive f_measure|negative f_measure|
|------------------|------------------|------------------|------------------|---------------|---------------|------------------|------------------|
|NaiveBayesClassifier|54.99%            |52.21%            |59.37%            |41.41%         |43.72%         |46.19%            |50.36%            |
|DecisionTreeClassifier|52.12%            |48.49%            |56.18%            |35.69%         |28.92%         |41.12%            |38.18%            |
|BernoulliNB       |54.98%            |68.74%            |54.59%            |21.50%         |57.20%         |32.75%            |55.87%            |
|MultinomialNB     |54.15%            |66.76%            |60.62%            |22.14%         |40.53%         |33.25%            |48.58%            |
|ComplementNB      |55.25%            |59.28%            |57.57%            |29.66%         |51.75%         |39.54%            |54.50%            |
|KNeighborsClassifier|40.21%            |56.32%            |29.78%            |34.44%         |68.14%         |42.74%            |41.45%            |
|RandomForestClassifier|55.45%            |54.22%            |59.50%            |38.15%         |40.73%         |44.79%            |48.36%            |
|LogisticRegression|55.47%            |57.72%            |64.01%            |34.38%         |40.61%         |43.09%            |49.70%            |
|MLPClassifier     |55.38%            |58.14%            |60.35%            |31.21%         |47.10%         |40.62%            |52.90%            |
|AdaBoostClassifier|56.56%            |59.28%            |59.50%            |35.11%         |44.47%         |44.10%            |50.90%            |
