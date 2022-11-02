# Database Update
The script ```main.py``` in this directory can be used to update the headlines in the database and classify them into postive, neutral or negative sentiment using a new model. 

## Choosing model 
The script expects a ```.env``` file within this directory. 
In the ```.env``` file are 3 parameters. 

1. MODEL_DIR - The base irectory where the model is trained 
2. MODEL_NAME - The name of the model 
3. MONGO_URI - The Mongo uri for the database to update. 

For example the if the contents of the ```.env``` file where as below, the model trained would be associated with the directory ```../modelGeneration/model_3```, the name of the model to use is ```NaiveBayesClassifier``` which will have a pickle file under this directory and the database to use is at localhost. 

```
MODEL_DIR=../modelGeneration/model_3
MODEL_NAME=NaiveBayesClassifier
MONGO_URI=mongodb://localhost:27017
```