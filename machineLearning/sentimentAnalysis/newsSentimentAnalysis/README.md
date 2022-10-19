# News Sentiment Analysis
The code in this directory relates to the training of the machine learning sentiment classifier for news headlines. 

The classifier will classify news headlines into either positive, negative or neutral categories. 

## Subdirectories
1. data - Contains any data files read/written to by the scripts. 
2. dataCleaning - Any scripts relating to data cleaning. 
3. featureEngineering - Reusable fnctions related to feature engineering.
4. modelGenration - Iterations of different models. 

## Running the scripts 
Create a virtual environemnt 
```
python -m venv MyEnv 
```
Activate the virtual environment and use the ```requirements.txt``` file to install dependencies. 

For the ```featureEngineeringFunctions.py``` script run this directly first before attempting to use functions in it and it will download the required ```nltk``` packages to your system. 