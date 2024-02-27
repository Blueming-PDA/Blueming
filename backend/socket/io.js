const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

module.exports = io;
