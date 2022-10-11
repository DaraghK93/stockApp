import json
import boto3
from pymongo import MongoClient
import snscrape.modules.twitter as sntwitter


def handler(event, context):
    mongoURI = getSecret('MONGO_URI').get('Parameter').get('Value')

    # Create Connection
    client = MongoClient(mongoURI)
    # Select the Database
    database = client['test']
    # Select the collection
    collection = database['sample_tweet_data']

    # Will loop through all 500 stocks we are looking after soon but for now to keep db usage down i'll only do 1/2 stocks
    tweets = []
    stock = 'aapl'
    query = "(#{}) lang:en".format(stock)
    limit = 2
    try:
        for tweet in sntwitter.TwitterSearchScraper(query).get_items():
            if len(tweets) == limit:
                break
            else:
                tweets.append([tweet.date, tweet.user.username, tweet.content])
                # Create the tweet json object
                tweetObject = createTweetObject(tweet.id, stock, str(tweet.date), tweet.user.username, tweet.content)
                # Add tweet to collection
                collection.insert_one(tweetObject)
                
    except:
        return json.dumps({"errormessage": "Error with snscrape"})


    return json.dumps(tweets, default=str)



def createTweetObject(id, stock, date, username, content):
    try:
        tweetObject = { 'id': id, 'stock': stock.upper(), 'date': date, 'username': username, 'content': content }
    except:
        return json.dumps({"errormessage": "Error creating tweet object"}) 
    return tweetObject



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

