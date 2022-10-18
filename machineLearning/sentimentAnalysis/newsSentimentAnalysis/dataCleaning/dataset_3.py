## Description
#   This file relates to the cleaning of dataset_3.csv

import sys
sys.path.append('./lib')
import cleaningFunctions

if __name__ == "__main__":
    file = "../data/originalDatasets/dataset_3/SEN_en_R_nooutlier.csv"
    # Detect the file format, this dataset has an odd format 
    fileEncoding = cleaningFunctions.detectFileEncoding(file)
    # Read in the file 
    df = cleaningFunctions.readCSVFile(file,fileEncoding,0)


    ### Cleaning ###
    # Replace the "neutr","pos","neg" tags with "neutral","positive","negative" in the sentiment column 
    df = cleaningFunctions.replaceValues(df,["neutr","pos","neg"],["neutral","positive","negative"],'sentiment')
    # Remove values where the sentiment is unk 
    df = cleaningFunctions.deleteValues(df,'sentiment','unk')
    # Add the word count 
    df = cleaningFunctions.addWordCount(df)
    # Drop the topics columns completely for now 
    df = cleaningFunctions.removeColumn(df,'topic')
    # Write to the file 
    cleaningFunctions.writeToFile(df,'../data/cleanedDatasets/dataset_3/sentimentTagsUpdated.csv')