## Description
#   This file 


### Imports ###
import sys
sys.path.append('./lib')
sys.path.append('../dataCleaning/lib')
import cleaningFunctions
import dataExploration


visulisationOutputDir = './visulizations/dataset_3/'

if __name__ == "__main__":
    # Orginal file and Cleaned File 
    cleanedFile = "../data/cleanedDatasets/dataset_3/sentimentTagsUpdated.csv"
    # Read the file in original and cleaned file 
    cleanedDF  = cleaningFunctions.readCSVFile(cleanedFile)
    # Plot the sentiment spread 
    dataExploration.plotSentimentSplit(cleanedDF,f'Dataset Three - {len(cleanedDF.index)} Total News Headlines',f'{visulisationOutputDir}/sentimentSplit.png')