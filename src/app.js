const express = require('express');
var cors = require("cors");
var path = require('path');

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

const groupRoute = require("./api/routes/groupRoute");
groupRoute(server);

const projectRoute = require("./api/routes/projectRoute");
projectRoute(server);

const taskRoute = require("./api/routes/taskRoute");
taskRoute(server);

const userRoute = require("./api/routes/userRoute");
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

server.listen(port, hostname);