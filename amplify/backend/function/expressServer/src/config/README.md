**The below is information on how the database for the project is set up.**
**We are running a MongoDB container through Docker on an AWS EC2 instance**

## Database Information

### EC2 Instance Setup - General Notes:
1. Ensure inbound rules are set up correctly through a security group. Inbound rules can be set to allow all traffic as authentication is required when connecting. * **This may need to be revisited.** *
2. Ensure outbound rules are set up correctly through a security group. Outbound rules can be set to allow all traffic for now. * **This may need to be revisited.** *

### Database Connection Information:
## EC2 Instance
1. Instance Address: EC2 Instance IPv4 DNS address - **SUBJECT TO CHANGE** -: ec2-3-249-127-86.eu-west-1.compute.amazonaws.com
2. ssh Certificate: For direct ssh connection to instance you must have the relevant certificate in the form of a .pem file. Ask Bearach (<c15379616@mytudublin.ie>) for this file. 
3. ssh connection string: `ssh -i "mongo_test.pem" ubuntu@ec2-3-249-127-86.eu-west-1.compute.amazonaws.com`

### Docker setup on Linux(Ubuntu 20.04 Jammy Jellyfish ):
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