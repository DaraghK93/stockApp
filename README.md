Team Members:
Joseph Corcoran
Caolán Power
Rebecca Kelly
Bearach Byrne
Warren Kavanagh
Daragh Kneeshaw

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

----


**The below is information on how to set up MongoDB through Docker on an AWS EC2 instance**
## Database Information

### EC2 Instance Setup - General Notes:
1. Ensure inbound rules are set up correctly through a security group. Inbound rules can be set to allow all traffic as authentication is required when connecting. * **This may need to be revisited.** *
2. Ensure outbound rules are set up correctly through a security group. Outbound rules can be set to allow all traffic for now. * **This may need to be revisited.** *

### Database Connection Information:
## EC2 Instance
1. Instance Address: EC2 Instance IPv4 DNS address - **SUBJECT TO CHANGE** -: ec2-3-249-127-86.eu-west-1.compute.amazonaws.com
2. EC2 instance 
3. ssh Certificate: For direct ssh connection to instance you must have the relevant certificate in the form of a .pem file. Ask Bearach for this. 
4. ssh connection string: `ssh -i "mongo_test.pem" ubuntu@ec2-3-249-127-86.eu-west-1.compute.amazonaws.com`

### Docker setup on Linux(Ubuntu):
1. [Install Docker](https://docs.docker.com/engine/install/ubuntu/)
2. Install MongoDB Docker Image: `sudo docker pull mongo`
3. Check image installation: `sudo docker images`
#### Directory Structure:
4. Directory structure should look like: 
```
├── docker-compose.yml
└── mongo-entrypoint
    └── entrypoint.js
```
5. Create directory for docker container: `sudo mkdir -p mongo-folder/mongo-entrypoint`
6. Change into folder: `cd mongo_folder`
7. Create docker compose file: `sudo touch docker-compose.yml`
8. Edit docker compose file (`sudo nano docker-compose.yml`), to look like the following: 
```
docker-compose.yml
version: '3.4'
services:
  mongo-container:
    image: mongo:4.2
    environment:
        - MONGO_INITDB_ROOT_USERNAME=admin
        - MONGO_INITDB_ROOT_PASSWORD=pass
    ports:
      - "27017:27017"
    volumes:
      - "$PWD/mongo-entrypoint/:/docker-entrypoint-initdb.d/"
    command: mongod
```
9. Note that username and password should be updated.
10. Change into mongo-entrypoint: `cd mongo-entrypoint`
11. Create entrypoint.js: `sudo touch entrypoint.js`
12.  Edit entrypoint.js (`sudo nano entrypoint.js`), to look like the following:
```
var db = connect("mongodb://admin:pass@localhost:27017/admin");

db = db.getSiblingDB('new_db'); // we can not use "use" statement here to switch db

db.createUser(
    {
        user: "user",
        pwd: "pass",
        roles: [ { role: "readWrite", db: "new_db"} ],
        passwordDigestor: "server",
    }
)
```
13. Note that username and password must match what they were set to in docker-compose.yml above.
14. Start the container: `docker-compose up -d`
15. Now you can connect to the DB using the username and password set above.

---
