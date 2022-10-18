import pandas as pd
import json 
import chardet

def readCSVFile(filepath,encoding='utf8',index_col=None):
    """
    Reads in csv file to Pandas dataframe

    Args:
        filepath (string): relative file path 
        encoding (string): The encoding of the file being read - Optional 
        index_col (Int): If there is an index column to be used - Optional 

    Returns:
        df (pandas Dataframe): Pandas dataframe with csv in it 
    """
    try:
        df = pd.read_csv(filepath,encoding=encoding,index_col=index_col)
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

def detectFileEncoding(filepath):
    """
    Detects the file encoding of a file. 

    Args:
        filepath (string): The file path. 

    Returns:
        (string): The file enconding 
    """
    try:
        with open(filepath, 'rb') as rawdata:
            # Detect the file format 
            result = chardet.detect(rawdata.read(100000))
        return result['encoding']
    except Exception as e:
        print(f'Error in detecting file format in detectFileFormat function. Exception details\n{e}')


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



def addWordCount(df):
    """
    This function counts the words in the "headline" column.

    Args:
        df (Pandas Dataframe): A pandas dataframe with a column called "headline"

    Returns:
        df (Pandas Dataframe): Pandas dataframe with new column called "words"
    """
    try:
        df['words'] = df['headline'].str.count(' ') + 1
        return df
    except Exception as e:
        print(f'Error in getting word count in addWordCount function. Exception details\n{e}')


def deleteValues(df,col,val):
    """
    Used to delete entries based upon the value in particular column. 
    The entire row will be deleted. 

    Args:
        df (Pandas Dataframe): Dataframe to delete values in 
        col (String): Column name to delete values in 
        val (String): The value to delete

    Returns:
        _type_: _description_
    """
    try:
        df = df[df[col] != val]
        df.reset_index(drop=True, inplace=True)
        return df
    except Exception as e:
        print(f'Error in deleteing words in deleteValues function. Exception details\n{e}')
    


def replaceValues(df,values,replacementValues,col):
    """
    Used to replace values in a dataframe. 

    Args:
        df (Pandas Dataframe): The pandas dataframe to replace values. 
        values (List): List of values to replace, must be same length as replacementValues input. 
        replacementValues (List): List of values to replace with, must be same length as replacementValues input.
        col (string): The column name the values will be replaced in

    Returns:
        df (Pandas Dataframe): Updated pandas dataframe with removed values. 
    """
    try:
        df[col] = df[[col]].replace(values,replacementValues)
        return df
    except Exception as e:
        print(f'Error in replacig values function. Exception details {e}')



    



