import json
import boto3
from pymongo import MongoClient
import snscrape.modules.twitter as sntwitter

REGION = "eu-north-1"
SECRET_NAME = "MongoURL"

def handler(event, context):
    #MongoURL = get_secret()

   # print (MongoURL)


    # Create Connection
    client = MongoClient('mongodb://admin:pass@ec2-3-249-127-86.eu-west-1.compute.amazonaws.com:27017')
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
    print('we made it')
    try:
        tweetObject = { 'id': id, 'stock': stock.upper(), 'date': date, 'username': username, 'content': content }
    except:
        return json.dumps({"errormessage": "Error creating tweet object"}) 
    return tweetObject



def get_secret():
    session = boto3.session.Session()
    client = session.client(
        service_name = 'secretsmanager',
        region_name=REGION
    )

    get_secret_value_response = client.get_secret_value(
        SecretId=SECRET_NAME
    )

    secret_response = get_secret_value_response['SecretString']

    return json.loads(secret_response)