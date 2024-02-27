var express = require('express');
var http = require('http')
const app = require("../app");
const {Server} = require("socket.io")


const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin:"http://localhost:3000"
    }
});

require('./alarm')(io);