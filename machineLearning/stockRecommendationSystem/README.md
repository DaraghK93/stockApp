# Stock Recommendation System

## Update 01/11/2022
- Added file "cosine_sim_sp500.ipynb"
  - This is a Jupyter workbook usedto:
    - Carry out some EDA on the dataset
    - Create a function that provides the top 20 recommendations by cosine distance based on the longbusiness summary from the dataset. Originally this was planned as a KNN model, however the longbusinesssummary proved to be a lot more reliable than expected and does suggest similar companies. 
    - This function was run on each company in the database, generating a dataframe with column 1 being the ticker symbol of the target company and columns 2-21 being the top 20 similar companies by cosine distance, in order of most similar.  
    - This result was written to the .csv file "cosine_sim_sp500.ipynb"