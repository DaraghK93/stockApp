## Update 03/11/2022
- This directory contains 2 Python files, "model_1.ipynb" and "model_1.py".
- "model_1.ipynb" is the Jupyter notebook file that was used to test the reocmmender model. "model_1.py" is the starting point for converting the jupyter notebook into a python script that will eventually be deployed, this is not yet finished however when it is run it will give you recommendations for 3M (index = 0).
- To run the Jupyter notebook, open up the file and select the "run all" option at the top of the page.

## Update 01/11/2022
- Added file "model1.ipynb"
  -  Originally this was envisioned as a KNN model, however upon researching how to create a content based recommender system, one of the most popular methods was done using textual information and cosine similarity. This yielded better than expected results when running on the longbusinesssummary from the dataset. 
  - This is a Jupyter workbook used to:
    - Carry out some EDA on the dataset.
    - Create a function that provides the top 20 recommendations by cosine distance based on the longbusiness summary from the dataset.
    - This function was run on each company in the database, generating a dataframe with column 1 being the ticker symbol of the target company and columns 2-21 being the top 20 similar companies by cosine distance, in order of most similar.  
    - This result was written to the .csv file "cosine_sim_sp500.ipynb"
  - Because this is running on static data (i.e. the longbusinesssummary), it can be run once to generate the output .csv
  - It's not very clear how this is going to be integrated to the live site right now.