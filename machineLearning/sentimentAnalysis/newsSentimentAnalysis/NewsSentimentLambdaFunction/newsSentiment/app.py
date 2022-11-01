### Description ###
#   This file is the main entry point to the lambda function 
#   The function parses the RSS feeds for news articles 
#   Classifies the sentiment of these articles as either positive, neutral or negative
#   Then sends the data to the database 

### Imports ###
import json
import os 
import feedparser
import boto3 
import pymongo
from pymongo.errors import DuplicateKeyError
from datetime import datetime
from datetime import timedelta
from time import mktime
from bs4 import  BeautifulSoup
import pickle
import csv
from statistics import mean
import nltk 


#################################################################################################################
def lambda_handler(event, context):
    

    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "message": "hello from news sentiment",
            }
        ),
    }
