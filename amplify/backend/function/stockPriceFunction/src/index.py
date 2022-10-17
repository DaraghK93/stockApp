import json
import requests
from pymongo import MongoClient, UpdateOne
from bs4 import BeautifulSoup
import datetime
import os
import boto3

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


def get_current_price():
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
      data.append(cols)
      if len(data) > 495:
        break

  output = {}
  for i in range(0, len(data)):
    # add to dictionary in the form Symbol: Price
    output[data[i][2]] = {"currentprice": data[i][4], "absoluteChange": data[i][5], "percentageChange": data[i][6].strip("()")}
  return output

def create_data_request(data_curr_price, time_stamp):
  data_request = []
  name = "prices." + time_stamp
  for i in data_curr_price:
    try:
      if i == "BRK.B":
        i_new = "BRK-B"
        data_request.append(UpdateOne({"symbol": i_new}, {'$set': {"daily_change": data_curr_price[i_new]}}))
        data_request.append(UpdateOne({"symbol": i_new}, {'$set': {name: {"time": time_stamp, "4. close": data_curr_price[i]["currentprice"]}}}))
      else:
        data_request.append(UpdateOne({"symbol": i}, {'$set': {"daily_change": data_curr_price[i]}}))
        data_request.append(UpdateOne({"symbol": i}, {'$set': {name: {"time": time_stamp, "4. close": data_curr_price[i]["currentprice"]}}}))
    except KeyError:
      continue
  return data_request


def handler(event,context):
  try:
    # get the URI from secret
    mongoURI = getSecret('MONGO_URI').get('Parameter').get('Value')

    # connect to DB
    client = connectToDB(mongoURI)
    

    # specify db and collection
    db = client[os.environ["DATABASE"]]
    collection = db[os.environ["COLLECTION"]]
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

  
  
  try:

        # update the DB with the data from API
        # db.sample_stock_data.bulk_write(data_request_current_price_change)
        requests_database = create_data_request(data_current_price, time_stamp_str)
        collection.bulk_write(requests_database)

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
