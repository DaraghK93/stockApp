import json
import pymongo
from cgi import print_arguments
from urllib import response
from pymongo import UpdateOne, MongoClient
import requests
import boto3
import os

# set path variable for use 
dir_path = os.path.dirname(os.path.realpath(__file__))


def getTickersAndExch(file):
# open the file containing the list of companies and exchanges and read it in
    try:
        f = open(file,'r')
        # query string needs to be a string of companies seperated by comma
        # have to remove line breaks and special characters
        companies = ""
        for line in f:
            line = line.replace("\n","")
            line = line.replace("\ufeff","")
            companies += line + ","

        # make this long string a list, each element split by a comma
        companies = companies.split(",")
        f.close()
        return companies
    except Exception as e:
        print(f'ERROR:Occured in trying to read file and process\nException message:\n\t{e}')


def sendRequest(query):
    # send request to the API using the requests library
    url = "https://esg-environmental-social-governance-data.p.rapidapi.com/search"

    querystring = {"q": query}

    headers = {
        "X-RapidAPI-Key": "72cd6137admsh208b33ebe19178cp1b23abjsnaf1011799ba7",
        "X-RapidAPI-Host": "esg-environmental-social-governance-data.p.rapidapi.com"
    }
    try:
        response = requests.request("GET", url, headers=headers, params=querystring)
        # make the string into json so we can parse it
        response = json.loads(response.text)
        return response
    except Exception as e:
        print(f'ERROR:Cannot connect to external API at:{url}.\nException Details:\n\t{e}')
        return None


def getData():
    # API only takes in 100 companies at a time, so need to split into 5 requests
    # get the list of companies
    try:
        companies = getTickersAndExch(f'{dir_path}/lib/companies.txt')
        response1 = sendRequest(",".join(companies[:101]))
        response2 = sendRequest(",".join(companies[101:201]))
        response3 = sendRequest(",".join(companies[201:301]))
        response4 = sendRequest(",".join(companies[301:401]))
        response5 = sendRequest(",".join(companies[401:486]))
    except Exception as e:
        print(f'ERROR:error in reading file or index error for array\nException Details:\n\t{e}')

    # concatenate these responses into one list of objects before we send to DB
    concatResponse = response1 + response2 + response3 + response4 + response5
    
    # empty list that we will add the objects to
    # only need some attributes so iterate through list and take the ones we want
    # add to list and return it
    tickerlist = []
    responseList = []

    for i in concatResponse:
        newdict = dict()
        newdict["ticker"] = i['stock_symbol']
        tickerlist.append(i['stock_symbol'])
        newdict["company_name"] = i['company_name']
        newdict["environment_score"] = i['environment_score']
        newdict["social_score"] = i['social_score']
        newdict["governance_score"] = i['governance_score']
        newdict["total"] = i['total']
        responseList.append(newdict)
    return responseList, tickerlist


def getObjectByTicker(ticker, list):

    # used to get matching tickers for Mongo query
    # get the object that matches that ticker
    # create a new object from that that only has the info we want to send to the DB
    # eaasier to do it with list comp and get first element
    ele = [element for element in list if element['ticker'] == ticker][0]
    new_obj = {"environment_score": ele["environment_score"],
               "social_score": ele["social_score"],
               "governance_score": ele["governance_score"],
               "total": ele["total"]}
    return new_obj


def sendBulkUpdate(collection,stocklist,esgdata):

    # build the bulk write request to send to DB
    # empty array to which the queries are added
    data_request = []

    # loop through the list of stocks returned
    # match by ticker symbol and update
    # bulk write this list of updates
    # return matched_count, which gives you a count of the records that were matced in the update
    try:
        for i in stocklist:
            data_request.append(UpdateOne({"symbol": i}, {'$set': {"esgrating": getObjectByTicker(i,esgdata)}}))
        res = collection.bulk_write(data_request)
        matched_count = res.matched_count
        return matched_count
    except Exception as e:
        print(f'ERROR:cannot bulk write to database\nException Details:\n\t{e}')


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


def handler(event, context):
    try:
        # get list of objects to update from txt file and list tickers to match them
        objectList, tickerlist = getData()

        # get the URI from secret
        mongoURI = getSecret('MONGO_URI').get('Parameter').get('Value')

        # connect to DB
        client = connectToDB(mongoURI)

        # specify db and collection
        db = client[os.environ["DATABASE"]]
        collection = db[os.environ["COLLECTION"]]

        # update the DB with the data from API
        updateDB = sendBulkUpdate(collection,tickerlist,objectList)

     # Return a success message 
        return {
            'Message': 'ESG Ratings successfully updated',
            'Number of records matched': updateDB
        }
        
    except Exception as e:
        print(f'ERROR:Error encountered in handler function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
        }


