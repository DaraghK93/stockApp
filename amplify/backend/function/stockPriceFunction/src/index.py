import json
import requests
from pymongo import MongoClient
import pandas as pd
from bs4 import BeautifulSoup
import datetime

client = MongoClient("mongodb+srv://joeycor:X867a684!@cluster0.xzwrimn.mongodb.net/?retryWrites=true&w=majority")
# client = MongoClient(connection)
db = client["test_database"]
collection = db['test_collection']

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
    output[data[i][2]] = {"longname": data[i][1], "symbol": data[i][2], "prices": {time_stamp: data[i][4]}, "daily_movement": data[i][5]}
  return output

def get_all_data(data_curr_price,  time_stamp):
  all_data = {}
  prices_dictionary = {}
  for company in data_curr_price:
    prices_dictionary[company] = {}
  for company in data_curr_price:
    prices_dictionary[company][time_stamp] = data_curr_price[company]['prices'][time_stamp] #["prices"][time_stamp]

  for key in data_curr_price:
    # print(prices_dictionary[key])
    all_data[key] = {"longname": data_curr_price[key]["longname"], "symbol": data_curr_price[key]["symbol"], 
    "prices": prices_dictionary[key],
    "daily_movement": data_curr_price[key]["daily_movement"]}
  # print(all_data)
  return all_data


def handler(event,context):
  time_stamp = datetime.datetime.now()
  time_stamp_str = time_stamp.strftime('%Y-%m-%dT%H:%M:%S')
  data_current_price = get_current_price(time_stamp_str)
  # data_combined = get_all_data(data_current_price, time_stamp_str)
  # data = json.dumps(data_current_price)
  # print(data_combined)
  # collection.insert_one(data_combined
  print(data_current_price)

  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps("data_current_price")
  }
