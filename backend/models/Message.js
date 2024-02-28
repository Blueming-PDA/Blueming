const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  messageContent: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

messageSchema.set("timestamps", {
  createdAt: "messageCreatedAt",
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
