import pymongo
from pymongo import UpdateOne, MongoClient
import certifi
import pprint
import boto3
import os
import json
from cgi import print_arguments
from urllib import response


def connectToDB(URI):
    # connect to the mongo instance
    # return error if connection fails
    client = pymongo.MongoClient(URI)
    if client is None:
        print(f'ERROR:Could not connect to MongoDB, client obeject is none')
    else:
        return client

def getSecret(secretName,region="eu-north-1"):
    # get the secret from AWS
    client = boto3.client('ssm',region)
    try:
        response = client.get_parameter(
            Name=secretName,
            WithDecryption=True
        )
        return response
    except Exception as e:
        print(f'ERROR:Could not get secret in getSecret function.\nException Details:\n\t{e}')

mongoURI = getSecret('MONGO_URI').get('Parameter').get('Value')

# connect to DB
client = connectToDB(mongoURI)

# specify db and collection
db = client[os.environ["DATABASE"]]
transactions = db[os.environ["TRANSACTIONS"]]
portfolios = db[os.environ["PORTFOLIOS"]]
holdings = db[os.environ["HOLDINGS"]]


def getTransactions(collection):
    transactions = collection.aggregate([
                                    {
                                      '$match': {
                                        'orderType': 'LIMIT',
                                        'status': 'PENDING',
                                        'buyOrSell': 'BUY'
                                      }
                                    }, {
                                      '$lookup': {
                                        'from': 'stocks',
                                        'localField': 'stockId',
                                        'foreignField': '_id',
                                        'as': 'stock',
                                        'pipeline': [
                                          {
                                            '$project': {
                                              'daily_change.currentprice': 1
                                            }
                                          }
                                        ]
                                      }
                                    }, {
                                      '$unwind': {
                                        'path': '$stock'
                                      }
                                    }, {
                                      '$match': {
                                        '$expr': {
                                          '$gte': [
                                            '$stock.daily_change.currentprice', '$limitValue'
                                          ]
                                        }
                                      }
                                    }])
    return transactions


