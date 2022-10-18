# Daily Stock Data Ingress
This directory is for the Lambda function
 ```stockPriceFunction```.
 This function scrapes data from slickcharts.com and sends this data as an object to the corresponding records in the Database.

## Enviroment Variables
This function uses  environment variables. If you want to run the script locally you need to create a ```.env``` with the contnent below in the base directory. ***NEVER UPLOAD YOUR .env FILE TO GITHUB***

```
ENVIRONMENT=dev
MONGOURI=mongodb://localhost:27017/
DATABASENAME=test
```

## Running Locally 
Use the command ```amplify mock function``` to run the function locally. 

## Triggers 
This function runs on a scheduled trigger executing every 20 minutes

