const User = require("../../models/User");
const Alarm = require("../../models/Alarm");
const Message = require("../../models/Message");
module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("a user connected", socket.id);
    console.log("===============");

    socket.on("setSid", async (userObj) => {
      // console.log("SocketID::::", socket.id);
      const user = await User.setSid(userObj.email, socket.id);
      // console.log("User.setSid를 보내고 받아온 USER !!!!!!!", user);
    });

    socket.on("setHeaderMessage", async ({ userObj, newMessage }) => {
      const user = await User.setSid(userObj.email, socket.id);
      console.log("User.setSid를 보내고 받아온 USER2 !!!!!!!", user);

      await Message.create({
        userId: user._id,
        userName: user.name,
        messageContent: newMessage,
      });
    });

    socket.on("getRecentMessage", async () => {
      const recentMessage = await Message.findOne().sort({
        messageCreatedAt: -1,
      });
      socket.emit("setHeaderMessageBack", recentMessage.messageContent);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
