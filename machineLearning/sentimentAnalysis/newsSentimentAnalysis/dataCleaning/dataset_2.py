## Description
#   This file relates to the cleaning of dataset_2.csv

## Imports ##
import sys
sys.path.append('../../bin/')
from dataCleaning import cleaningFunctions

if __name__ == "__main__":
    file = "../data/originalDatasets/dataset_2/dataset_2.csv"
    # Detect the file format, this dataset has an odd format 
    fileEncoding = cleaningFunctions.detectFileEncoding(file)
    # Read in the file 
    df = cleaningFunctions.readCSVFile(file,fileEncoding)
    
    ### Word Count Added ###
    # Get the word count of the "headlines" column
    dfWithWordCount = cleaningFunctions.addWordCount(df)
    # Write the dataframe to the column 
    cleaningFunctions.writeToFile(dfWithWordCount,'../data/cleanedDatasets/dataset_2/wordCountOfHeadlinesAdded.csv')

