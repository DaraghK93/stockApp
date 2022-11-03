import json
import boto3
from pymongo import MongoClient
import snscrape.modules.twitter as sntwitter
import os
import pymongo
import pandas as pd
import pickle
import nltk
import string

### Directory Setup ###
# For relative imports use the directory where script is running
# This will change dynamically when running locallly or on AWS Lambda
dir_path = os.path.dirname(os.path.realpath(__file__))
nltk.data.path.append(f"{dir_path}/nltk_data")


def lambda_handler(event, context):
    mongoURI = getSecret("MONGO_URI").get("Parameter").get("Value")

    # Create Connection
    client = getMongoConnection(mongoURI)
    # Select the Database
    database = client[os.environ["DATABASENAME"]]
    # Select the collection
    collection = database["sample_tweet_data"]

    ## Get the tickers to scrape

    list_of_tickers = readSources(f"{dir_path}/MLData/TwitterSources.json")

    limit = int(os.environ["LIMIT"])

    ids = []
    tweets_to_write = []
    list_of_tickerss = ["aapl", "tsla", "msft"]
    try:
        for stock in list_of_tickerss:
            currIteration = 0
            query = "(#{}) lang:en".format(stock)

            for tweet in sntwitter.TwitterSearchScraper(query).get_items():
                if currIteration == limit:
                    break
                # make sure that entry is unique
                elif tweet.id in ids:
                    continue
                else:
                    ids.append(tweet.id)
                    # Create the tweet json object
                    tweetObject = createTweetObject(
                        tweet.id,
                        stock,
                        tweet.date,
                        tweet.user.username,
                        tweet.user.profileImageUrl,
                        tweet.content,
                        tweet.user.verified,
                        tweet.user.displayname,
                        tweet.likeCount,
                    )
                    # collect tweets to write to db
                    tweets_to_write.append(tweetObject)
                    currIteration += 1

        ## Load the classifier
        classifierName = "NaiveBayesClassifier.pickle"
        classifier = loadClassifier(f"{dir_path}/MLData/{classifierName}")

        # Read in the words files
        posWordsList = readCSVFile(f"{dir_path}/MLData/pos_words.csv")
        negWordsList = readCSVFile(f"{dir_path}/MLData/neg_words.csv")
        neuWordsList = readCSVFile(f"{dir_path}/MLData/neutral_words.csv")

        ## Create DataFrame of the tweets for cleaning
        df = pd.DataFrame(tweets_to_write)
        df["tweet_cleaning"] = df.loc[:, "content"]

        ## Clean the data
        print(df)
        df = removeUrlAndHashtag(df)
        print(df)
        df = removeStopWordsFromTweet(df)
        print(df)
        ## write the tweets to the db
        writeTweetsToDatabase(collection, tweets_to_write)
    except:
        return json.dumps({"errormessage": "Error with snscrape"})

    return json.dumps({"Result": "SUCCESS"})


###############################################
###############################################
###############################################

# Create tweet object. Hardcoding a sentiment in for now
def createTweetObject(
    id, stock, date, username, imageUrl, content, isVerified, displayname, likeCount
):
    """
    Description:
        This function creates a json of a tweet for adding to the db
    Args:
        id (_type_): _description_
        stock (_type_): _description_
        date (_type_): _description_
        username (_type_): _description_
        content (_type_): _description_

    Returns:
        tweet (json): JSON of the tweet object
    """
    try:
        tweetObject = {
            "id": id,
            "isVerified": isVerified,
            "displayname": displayname,
            "imageUrl": imageUrl,
            "stock": stock.upper(),
            "date": date,
            "username": username,
            "content": content,
            "sentiment": "Neutral",
            "likeCount": likeCount,
        }
    except:
        return json.dumps({"errormessage": "Error creating tweet object"})
    return tweetObject


# Author: Warren Kavanagh - to keep errors the same i'm just copying these functions
def getSecret(secretName, region="eu-north-1"):
    """
    Description:
        This function is used to get a secret from the parameter store in AWS.

    Args:
        secretName (string): The name of the secret found in the parameter store.
        region (string): The region the secret is stored in, default to eu-north-1.

    Returns:
        response (dict): Dictonary object with the secret name under "Name" key and value under "Value" key
    """
    client = boto3.client("ssm", region)
    try:
        response = client.get_parameter(Name=secretName, WithDecryption=True)
        return response
    except Exception as e:
        print(
            f"ERROR:Could not get secret in getSecret function.\nException Details:\n\t{e}"
        )


# Author: Warren Kavanagh - to keep errors the same i'm just copying these functions
def readSources(file):
    """
    Description:
        Reads sources from /lib/TwitterSources.json
    Args:
        file (_type_): file pointer

    Returns:
        tweets (list): An array of ticker symbols to use in scraping query
    """
    try:
        f = open(file)
        content = json.load(f)
        f.close()
        return content
    except Exception as e:
        print(
            f"ERROR:Occured in trying to read file supplied\nException message:\n\t{e}"
        )


# Author: Warren Kavanagh - to keep errors the same i'm just copying these functions
def writeTweetsToDatabase(collection, tweets):
    """
    Description:
        Logs the tweets to the database
    Args:
        tweets (list): List of JSON objects containing tweets
    Returns:
        _type_: _description_
    """
    try:
        collection.insert_many(tweets, ordered=False)
    except pymongo.errors.BulkWriteError as e:
        print(
            f"WARNING:Duplicate Tweets detected, only one copy of articles inserted into database."
        )
    except Exception as e:
        print(
            f"ERROR:Could not insert tweets into database.\nException Details:\n\t{e}"
        )


# Author: Warren Kavanagh - to keep errors the same i'm just copying these functions
def getMongoConnection(URI):
    """
    Description:
        Gets a client connection to MongoDB
    Args:
        URI (string): A connection string for mongo Database
    Returns:
        client(MongoClient): MongoClient object which can be used to execute commands on the database.
    """
    client = pymongo.MongoClient(URI)
    if client is None:
        print(f"ERROR:Could not connect to MongoDB, client obeject is none")
    else:
        return client


def loadClassifier(file):
    """
    Loads in a pickle file containing the machine learning classifier.
    Args:
        file (String): The path to the classifier.
    Returns:
        (SklearnClassifier or NLTKClassifier): The classifier which can be used to classify news headlines.
    """
    try:
        classifierFile = open(file, "rb")
        classifier = pickle.load(classifierFile)
        classifierFile.close()
        return classifier
    except Exception as e:
        print(
            f"ERROR:Occured in the loadClassifier function.\nException Details:\n\t{e}"
        )


def removeUrlAndHashtag(data):
    """
    This function takes in a dataframe and returns the same dataframe free of URLs, tagged users, hashtags
    and all in lower case. Punctuation is also removed here

    The 'tweet' column is the column that's changed. Can easily expand this to be any column if needed

    Args:
        dataframe

    Returns:
        cleaned dataframe
    """
    tweetCol = []

    for index, row in data.iterrows():
        newTweet = []
        for word in row["tweet_cleaned"].split(" "):
            if word.startswith("@") and len(word) > 1:
                word = "@user"
            elif word.startswith("http"):
                word = "http"
            elif word.startswith("#") and len(word) > 1:
                word = "#"
            elif word.startswith("$") and len(word) > 1:
                word = "$"
            # remove punctuation from the words also
            word = word.translate(str.maketrans("", "", string.punctuation))
            # create new tweet - list of words
            newTweet.append(word.lower())
        # join the words in tweet list together separated by a space and add to tweet column list
        tweetCol.append(" ".join(newTweet))
    # create a dataframe to replace old tweet column
    tweetCol = pd.DataFrame(tweetCol)

    data.drop(["tweet"], axis=1)
    data["tweet"] = tweetCol

    return data


def removeStopWordsFromTweet(data):
    """
    This function takes in a dataframe of tweets and returns each string free of stopwords

    Args:
        data (_type_): dataframe of tweets

    Returns:
        _type_: cleaned dataframe
    """
    tweetCol = []

    stopwords = nltk.corpus.stopwords.words("english")
    print(stopwords, "these are the stopwords!!!!!!!!!!!!")
    for index, row in data.iterrows():
        newTweet = []
        for word in row["tweet_cleaning"].split(" "):
            if word not in stopwords:
                # create new tweet - list of words
                newTweet.append(word.lower())
        # join the words in tweet list together separated by a space and add to tweet column list
        tweetCol.append(" ".join(newTweet))
    # create a dataframe to replace old tweet column
    tweetCol = pd.DataFrame(tweetCol)

    # replace old tweet with newly created one stopwords free
    data.drop(["tweet_cleaning"], axis=1)
    data["tweet_cleaning"] = tweetCol

    return data


def readCSVFile(filepath, encoding="utf8", index_col=None):
    """
    Reads in csv file to Pandas dataframe

    Args:
        filepath (string): relative file path
        encoding (string): The encoding of the file being read - Optional
        index_col (Int): If there is an index column to be used - Optional

    Returns:
        df (pandas Dataframe): Pandas dataframe with csv in it
    """
    try:
        df = pd.read_csv(filepath, encoding=encoding, index_col=index_col)
        return df
    except Exception as e:
        print(f"Error reading in file. Exception details\n{e}")
