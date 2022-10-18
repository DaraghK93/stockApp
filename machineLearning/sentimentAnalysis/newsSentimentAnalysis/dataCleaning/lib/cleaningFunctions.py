import pandas as pd
import json 

def readCSVFile(filepath):
    """
    Reads in csv file to Pandas dataframe

    Args:
        filepath (string): relative file path 

    Returns:
        df (pandas Dataframe): Pandas dataframe with csv in it 
    """
    try:
        df = pd.read_csv(filepath)
        return df
    except Exception as e:
        print(f'Error reading in file. Exception details\n{e}')

def writeToFile(df,filepath):
    """
    This function writes a pandas dataframe to a file 

    Args:
        df (Pandas Dataframe): A pandas dataframe object. 
        filepath (string): The filepath to write to
    """
    try:
        df.to_csv(filepath,index=False)
        # leave in a print statment makes it easier to tell in console if file has actually been written to 
        print(f'File {filepath} written to')
    except Exception as e:
        print(f'Error in writing dataframe to file. Exception details\n{e}')


def datasetOneRemoveMultipleTopics(df):
    """
    In dataset one the "decisions" column is a JSON object. 
    The key is the topic and the value is the sentiment of that topic in the headline. 
    This function removes values which have multiple topics only focusing on one. 

    Args:
        df (pandas Dataframe): Pandas dataframe of dataset_1.csv

    Returns:
        newDF(pandas Dataframe): New dataframe with the cols sentiment, headline, words and topic with the multiple topics entrys removed. 
    """
    try:
        newRecords = [] 
        for _, row in df.iterrows():
            # decisions is a dictonary, there can be multiple decisions if there are multiple topics 
            decisions = json.loads(row['Decisions'])
            # If a decision is lenght 1 then only 1 topic
            if len(decisions) == 1:
                # The key to the decision will be the topic 
                topic = list(decisions.keys())[0]
                sentiment = decisions[topic]
                # Create a new row using this information 
                newRow = {'sentiment':sentiment,'headline': row['Title'],'words':row['Words'],'topic':topic}
                newRecords.append(newRow)
        # Create a dataframe from these new records 
        newDF = pd.DataFrame.from_records(newRecords)
        return newDF
    except Exception as e:
        print(f'Error in removng multiple topics from datasetOne. Exception details\n{e}')
