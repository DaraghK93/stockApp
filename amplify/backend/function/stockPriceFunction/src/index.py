import json
import requests
from pymongo import MongoClient, UpdateOne
import pandas as pd
from bs4 import BeautifulSoup
import datetime

client = MongoClient("mongodb+srv://joeycor:X867a684!@cluster0.xzwrimn.mongodb.net/?retryWrites=true&w=majority")
# client = MongoClient(connection)
database = client.test

def get_current_price(time_stamp):
  URL = "https://www.slickcharts.com/sp500"
  agent = {"User-Agent":'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'}
  page = requests.get(URL, headers=agent)
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
      # what's ele
      data.append(cols)
      # print(len(data))
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
    if i == "BRK.B":
      i = "BRK-B"
    data_request.append(UpdateOne({"Symbol": i}, {'$set': {"Prices.currentprice": {"time": time_stamp, "4. close": data_curr_price[i]}}}))

  return data_request


def handler(event,context):
  time_stamp = datetime.datetime.now()
  time_stamp_str = time_stamp.strftime('%Y-%m-%dT%H:%M:%S')
  data_current_price = get_current_price(time_stamp_str)
  x = database.sample_stock_data.find({})
  data_request_current_price_to_timestamp = []
  for i in x:
    try:
      if i["Symbol"] == "BRK.B":
        i["Symbol"] = "BRK-B"
      time_stamp_key = "Prices." + i["Prices"]["currentprice"]["time"]
      print(i["Symbol"])
      print(i["Symbol"], time_stamp_key)
      data_request_current_price_to_timestamp.append(UpdateOne({"Symbol": i["Symbol"]}, {'$set': {time_stamp_key: i["Prices"]["currentprice"]["4. close"]}}))
    except KeyError:
      continue
  database.sample_stock_data.bulk_write(data_request_current_price_to_timestamp)
  requests_database = create_data_request(data_current_price, time_stamp_str)
  database.sample_stock_data.bulk_write(requests_database)

  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps("HELLO")
  }
