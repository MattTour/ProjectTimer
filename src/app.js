const express = require('express');
var cors = require("cors");
var path = require('path');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'API from ProjectTimer',
            version:'1.0.0',
            servers:["http://localhost:3000"]
        }
    },
    apis:["./api/routes/*.js"]
}

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const hostname = "0.0.0.0";
const port = 3000;

const server = express();

server.set('view engine', 'html');

server.engine('html', require('ejs').renderFile);

server.use(cors());
const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/apinode"); // Whithout Docker
mongoose.connect("mongodb://mongo/apinode");

server.use(express.urlencoded());
server.use(express.json());

server.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const groupRoute = require("./api/routes/groupRoute");
groupRoute(server);

const projectRoute = require("./api/routes/projectRoute");
projectRoute(server);

const taskRoute = require("./api/routes/taskRoute");
taskRoute(server);

const userRoute = require("./api/routes/userRoute");
const swaggerJSDoc = require('swagger-jsdoc');
userRoute(server);

server.use(express.static(path.join(__dirname, '/front/public')));

server.get('/login', function(req, res){
    res.render(__dirname + '/front/pages/login.html');
});

server.get('/register', function(req, res){
    res.render(__dirname + '/front/pages/register.html');
});

server.get('/', function(req, res){
    res.render(__dirname + '/front/pages/accueil.html');
});

server.get('/createGroup', function(req, res){
    res.render(__dirname + '/front/pages/groupCreate.html');
});

server.get('/groupModify/:idGroupe', function(req, res){
    res.render(__dirname + '/front/pages/groupUpdate.html');
});

server.get('/projectList/:idGroupe', function(req, res){
    res.render(__dirname + '/front/pages/projectList.html');
});

server.get('/createProject/:idGroupe', function(req, res){
    res.render(__dirname + '/front/pages/projectCreate.html');
});

server.get('/projectModify/:idProject', function(req, res){
    res.render(__dirname + '/front/pages/projectUpdate.html');
});

server.get('/taskList/:idProject', function(req, res){
    res.render(__dirname + '/front/pages/taskList.html');
});

server.get('/createTask/:idProject', function(req, res){
    res.render(__dirname + '/front/pages/taskCreate.html');
});

server.get('/taskModify/:idTask', function(req, res){
    res.render(__dirname + '/front/pages/taskUpdate.html');
});

server.get('/addUser/:idUser', function(req, res){
    res.render(__dirname + '/front/pages/addUserGroup.html');
});

server.listen(port, hostname);