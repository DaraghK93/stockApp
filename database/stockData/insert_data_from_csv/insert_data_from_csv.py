# This script takes a csv as input and adds each row as an entry into the MongoDB database "test"

# Module imports
import csv
from pymongo import MongoClient

# Setting the MongoDB connection
mongoClient = MongoClient("mongodb+srv://joeycor:X867a684!@cluster0.xzwrimn.mongodb.net/?retryWrites=true&w=majority")

# mongoClient = MongoClient("mongodb://admin:pass@ec2-3-249-127-86.eu-west-1.compute.amazonaws.com:27017/") 
db = mongoClient.test

# Setting the headers for the .csv file
header = ["exchange", "symbol","shortname","longname", "sector",	"industry",	"currentprice", "previousprice",	"changeabs", "changepercent", "marketcap", "ebitda", "revenuegrowth", "city", "state", "country", "fulltimeemployees", "longbusinesssummary", "weight", "erating", "srating", "grating"]
# Open the csv file with the data
csvfile = open('sp500_companies.csv', 'r')
reader = csv.DictReader( csvfile )

# Add each row to the Mongo database as a document
for each in reader:
    row={}
    for field in header:
        row[field]=each[field]
    db.sample_stock_data.insert_one(row)