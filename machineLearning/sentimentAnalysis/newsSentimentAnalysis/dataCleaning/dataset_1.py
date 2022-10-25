## Description:
#   This file relates to the cleaning of dataset_1.csv 

### Imports ###
import sys
sys.path.append('../../bin/')
from dataCleaning import cleaningFunctions

if __name__ == "__main__":
    file = "../data/originalDatasets/dataset_1/dataset_1.csv"
    # Read the file in 
    df = cleaningFunctions.readCSVFile(file)
    # Remove multiple topics
    #   Remove multiple topics for now, may use the multiple topics in the future but for first version use just one topic per headline. 
    multipleTopicsRemovedDF = cleaningFunctions.datasetOneRemoveMultipleTopics(df)
    # Drop the topics columns completely for now 
    multipleTopicsRemovedDF = cleaningFunctions.removeColumn(multipleTopicsRemovedDF,'topic')
    # Wrtie the dataframe to a csv file
    cleaningFunctions.writeToFile(multipleTopicsRemovedDF,'../data/cleanedDatasets/dataset_1/multipleTopicsRemovedDF.csv')

