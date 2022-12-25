const express = require('express');
var cors = require("cors");



const hostname = "0.0.0.0";
const port = 3000;

const server = express();

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

server.listen(port, hostname);