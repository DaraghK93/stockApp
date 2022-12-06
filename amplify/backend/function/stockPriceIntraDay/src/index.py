import json
import requests
from pymongo import MongoClient, UpdateOne
from bs4 import BeautifulSoup
import datetime
import os
import boto3
from urllib.error import HTTPError, URLError

def connectToDB(URI):
  """Creates a connection to the Database

  Args:
      URI (string): URL string which is the address of the database

  Returns:
      Mongo Client: MongoClient object which can be used to execute commands on the database. 
  """
  client = MongoClient(URI)
  if client is None:
      print(f'ERROR:Could not connect to MongoDB, client obeject is none')
  else:
      return client


def getSecret(secretName,region="eu-north-1"):
  """Description:
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


def get_current_price():
  """
  Description: Scrapes slickcharts.com to get the prices of the stocks within the S&P500

  Returns:
      dictionary: Returns a dictionary in the form 
      {output["Symbol"]: {currentprice: , absolutechange: , percentagechange: }}
  """
  scrapeURL = "https://www.slickcharts.com/sp500"
  agent = {"User-Agent":'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'}
  try:
    page = requests.get(scrapeURL, headers=agent)
    soup = BeautifulSoup(page.content, "html.parser")

    # Method for scraping a table taken from:
    # stack overflow https://stackoverflow.com/questions/23377533/python-beautifulsoup-parsing-table
    data = []

    #  finds a table tag with attribute named here
    table = soup.find('table', attrs={'class': 'table table-hover table-borderless table-sm'})
    table_body = table.find('tbody')

    # loops through each row of the table and find all of the data and puts it in an array
    rows = table_body.find_all('tr')
    for row in rows:
        cols = row.find_all('td')
        cols = [ele.text.strip()for ele in cols]
        # As there are two tables on the page with exactly the same data, it would run through
        # twice. This checks whether the data is already in the table, and if it is, this would mean that
        # the code has started going through the second table. If this happens the loop should break.
        # Otherwise, add the column to the data array.
        if cols[2] in data:
          break
        else:
          data.append(cols)
  except HTTPError as hp:
    print(hp)
  except URLError as ue:
    print("The Server Could Not be Found")
  else:
    output = {}
    for i in range(0, len(data)):
      # add to dictionary in the form Symbol: Price
      # the data is also converted from string to float where possible
      output[data[i][2]] = {"currentprice": float(data[i][4].replace(',', '')), "absoluteChange": float(data[i][5]), "percentageChange": float(data[i][6].strip("()%"))}
    return output

  

def create_data_request(data_curr_price, time_stamp):
  """
    Description:  Creates an array of data requests that will be used to bulk write. Uses 
                  UpdateOne as the method for the bulk write. These requests will be used to
                  update the daily_change and prices.time_stamp fields in the database. It will
                  overwrite the values in daily changes and just add a new field to the prices object.
  

  Args:
      data_curr_price (dictionary): dictionary of all the current prices in the form
      {output["Symbol"]: {currentprice: , absolutechange: , percentagechange: }}

      time_stamp (string): the timestamp for all of the current prices in the form YYYY-MM-DDThh:mm:ss

  Returns:
      array: array of requests for the bulk write
  """
  data_request = []
  name = "prices." + time_stamp
  for i in data_curr_price:
    try:
      # This if statement needs to be done as slickcharts.com lists the company as BRK.B, but the
      # database has their symbol as BRK-B. As such this would result in a KeyError if not updated.
      if i == "BRK.B":
          i_new = "BRK-B"
          data_request.append(UpdateOne({"symbol": i_new}, {'$set': {"daily_change": data_curr_price[i]}}))
          data_request.append(UpdateOne({"symbol": i_new}, {'$set': {name: {"time": time_stamp, "Close": data_curr_price[i]["currentprice"]}}}))
      elif i == "BF.B":
          i_new = "BF-B"
          data_request.append(UpdateOne({"symbol": i_new}, {'$set': {"daily_change": data_curr_price[i]}}))
          data_request.append(UpdateOne({"symbol": i_new}, {'$set': {name: {"time": time_stamp, "Close": data_curr_price[i]["currentprice"]}}}))
      else:
        # The first append here relates to the field daily_change. This will be overwritten every time.
        data_request.append(UpdateOne({"symbol": i}, {'$set': {"daily_change": data_curr_price[i]}}))

        # This append relates to the prices.time_stamp field. It will add a new field to prices in the form
        # prices: {"YYYY-MM-DDThh:mm:ss": {"Close": price at that time}}
        # Needs to be in the format "Close" as this is the field name for the rest of the historic values.
        data_request.append(UpdateOne({"symbol": i}, {'$set': {name: {"Close": data_curr_price[i]["currentprice"]}}}))
    
    except KeyError:
      # this KeyError will flag if a stock is missing from the input dictionary. 
      # It shouldn't stop the program from running as the rest of the values should be updated.
      # It should let inform which stocks are missing from the web scrape.
      print("Check: Stock ", {i}, " missing from the web scrape or the database. This could be due to a change in allocation for the S&P500 where a stock was added or removed.")
      continue
  
  return data_request

### Limit orders

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
    try:
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
                                          '$lte': [
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
                                          '$gte': [
                                            '$stock.daily_change.currentprice', '$limitValue'
                                          ]
                                        }
                                      }
                                    }]
                                }}])
    except Exception as e:
        print(f'ERROR:Could not run get transactions function.\nException Details:\n\t{e}') 
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
    # result = getTransactions(collection)
    # empty llist to add the result to
    try:
      transList = []
      # loop through and add the list
      for i in collection:
          transList.append(i)
      # returns a list so need to get 1st element (which will be an object)
      splitList = transList[0]
      # the buy object contains a list of objects that can be actions
      buyList = splitList['buy']
      # the sell object contains a list of objects that can be actions
      sellList = splitList['sell']
    except Exception as e:
        print(f'ERROR:Could not run command cursor function.\nException Details:\n\t{e}')
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
    try:
      # add all updateOnes to array for buy and sell
      # buys take the value of transaction from the frozen balance
      # sells add the value to the remainder
      for i in buys:
              data_request.append(UpdateOne({"_id": i["portfolioId"]},
                                            {'$inc': {"frozenBalance": -i["value"]}}))
      for i in sells:
          data_request.append(UpdateOne({"_id": i["portfolioId"]},
                                            {'$inc': {"remainder": i["value"]}}))
    except Exception as e:
        print(f'ERROR:Could not run portfolio updates function.\nException Details:\n\t{e}')
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
    try:
      # add all updateOnes to array for buy and sell
      # buys add the units of transaction to the holdings units
      # sells take the units of the transaction from the frozen holdings
      for i in buys:
              data_request.append(UpdateOne({"_id": i["holdings"]},
                                            {'$inc': {"units": i["units"]}}))
      for i in sells:
              data_request.append(UpdateOne({"_id": i["holdings"]},
                                            {'$inc': {"frozenHoldingsUnits": -i["units"]}}))
    except Exception as e:
        print(f'ERROR:Could not run holdings updates function.\nException Details:\n\t{e}')
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
    try:
      # add all updateOnes to array for buy and sell
      # sets all transactions to completed
      for i in buys:
              data_request.append(UpdateOne({"_id": i["_id"]},
                                            {'$set': {"status": "COMPLETED"}}))
      for i in sells:
          data_request.append(UpdateOne({"_id": i["_id"]},
                                        {'$set': {"status": "COMPLETED"}}))
    except Exception as e:
        print(f'ERROR:Could not run transactions updates function.\nException Details:\n\t{e}')
    return data_request

def handler(event,context):
  ### connecting to database
  try:
    mongoURI = '' 
    environment = os.environ['ENVIRONMENT']
    if environment == 'prod':
        mongoURI = getSecret('MONGO_URI').get('Parameter').get('Value')
    elif environment == 'dev':
        mongoURI = os.environ['MONGOURI']
    # Get the mongo connection 
    client = connectToDB(mongoURI)
    # specify db and collections
    db = client[os.environ["DATABASENAME"]]
    stockCollection = db[os.environ["STOCKCOLLECTION"]]
    holdingsCollection = db[os.environ["HOLDINGSCOLLECTION"]]
    portfolioCollection = db[os.environ["PORTFOLIOCOLLECTION"]]
    transactionCollection = db[os.environ["TRANSACTIONCOLLECTION"]]
  
  except Exception as e:
    print(f'ERROR:Error encountered in connecting to the database.\nException Details:\n\t{e}')
    return {
        'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
    }   
  # run the web scraping program to get the current prices
  data_current_price = get_current_price()

  ### update the stocks collection
  try:
    # create the array with all of the UpdateOne requests
    # get the current time and convert to the correct format YYYY-MM-DDTHH:MM
    time_stamp = datetime.datetime.now()
    time_stamp_str = time_stamp.strftime('%Y-%m-%dT%H:%M')
    requests_database = create_data_request(data_current_price, time_stamp_str)

    # write these requests to the Database
    stockCollection.bulk_write(requests_database)

  except Exception as e:
        print(f'ERROR:Error encountered in handler function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
        }
  
  ### Limit Orders
  # get all actionable transactions
  transactions = getTransactions(transactionCollection)
  # get the list of buys and sells from the command cursor
  buyList, sellList = commandCursorToLists(transactions)
  # get the arrays of all updateOnes from the buys and sells for each collection
  holdingsUpdates = getHoldingsUpdates(buyList, sellList)
  portfolioUpdates = getPortfolioUpdates(buyList, sellList)
  transactionsupdates = getTransactionsUpdates(buyList, sellList)
  # initialise the match count to 0 so it's not referenced before initialisation below
  port_matched_count = 0
  hold_matched_count = 0
  trans_matched_count = 0

  # ensure the array is not empty so it doesn't throw an error
  if buyList + sellList != []:
        # portfolio updates
        try:
            portres = portfolioCollection.bulk_write(portfolioUpdates)
            port_matched_count = portres.matched_count
            print(port_matched_count)
        except Exception as e:
            print(f'ERROR:cannot bulk write to portfolios collection\nException Details:\n\t{e}')
            return {
              'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
        }
        # holdings updates
        try:
            holdres = holdingsCollection.bulk_write(holdingsUpdates)
            hold_matched_count = holdres.matched_count
            print(hold_matched_count)
        except Exception as e:
            print(f'ERROR:cannot bulk write to holdings collection\nException Details:\n\t{e}')
            return {
              'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
        }
        # transactions updates
        try:
            transres = transactionCollection.bulk_write(transactionsupdates)
            trans_matched_count = transres.matched_count
            print(trans_matched_count)
        except Exception as e:
            print(f'ERROR:cannot bulk write to transactions collection\nException Details:\n\t{e}')
            return {
              'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
        }
  else:
      print("nothing to action")

  return {
        'Message': 'Data Successfully Updated',
        'Time': time_stamp_str,
        'portfolios_matched': port_matched_count,
        'holdings_matched': hold_matched_count,
        'transactions_updated': trans_matched_count
    }
