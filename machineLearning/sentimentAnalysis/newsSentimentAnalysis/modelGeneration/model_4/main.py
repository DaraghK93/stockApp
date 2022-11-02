## Description:
#       This file relates to model_3 training and feature engineering
#       Running this script will generate a report and pickle files to the "models" directory
#       ***DO NOT MAKE MASSIVE CHANGES TO THIS FILE OR PREFERABLY NONE AT ALL, GOOD FOR REPORT TO KEEP VERSIONS OF ITERATIONS***
## Differecnes 
#       This version of the model uses the https://sraf.nd.edu/loughranmcdonald-master-dictionary/ word dictionary for the negative, possitive word count 
#       Credit to Caolan for cleaning this dataset 

### Imports ###
import sys
sys.path.append('../../../bin')
from dataCleaning import cleaningFunctions
from featureEngineering import featureEngineeringFunctions
from modelTraining import modelFunctions

