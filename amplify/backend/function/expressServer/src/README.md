# Express Server
This directory holds the code for the express lambda function. 

## Running Locally 
To run the server locally create a ```.env``` file within this directory with the following contents.

```
ENVIRONMENT=dev
MONGO_URI=mongodb://localhost:27017/dev
JWT_SECRET=<Ask_For_Value>
```

Install the dependecies in the package.json file. 

```
npm install 
```

There are then two ways of running it. 

 1. Through Nodemon - ```npm run server```
 2. Normal Express  - ```npm start```