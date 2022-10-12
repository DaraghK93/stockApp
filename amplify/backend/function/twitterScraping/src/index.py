import json
import boto3
from pymongo import MongoClient
import snscrape.modules.twitter as sntwitter
import os
import pymongo


### Directory Setup ###
# For relative imports use the directory where script is running 
# This will change dynamically when running locallly or on AWS Lambda 
dir_path = os.path.dirname(os.path.realpath(__file__))


def handler(event, context):
    mongoURI = getSecret('MONGO_URI').get('Parameter').get('Value')

    # Create Connection
    client = getMongoConnection(mongoURI)
    # Select the Database
    database = client[os.environ["DATABASENAME"]]
    # Select the collection
    collection = database['sample_tweet_data']


    list_of_tickers = readSources(f'{dir_path}/lib/TwitterSources.json')

    limit = 3
    
    ids =[]
    tweets_to_write = []
    
    try:
        for stock in list_of_tickers:
            currIteration=0
            query = "(#{}) lang:en".format(stock)

            for tweet in sntwitter.TwitterSearchScraper(query).get_items():
                if currIteration == limit:
                    break
                # make sure that entry is unique
                elif (tweet.id in ids):
                    continue
                else:
                    ids.append(tweet.id)
                    # Create the tweet json object
                    tweetObject = createTweetObject(tweet.id, stock, str(tweet.date), tweet.user.username, tweet.content)
                    # collect tweets to write to db
                    tweets_to_write.append(tweetObject)
                    currIteration+=1
                
    except:
        return json.dumps({"errormessage": "Error with snscrape"})

    writeTweetsToDatabase(collection, tweets_to_write)

    return json.dumps({"Result": "SUCCESS"})


#Create tweet object. Hardcoding a sentiment in for now 
def createTweetObject(id, stock, date, username, content):
    try:
        tweetObject = { 'id': id, 'stock': stock.upper(), 'date': date, 'username': username, 'content': content, 'sentiment':'Neutral'}
    except:
        return json.dumps({"errormessage": "Error creating tweet object"}) 
    return tweetObject


 # Author: Warren Kavanagh - to keep errors the same i'm just copying these functions
def getSecret(secretName,region="eu-north-1"):
    """
    Description:
        This function is used to get a secret from the parameter store in AWS. 

    Args:
        secretName (string): The name of the secret found in the parameter store. 
        region (string): The region the secret is stored in, default to eu-north-1. 

    Returns:
        response (dict): Dictonary object with the secret name under "Name" key and value under "Value" key
    """ 
    client = boto3.client('ssm',region)
    try:
        response = client.get_parameter(
            Name=secretName,
            WithDecryption=True
        )
        return response
    except Exception as e:
        print(f'ERROR:Could not get secret in getSecret function.\nException Details:\n\t{e}')



 # Author: Warren Kavanagh - to keep errors the same i'm just copying these functions
def readSources(file):
    """
    Description:
        This function reads in a supplied JSON file of RSS sources and returns a dictionary
    Args:
        file (string): Path to RSSSources.json file. This should be located in the lib directory. 
    Returns:
        content (dict): The contnent of the JSON file supplied in the input. 
    """
    try:
        f = open(file)
        content = json.load(f)
        f.close()
        return content
    except Exception as e:
        print(f'ERROR:Occured in trying to read file supplied\nException message:\n\t{e}')


 # Author: Warren Kavanagh - to keep errors the same i'm just copying these functions
def writeTweetsToDatabase(collection,tweets):
    """
    Description:
        Logs the articles to the database 
    Args:
        articles (list): List of JSON objects containing articles 
    Returns:
        _type_: _description_
    """
    try:
        collection.insert_many(tweets, ordered=False)
    except pymongo.errors.BulkWriteError as e:
        print(f'WARNING:Duplicate Tweets detected, only one copy of articles inserted into database.')
    except Exception as e:
        print(f'ERROR:Could not insert tweets into database.\nException Details:\n\t{e}')

    
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
        print(f'ERROR:Could not connect to MongoDB, client obeject is none')
    else:
        return client