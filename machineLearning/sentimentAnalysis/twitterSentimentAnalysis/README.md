# Twitter Sentiment Analysis

The code in this directory relates to the training of the machine learning sentiment classifier for tweets.

The classifier will classify tweets into either positive, negative or neutral categories.

## Subdirectories

1. cleanedDatasets - This contains the datasets cleaned when running the function process_data.py.
2. modelGenration - Contains the files for pre_processing data, training/testing of different models and evaluating them.

### To run

To run the process_data.py file the first thing you need to do is download the original datasets. These could not be included as they are too big to include on GitHub.

They can be found here:

1. https://www.kaggle.com/datasets/kazanova/sentiment140 - renamed as dataset1.csv
2. https://www.kaggle.com/code/tommyupton/twitter-stock-market-sentiment-analysis/data?select=Tweet.csv - renamed dataset2.csv
3. https://sraf.nd.edu/loughranmcdonald-master-dictionary/ - named as is from download (Loughran-McDonald_MasterDictionary_1993-2021.csv)

Simply create a folder called 'datasets' in the twittersentimentanalysis directory and include the datasets in there and run process_data.py

You can run train_model.py as is as all cleaned datasets are included. This will train multiple models and also create a file with the evaluations of each in them.

All dependencies should be installed as in the sentimentAnalysis README
