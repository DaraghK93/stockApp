# Database Update
This directory contains a script called ```main.py```. This script updates the production database articles document sentiment. 

## Changing Classifier 
To update the classsifier used the variables at the top of the script (shown below) need to be updated. These varaibles are used by the script to find the classifier and data associated with the classifier. This shoukd all be relative paths. 
```
## Model Directory##
# This is the directory of the trained model 
modelDir = "../modelGeneration/model_3"

## Words List ##
# Words lists to use in this script 
positveWordsFile  = f'{modelDir}/data/positiveWords.csv'
negativeWordsFile = f'{modelDir}/data/negativeWords.csv'
neutralWords      = f'{modelDir}/data/neutralWords.csv' 

### The Classifier ###
# The classifier to use
modelName = "MLPClassifier"
modelFile = f'{modelDir}/models/{modelName}.pickle'
```

## Environment Variables 
Within this directory create a ```.env``` file with the value of the production databases or local if testing MongoURI. 
***Dont commit this to GitHub***
```
MONGO_URI=ValueOfTheMongoURI
```