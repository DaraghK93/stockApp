import json
import pymongo
from cgi import print_arguments
from urllib import response
from pymongo import UpdateOne, MongoClient
# import certifi
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
    ele = [element for element in list if element['ticker'] == ticker][0]
    new_obj = {"environment_score": ele["environment_score"],
               "social_score": ele["social_score"],
               "governance_score": ele["governance_score"],
               "total": ele["total"]}
    return new_obj

def sendBulkUpdate(collection,stocklist,esgdata):
    # setting it to total now just to test
    data_request = []
    try:
        for i in stocklist:
            data_request.append(UpdateOne({"symbol": i}, {'$set': {"esgrating": getObjectByTicker(i,esgdata)}}))
        collection.bulk_write(data_request)
    except Exception as e:
        print(f'ERROR:cannot bulk write to database\nException Details:\n\t{e}')

def connectToDB(URI):
    client = pymongo.MongoClient(URI)
    if client is None:
        print(f'ERROR:Could not connect to MongoDB, client obeject is none')
    else:
        return client

def getSecret(secretName,region="eu-north-1"):
    client = boto3.client('ssm',region)
    try:
        response = client.get_parameter(
            Name=secretName,
            WithDecryption=True
        )
        return response
    except Exception as e:
        print(f'ERROR:Could not get secret in getSecret function.\nException Details:\n\t{e}')


# def sendToDB():
#     # get the list of objects we are sending to the DB
#     objectList, tickerlist = getData()
#     # connection string
#     connection = 'mongodb://admin:pass@ec2-3-249-127-86.eu-west-1.compute.amazonaws.com:27017/'
#     # establish connection with mongoDB cluster
#     # need to do tlsCAFile as the certs were wrong on my computer
#     client = MongoClient(connection)
#     # establish the database and collection
#     db = client['daragh']
#     collection = db['sample_stock_data']
#     # insert the documents into the collection
#     buildBulkUpdate(collection,tickerlist,objectList)
#     # collection.insert_many(objectList)


def handler(event, context):
    try:
        objectList, tickerlist = getData()

        mongoURI = getSecret('MONGO_URI').get('Parameter').get('Value')

        client = connectToDB(mongoURI)

        db = client['daragh']

        collection = db['sample_stock_data']

        sendBulkUpdate(collection,tickerlist,objectList)
        
     # Return a success message 
        return {
            'Message': 'ESG Ratings successfully updated',
            'Number of Articles Scraped': len(articles)
        }
        
    except Exception as e:
        print(f'ERROR:Error encountered in handler function.\nException Details:\n\t{e}')
        return {
            'Message': 'Error encountered, please view cloudwatch logs for detailied error messages',
        }


