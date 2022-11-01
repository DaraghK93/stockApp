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

### Directory Setup ###
# For relative imports use the directory where script is running 
# This will change dynamically when running locallly or on AWS Lambda 
dir_path = os.path.dirname(os.path.realpath(__file__))

### NLTK Data ###
# NLTK reads its data from download files from a directory on local machine 
# like the location C:\Users\<USER>\nltk_data\
# This wont be present on the cloud but can tell nltk where to look for it by uploading data to lambda function 
nltk.download('vader_lexicon')
#nltk.data.path.append(f'{dir_path}/nltk_data')
from nltk.tokenize import RegexpTokenizer
from nltk.sentiment import SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()

#################################################################################################################
def lambda_handler(event, context):
    print(dir_path)

    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "message": "hello from news sentiment",
            }
        ),
    }
