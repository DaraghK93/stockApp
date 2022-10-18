## Description
#   This file 


### Imports ###
import sys
sys.path.append('./lib')
sys.path.append('../dataCleaning/lib')
import cleaningFunctions
import dataExploration


if __name__ == "__main__":
    # Orginal file and Cleaned File 
    cleanedFile = "../data/cleanedDatasets/dataset_1/multipleTopicsRemovedDF.csv"
    # Read the file in original and cleaned file 
    cleanedDF  = cleaningFunctions.readCSVFile(cleanedFile)
    # Plot the sentiment spread 
    dataExploration.plotSentimentSplit(cleanedDF,f'Dataset One Multiple Topics Removed - {len(cleanedDF.index)} Total News Headlines')