import sys

sys.path.append("../../bin")
from database import databaseFunctions
from modelTraining import modelFunctions
from featureEngineering import featureEngineeringFunctions
from dataCleaning import cleaningFunctions

import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()

## Model Directory##
# This is the directory of the trained model
modelDir = os.getenv("MODEL_DIR")

## Words List ##
# Words lists to use in this script
posWords_loc = "../cleanedDatasets/pos_words.csv"
negWords_loc = "../cleanedDatasets/neg_words.csv"
neuWords_loc = "../cleanedDatasets/neutral_words.csv"

### The Classifier ###
# The classifier to use
modelName = os.getenv("MODEL_NAME")
modelFile = f"{modelDir}/models/{modelName}.pickle"

if __name__ == "__main__":
    # Get mngo uri form .env
    mongoURI = os.getenv("MONGO_URI")
    # Get a database connect
    con = databaseFunctions.getMongoConnection(mongoURI)
    # Get the tweets and their ids
    tweets = databaseFunctions.getTweets(con)
    tweets_list = []
    ids = []
    for tweet in tweets:
        tweets_list.append(tweet["content"])
        ids.append(tweet["id"])

    ## Crate DataFrame out of these
    tweet_ids = pd.DataFrame(ids)
    tweets_list = pd.DataFrame(tweets_list)
    df = pd.DataFrame()
    df["tweet"] = tweets_list
    df["id"] = tweet_ids

    # Read in the words files
    posWordsList = cleaningFunctions.readCSVFile(posWords_loc)
    negWordsList = cleaningFunctions.readCSVFile(negWords_loc)
    neuWordsList = cleaningFunctions.readCSVFile(neuWords_loc)

    ## Clean the tweets - removing stopwords and urls, hashtags, punctuation as before
    df = featureEngineeringFunctions.removeStopWordsFromTweet(df)
    df = cleaningFunctions.removeUrlAndHashtag(df)

    ## remove empty strings after cleaning
    indeces_to_drop = []
    for index, row in df.iterrows():
        tweet = row["tweet"].strip()
        if not tweet or len(row["tweet"]) == 0:
            indeces_to_drop.append(index)
    df.drop(indeces_to_drop, axis=0, inplace=True)

    # Load the classifier
    classifier = modelFunctions.loadClassifier(modelFile)
    for index, row in df.iterrows():
        features = featureEngineeringFunctions.extractFeatures(
            row["tweet"], posWordsList, negWordsList
        )
        prediction = classifier.classify(features)
        query = {"$set": {"sentiment": prediction}}
        databaseFunctions.updateTweet(con, row["id"], query)
