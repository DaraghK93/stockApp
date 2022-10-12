# This script was used to generate the Mongoose schema for the user portfolio.
# The script takes in the .csv file 'sp500_companies.csv' with company information, takes each company ticker symbol and writes it to the  text file 'output.txt'

# Script imports, pandas was used as it enables us to work with their data frame models
import pandas as pd

# Naming the columns needed
columns = ["Exchange", "Symbol", "Shortname", "Longname"]
output = ""
# Read in the csv
df = pd.read_csv("sp500_companies.csv", usecols=columns)
# Add each company ticker symbol to a list
sym = df['Symbol'].tolist()
# String needed for creating the schema format
a = ": {type: Number, trim: true, required: true},"

# For loop iterates over the list of tickers and formats it into the final string
for ticker in sym:
    if "-" in ticker:
        ticker.replace('-', '')
    output += ticker + a + "\n"

# Open the 'output.txt' file and write the final string to it
f = open("output.txt", 'w')
f.write(output)
# print(output)
