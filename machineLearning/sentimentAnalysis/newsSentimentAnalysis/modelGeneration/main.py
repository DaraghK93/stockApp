import sys
sys.path.append('../../bin')
from modelTraining import modelFunctions
import pandas as pd 
import csv

if __name__ == "__main__":
    modelFile = [
        {"modelNumber": 1, "file":"./model_1/evaluationResults.csv"},
        {"modelNumber": 2, "file":"./model_2/evaluationResults.csv"},
        {"modelNumber": 3, "file":"./model_3/evaluationResults.csv"},
        {"modelNumber": 4, "file":"./model_4/evaluationResults.csv"},
        {"modelNumber": 5, "file":"./model_5/evaluationResults.csv"},
        {"modelNumber": 6, "file":"./model_6/evaluationResults.csv"}
    ]

    files = []

    for object in modelFile:
        df = pd.read_csv(object["file"], index_col=None, header=0)
        df["model number"] = [object["modelNumber"]]*10
        files.append(df) 
    results = pd.concat(files,axis=0,ignore_index=True)
    results.to_csv("OverallEvaulations.csv", index = False, header=True)
     # Obtained from stack overflow
    for col in results:
        if col != "model" and col != "model number":
            results[col] =results[col].str.rstrip('%').astype('float') /100.0
    # Get the maxIds  
    maxIds = (results.idxmax(numeric_only=True))
    ## Open file to write results to and write header 
    f = open('./highestEvaluationResults.csv', 'w', newline='')
    print(maxIds)
    writer = csv.writer(f)
    writer.writerow(['metric','model','score', 'iteration'])
    ## Print results to terminal and write them to csv file 
    print(f'\t\t******Highest Evaluation Results*******')
    for index, value in maxIds.items():
        if index != "model number":
            print(f' \033[1m{index :<20}\033[0m - {results.loc[value,"model"] :>20} ({results[index][value]:.2%}) - Model Number {results.loc[value,"model number"]}')
            writer.writerow([index,results.loc[value,"model"],f'{results[index][value]:.2%}',results.loc[value,"model number"]])

