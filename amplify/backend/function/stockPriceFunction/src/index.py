import json
import requests
from pymongo import MongoClient, UpdateOne
from bs4 import BeautifulSoup
import datetime
import os
import boto3

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
      

  output = {}
  for i in range(0, len(data)):
    # add to dictionary in the form Symbol: Price
    output[data[i][2]] = {"currentprice": data[i][4], "absoluteChange": data[i][5], "percentageChange": data[i][6].strip("()")}
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
          data_request.append(UpdateOne({"symbol": i_new}, {'$set': {name: {"time": time_stamp, "4. close": data_curr_price[i]["currentprice"]}}}))
      else:
        # The first append here relates to the field daily_change. This will be overwritten every time.
        data_request.append(UpdateOne({"symbol": i}, {'$set': {"daily_change": data_curr_price[i]}}))

        # This append relates to the prices.time_stamp field. It will add a new field to prices in the form
        # prices: {"YYYY-MM-DDThh:mm:ss": {"4. close": price at that time}}
        # Needs to be in the format "4. close" as this is the field name for the rest of the historic values.
        data_request.append(UpdateOne({"symbol": i}, {'$set': {name: {"4. close": data_curr_price[i]["currentprice"]}}}))
    
    except KeyError:
      # this KeyError will flag if a stock is missing from the input dictionary. 
      # It shouldn't stop the program from running as the rest of the values should be updated.
      # It should let inform which stocks are missing from the web scrape.
      print("Check: Stock ", {i}, " missing from the web scrape or the database. This could be due to a change in allocation for the S&P500 where a stock was added or removed.")
      continue
  
  return data_request


def handler(event,context):
  try:
    mongoURI = '' 
    environment = os.environ['ENVIRONMENT']
    if environment == 'prod':
        mongoURI = getSecret('MONGO_URI').get('Parameter').get('Value')
    elif environment == 'dev':
        mongoURI = os.environ['MONGOURI']
    # Get the mongo connection 
    client = connectToDB(mongoURI)
    

    # specify db and collection
    db = client[os.environ["DATABASENAME"]]
    collection = db.sample_stock_data
    # doc_list = collection.find({})
    # doc_list_count = []
    # for doc in doc_list:
    #   doc_list_count.append(doc)
    # doc_list_count_length = len(doc_list_count)

    # print(length_collection, "length")
  except Exception as e:
    print(f'ERROR:Error encountered in connecting to the database.\nException Details:\n\t{e}')
    return {
        'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
    }   

  # run the web scraping program to get the current prices
  data_current_price = get_current_price()

  
  
  try:
    # create the array with all of the UpdateOne requests
    # get the current time and convert to the correct format YYYY-MM-DDTHH:MM:SS
    time_stamp = datetime.datetime.now()
    time_stamp_str = time_stamp.strftime('%Y-%m-%dT%H:%M:%S')
    requests_database = create_data_request(data_current_price, time_stamp_str)

    # write these requests to the Database
    collection.bulk_write(requests_database)

    return {
        'Message': 'Data Successfully Updated',
        'Time': time_stamp_str
    }
  except Exception as e:
        print(f'ERROR:Error encountered in handler function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
        }   
