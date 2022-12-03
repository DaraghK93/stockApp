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
    """find all limit orders that can be acioned.
    split into buys and sells

    Args:
        collection (db collection): the database collection that is passed in
        in this case it will be the transactions

    Returns:
        commandcursor: the command cursor which will be iterated through to
        get the separate lists
    """
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
    """make the coman cursor returned into two lists

    Args:
        collection (dbcollection): the transactions collection

    Returns:
        Lists: two lists, one of actionable buy transactions 
        and one of actionable sell transactions
    """
    # get a list of the transactions
    result = getTransactions(collection)
    # empty llist to add the result to
    transList = []
    # loop through and add the list
    for i in result:
        transList.append(i)
    # returns a list so need to get 1st element (which will be an object)
    splitList = transList[0]
    # the buy object contains a list of objects that can be actions
    buyList = splitList['buy']
    # the sell object contains a list of objects that can be actions
    sellList = splitList['sell']
    return buyList, sellList




def getPortfolioUpdates(buys,sells):
    """get the list of updates that will be passed to the portofolio colection

    Args:
        buys (List): list of actionable buy objects
        sells (List): list of actionable sell objects

    Returns:
        List: list of updateOnes that will be passed to bulkwrite
    """
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
    """get the list of updates that will be passed to the holdings colection

    Args:
        buys (List): list of actionable buy objects
        sells (List): list of actionable sell objects

    Returns:
        List: list of updateOnes that will be passed to bulkwrite
    """
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
    """get the list of updates that will be passed to the transactions colection

    Args:
        buys (List): list of actionable buy objects
        sells (List): list of actionable sell objects

    Returns:
        List: list of updateOnes that will be passed to bulkwrite
    """
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
    """sends the bulk updates to each collection

    Args:
        trancscol (collection): the transactions collection
        portfolioscol (collection): the portfolios collection
        holdingscol (collection): the holdings collection
        buyList (list): _description_
        sellList (list): _description_
    Returns:
        write conecerns: showing how many were matched
    """
    portfolioUpdates = getPortfolioUpdates(buyList,sellList)
    holdingsUpdates = getHoldingsUpdates(buyList,sellList)
    transactionsUpdates = getTransactionsUpdates(buyList,sellList)

    if buyList + sellList != []:
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
    else:
        print("nothing to action")
    return port_matched_count, hold_matched_count, trans_matched_count

sendBulkUpdatePortfolio(trancscol,portfolioscol,holdingscol,transactions)