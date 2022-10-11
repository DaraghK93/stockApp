# Import os, boto3, the AWS Python SDK, and pandas for csv manipulation
import os
import boto3
import pandas as pd
from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path('../database/.env')
load_dotenv(dotenv_path=dotenv_path)
ACCESS_KEY = os.getenv(access_key)
SECRET_KEY = os.getenv(secret_key)

# This function returns a list of all filenames in the stockapplogobucket S3 bucket
# This was needed so that the URL for each image could be input into the database


def list_s3_files_using_client():
    ACCESS_KEY = ""
    SECRET_KEY = ""
    s3 = boto3.client("s3", aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)
    s3_client = boto3.client("s3")
    bucket_name = "stockapplogobucket"
    response = s3_client.list_objects_v2(Bucket=bucket_name)
    files = response.get("Contents")
    # print("Files: ",files)
    all_list = []
    for file in files:
        # print(f"file_name: {file['Key']}")
        filename = file['Key']
        url1 = "https://stockapplogobucket.s3.eu-west-1.amazonaws.com/"
        url = url1 + filename
        url = url.lower()
        # print(url)
        all_list.append(url)
    # print("Before sorting", all_list)
    all_list.sort()
    # print("After sorting", all_list)
    return (all_list)


# This function takes in a list and writes it to a column in an existing csv
def write_column_to_csv(logo_list):
    df = pd.read_csv('sp500_companies.csv')
    new_column = pd.DataFrame({'logo': logo_list})
    df = df.merge(new_column, left_index=True, right_index=True)
    df.to_csv('sp500_companies_with_logo_2.csv')
    return ("Successfully wrote column to csv!")


# This function renames all files in a directory to lower case
# This was needed for creating the logos urls for the database as S3 urls are case sensitive
def convert_to_lower():
    first = os.listdir()
    for file in os.listdir():
        os.rename(file, file.lower())
    then = os.listdir()
    for file, file2 in zip(first, then):
        print(file, "-", file2)
    return "Done, all files to lower case"


# Calls the function that gets the filesnames and saves the list as
logo_list = list_s3_files_using_client()
write_column_to_csv(logo_list)
