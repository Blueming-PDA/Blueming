const { Server } = require("socket.io");

const io = new Server();

require("./socketEvents")(io);

// io.on("connection", socketConnection);

module.exports = io;
