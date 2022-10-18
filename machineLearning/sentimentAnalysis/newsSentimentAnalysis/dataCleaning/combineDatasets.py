## Description:
#   This file is used to combine cleaned datasets. There will be multiple combinations. 

### Imports ###
import sys
sys.path.append('./lib')
import cleaningFunctions


if __name__ == "__main__":
    ### Cobination One ###
    datasetOne   = "../data/cleanedDatasets/dataset_1/multipleTopicsRemovedDF.csv"
    datasetTwo   = "../data/cleanedDatasets/dataset_2/wordCountOfHeadlinesAdded.csv"
    datasetThree = "../data/cleanedDatasets/dataset_3/sentimentTagsUpdated.csv" 
    dfOne = cleaningFunctions.readCSVFile(datasetOne)
    dfTwo = cleaningFunctions.readCSVFile(datasetTwo)
    dfThree = cleaningFunctions.readCSVFile(datasetThree)
    # combine the datasets
    combinationOne = cleaningFunctions.combineDatasets([dfOne,dfTwo,dfThree])
    # Write to file 
    cleaningFunctions.writeToFile(combinationOne,'../data/cleanedDatasets/combinedDatasets/combinationOne.csv')


