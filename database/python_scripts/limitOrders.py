import pymongo
from pymongo import UpdateOne, MongoClient
import certifi
import pprint
import boto3
import os
import json
from cgi import print_arguments
from urllib import response

trancscol = db['transactions']
portfolioscol = db['portfolios']
holdingscol = db['holdings']


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
    transactionscollection = collection.aggregate([
        {'$facet':
                  {
                     'buy': [
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
                                }],
                      'sell': [
                                {
                                  '$match': {
                                    'orderType': 'LIMIT',
                                    'status': 'PENDING',
                                    'buyOrSell': 'SELL'
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
                                      '$lte': [
                                        '$stock.daily_change.currentprice', '$limitValue'
                                      ]
                                    }
                                  }
                                }]
                            }}])
    return transactionscollection



def commandCursorToLists(collection):
    # get a list of the transactions
    result = getTransactions(collection)
    transList = []
    for i in result:
        transList.append(i)
    splitList = transList[0]
    buyList = splitList['buy']
    sellList = splitList['sell']
    return buyList, sellList




def getPortfolioUpdates(buys,sells):
    # get the list of updatOnes for portoflios
    # will be passed through bulkwrite
    data_request = []
    #  portfolio updates
    for i in buys:
            data_request.append(UpdateOne({"_id": i["portfolioId"]},
                                          {'$inc': {"frozenBalance": -i["value"]}}))
    for i in sells:
        data_request.append(UpdateOne({"_id": i["portfolioId"]},
                                          {'$inc': {"remainder": i["value"]}}))
    return data_request

def getHoldingsUpdates(buys,sells):
    # get list of updateOns for holdings
    # will be send through bulkwrite
    data_request = []

    #  holdings updates
    for i in buys:
            data_request.append(UpdateOne({"_id": i["holdings"]},
                                          {'$inc': {"units": i["units"]}}))
    for i in sells:
            data_request.append(UpdateOne({"_id": i["holdings"]},
                                          {'$inc': {"frozenHoldingsUnits": -i["units"]}}))
    return data_request

def getTransactionsUpdates(buys,sells):
    # get list of updateOns for transactions
    # will be send through bulkwrite
    data_request = []
    #  portfolio updates
    for i in buys:
            data_request.append(UpdateOne({"_id": i["_id"]},
                                          {'$set': {"status": "COMPLETED"}}))
    for i in sells:
        data_request.append(UpdateOne({"_id": i["_id"]},
                                      {'$set': {"status": "COMPLETED"}}))
    return data_request


def sendBulkUpdatePortfolio(trancscol,portfolioscol,holdingscol,buyList,sellList):
    portfolioUpdates = getPortfolioUpdates(buyList,sellList)
    holdingsUpdates = getHoldingsUpdates(buyList,sellList)
    transactionsUpdates = getTransactionsUpdates(buyList,sellList)


     # portfolio updates
    try:
        portres = portfolioscol.bulk_write(portfolioUpdates)
        port_matched_count = portres.matched_count
        print(port_matched_count)
    except Exception as e:
        print(f'ERROR:cannot bulk write to database\nException Details:\n\t{e}')

    # holdings updates
    try:
        holdres = holdingscol.bulk_write(holdingsUpdates)
        hold_matched_count = holdres.matched_count
        print(hold_matched_count)
    except Exception as e:
        print(f'ERROR:cannot bulk write to database\nException Details:\n\t{e}')

    # transactions updates
    try:
        transres = trancscol.bulk_write(transactionsUpdates)
        trans_matched_count = transres.matched_count
        print(trans_matched_count)
    except Exception as e:
        print(f'ERROR:cannot bulk write to database\nException Details:\n\t{e}')

    return

sendBulkUpdatePortfolio(trancscol,portfolioscol,holdingscol,transactions)