# Sentiment Analysis
This directory contains code for the sentiment analysis portion of the project. 

There are 3 subdirectories in this directory. 

1.**newsSentimentAnalysis** - Contains code for model training and data pre-processing for the news sentiment analysis. 
2.**twitterSentimentAnalysis** - Contains code for model training and data pre-processing for the Twitter sentiment analysis.
3.**bin** - Contains reusable functions for data cleaning, feature engineering and model training. 

## Running the scripts 
Create a virtual environemnt 
```
python -m venv venv 
```
Activate the virtual environment and use the ```requirements.txt``` file to install dependencies. 

For the ```featureEngineeringFunctions.py``` script run this directly first before attempting to use functions in it and it will download the required ```nltk``` packages to your system. 

## Updating Dependecies 
If new packages are used, update the ```requirements.txt``` file with the command below so others can install these dependencies. 
***MAKE SURE WHEN YOU DO THIS YOUR VIRTUAL ENVIRONMENT IS ACTIVE***
```
pip freeze > requirements.txt
```
