# import json
import requests
from pymongo import MongoClient, UpdateOne
import time
import os
import pandas as pd
from dotenv import load_dotenv
from pathlib import Path


def get_mongo_client():
    # gets the mongo path from an env file
    dotenv_path = Path('../database/.env')
    load_dotenv(dotenv_path=dotenv_path)
    mongo_uri_secret = os.getenv("mongo_uri")
    client = MongoClient(mongo_uri_secret)
    database = client.test
    return database


def get_historical_data(stock_symbol, api_key):
    # this function takes data from the Alpha Vantage API. Here we are requesting the following:
    # TIME_SERIES_DAILY - which provides daily time series information
    # stock_symbol - e.g. "MSFT" - would get all the data for Microsoft
    # outputsize - can get compact which is the last 5 months, or full, which gives full historical data for a company
    url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+stock_symbol+"&outputsize=full&apikey=" + api_key
    # request.get fetches the information from the api
    res = requests.get(url)
    # the data then needs to be converted to json
    stock_historical_data = res.json()
    # here we create two new dictionaries
    stock_historical = {}
    stock_historical_output = {}

    # the data we have received has a number of headings. Here we add the historical data to the stock_history dictionary.
    # The format of the dictionary will look like stock_historical[stock_symbol] and will give the daily prices
    stock_historical[stock_historical_data['Meta Data']['2. Symbol']] = stock_historical_data['Time Series (Daily)']

    for entry in stock_historical[stock_symbol]:
        # in this for loop we add in T20:00:00 to the price data as this is how we will also be receiving the current data
        # this format is stock_historical_output[YYYY-MM-DDT20:00:00] = price data for that day
        stock_historical_output[entry + "T20:00:00"] = stock_historical[stock_symbol][entry]

    # we then put this back into our stock_historical data in the same format as before
    stock_historical[stock_historical_data['Meta Data']['2. Symbol']] = stock_historical_output
    return stock_historical


def get_data_timer(stock_symbols, api_key):
    # this function runs every 60 seconds and gets 5 stock symbols at a time
    data_request = []
    for i in stock_symbols:
        historic = get_historical_data(i, api_key)
        stock_data[i] = historic[i]
        data_request.append(UpdateOne({"symbol": i}, {'$set': {"prices": stock_data[i]}}))
    return data_request


# Main Function
# get Mongoclient
db = get_mongo_client()

# First, the stock symbols are extracted from the csv file from Kaggle
columns = ["Symbol"]
output = []
df = pd.read_csv("sp500_companies.csv", usecols=columns)
sym = df['Symbol'].tolist()

# each stock symbol is then added to the list
stocklist = []
for ticker in sym:
    stocklist.append(ticker)

stock_data = {}
# Free API key from Alpha Vantage. The free tier allows for 5 requests per minute and 500 requests per day.
api_key_input = os.getenv("api_key1")

# Before starting the timer, run it once so that we don't have to wait 60 seconds longer
request_to_db = get_data_timer(stocklist[0:5], api_key_input)

# set bottom number and top number that will be used in the range for the stock list
bottom_number = 5
top_number = bottom_number + 5

# set start time
start_time = time.time()
datarequest = []

# set the wait
seconds = 60
while True:
    # this while loop makes sure that we have to wait 60 seconds between each request due to the constraints on requests
    current_time = time.time()
    elapsed_time = current_time - start_time
    if elapsed_time > seconds:
        output = (get_data_timer(stocklist[bottom_number:top_number], api_key_input))
        for element in output:
            datarequest.append(element)
        #
        bottom_number += 5
        top_number = bottom_number + 5
        start_time = current_time
    if len(datarequest) > 150:
        # due to the number of requests needed and testing, a second API was needed
        api_key_input = ["api_key2"]
    if len(datarequest) == len(stocklist) - 5:
        # check if the length of the datarequest list is the same length as the stocklist, if so break
        break

for element in datarequest:
    request_to_db.append(element)

# the below will write a bulk request to the mongoDB database
db.sample_stock_data.bulk_write(request_to_db)
