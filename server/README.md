# Nodejs App API

### Preparing to develop

#### Installing MongoDB
After installing [homebrew](http://brew.sh/index.html), run the command
```sh
$ brew install mongodb
$ mkdir -p /data/db
```

#### Installing Dependencies
After installing [Node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/), There are a few packages that must be installed seperately from the included modules. Run the following commands to install those packages:
```sh
$ npm install -g mongod
$ mongod
```

**MongoDB is now running** You will need to open a separate console window to allow mongod to continue running while we are working.

Now that you have mongo running, let's download the project and install the Node modules from this project using the following command:
```sh
$ git clone https://github.com/bryandbor/iJoin.git
$ cd iJoin
$ npm i
```

### Running Node Server
Now that we have our code ready to run, we need to tell node to start running our server and listening for requests.
We could run the command:
```sh
$ node app.js
```

This command, however, will need to be stopped and restarted every time a new change is made to the code. For this reason, we will install [Nodemon](https://github.com/remy/nodemon) to allow the server to restart as we make changes to the code using the following commands:
```sh
$ npm install -g nodemon
$ nodemon app.js
```

Now our server will simply restart any time we save changes to the underlying code

---
### Code Tour

#### Folder Structure
```
.
+-- constants/
+-- docs/
+-- models/
+-- routes/
+-- app.js
+-- connect.js
+-- package.json
+-- README.md
```

```constants``` contains global constants that could be used anywhere in the app<br/>
```docs``` contains the detailed API documentation<br/>
```models``` contains the Models for all data types such as Users, Contacts, Events, etc<br/>
```routes``` contains the acceptable routes from the API route<br/>
```app.js``` contains code for reacting to requests to the API<br/>
```connect.js``` contains code for connecting to a mongodb database<br/>

### Helpful Tools
#### Postman
Being able to test your endpoints as they're being made is very helpful. This tool will allow you to make calls to your own API including passing variables and see what responses would look like. You can download postman from [here](https://www.getpostman.com/) either as a Chrome App or as a standalone Application on Mac.

#### RoboMongo
Access to a MongoDB database directly can be crutial for understanding what is stored within. Robomongo gives you a standalone application for doing any CRUD actions within a MongoDB database. You can download Robomongo from [here](https://robomongo.org/); Robomongo should be compatible with Mac and PC.
