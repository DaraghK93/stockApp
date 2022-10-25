### Imports ###
import sys
sys.path.append('../../bin/')
from database import databaseFunctions
from modelTraining import modelFunctions
import os
from dotenv import load_dotenv
load_dotenv()




if __name__ == "__main__":
    # Get mngo uri form .env
    mongoURI =  os.getenv('MONGO_URI')
    # Get a database connect 
    con = databaseFunctions.getMongoConnection(mongoURI)
    # Get the articles headlines 
    articles = databaseFunctions.getArticles(con)