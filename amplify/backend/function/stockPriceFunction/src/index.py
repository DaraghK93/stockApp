import json
import requests
from pymongo import MongoClient, UpdateOne
from bs4 import BeautifulSoup
import datetime
import os
import boto3

# set path variable for use 
dir_path = os.path.dirname(os.path.realpath(__file__))

def connectToDB(URI):
    # connect to the mongo instance
    # return error if connection fails
    client = MongoClient(URI)
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
# client = MongoClient("mongodb+srv://joeycor:X867a684!@cluster0.xzwrimn.mongodb.net/?retryWrites=true&w=majority")
# database = client.test

def get_current_price():
  scrapeURL = "https://www.slickcharts.com/sp500"
  agent = {"User-Agent":'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'}
  page = requests.get(scrapeURL, headers=agent)
  soup = BeautifulSoup(page.content, "html.parser")

  # Method for scraping a table taken from:
  # stack overflow https://stackoverflow.com/questions/23377533/python-beautifulsoup-parsing-table
  data = []
  table = soup.find('table', attrs={'class': 'table table-hover table-borderless table-sm'})
  table_body = table.find('tbody')

  rows = table_body.find_all('tr')
  for row in rows:
      cols = row.find_all('td')
      cols = [ele.text.strip()for ele in cols]
      data.append(cols)
      if len(data) > 500:
        break

  output = {}
  for i in range(0, len(data)):
    output[data[i][2]] = data[i][4]
  return output

def create_data_request(data_curr_price, time_stamp):
  # all_data = {}
  data_request = []
  # name = "Prices." + time_stamp
  for i in data_curr_price:
    try:
      if i == "BRK.B":
        i_new = "BRK-B"
        data_request.append(UpdateOne({"Symbol": i_new}, {'$set': {"Prices.currentprice": {"time": time_stamp, "4. close": data_curr_price[i]}}}))
      else:
        data_request.append(UpdateOne({"Symbol": i}, {'$set': {"Prices.currentprice": {"time": time_stamp, "4. close": data_curr_price[i]}}}))
    except KeyError:
      continue
  return data_request


def handler(event,context):
  try:
    client = MongoClient("mongodb+srv://joeycor:X867a684!@cluster0.xzwrimn.mongodb.net/?retryWrites=true&w=majority")
    db = client.test
  except Exception as e:
    print(f'ERROR:Error encountered in handler function.\nException Details:\n\t{e}')
    return {
        'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
    }   

  # get the current time and convert to the correct format YYYY-MM-DDTHH:MM:SS
  time_stamp = datetime.datetime.now()
  time_stamp_str = time_stamp.strftime('%Y-%m-%dT%H:%M:%S')

  # run the web scraping program to get the current prices
  data_current_price = get_current_price()

  # get data from all stocks
  all_stocks_data = db.sample_stock_data.find({})
  data_request_current_price_to_timestamp = []

  # loop through the data, going through each stock symbol
  for i in all_stocks_data:
    try:
      # due to issues with BRK.B on slickcharts and BRK-B everywhere else this has to be done separately
      if i["Symbol"] == "BRK.B":
        i["Symbol"] = "BRK-B"
      
      # here we create our timestamp which will be used so that the format is correct
      # correct format: Prices.time_stamp_key: previous current price
      time_stamp_key = "Prices." + i["Prices"]["currentprice"]["time"]

      # each of these is added to an array which will be utilised in the bulk write
      data_request_current_price_to_timestamp.append(UpdateOne({"Symbol": i["Symbol"]}, {'$set': {time_stamp_key: {"4. close": i["Prices"]["currentprice"]["4. close"]}}}))
    except KeyError:
      continue
  
  try:

        # get the URI from secret
        # mongoURI = getSecret('MONGO_URI').get('Parameter').get('Value')

        # connect to DB
        # client = connectToDB(mongoURI)
        

        # specify db and collection
        # db = client[os.environ["DATABASE"]]
        # collection = db[os.environ["COLLECTION"]]

        # update the DB with the data from API
        db.sample_stock_data.bulk_write(data_request_current_price_to_timestamp)
        requests_database = create_data_request(data_current_price, time_stamp_str)
        db.sample_stock_data.bulk_write(requests_database)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps("Updated")
        }
  except Exception as e:
        print(f'ERROR:Error encountered in handler function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
        }   
