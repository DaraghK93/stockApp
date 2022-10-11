# This script was used to generate the Mongoose schema for the user portfolio.
import pandas as pd

columns = ["Exchange", "Symbol","Shortname","Longname"]
output = ""
df = pd.read_csv("sp500_companies.csv", usecols=columns)
sym = df['Symbol'].tolist()
a = ": {type: Number, trim: true, required: true},"

for ticker in sym:
    if "-" in ticker:
        ticker.replace('-','')
    output += ticker + a + "\n"

f = open("output.txt", 'w')
f.write(output)
print(output)