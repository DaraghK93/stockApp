# Database Update

Similar to the news sentiment database update section
The script `main.py` is used to update the tweets already in the database

## Choosing model

The script expects a `.env` file within this directory.
In the `.env` file are 3 parameters.

1. MODEL_DIR - The base directory where the model is trained
2. MODEL_NAME - The name of the model e.g. NaiveBayesClassifier
3. MONGO_URI - The Mongo uri for the database to update.
