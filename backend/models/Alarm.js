const mongoose = require("mongoose");

const alaramSchema = new mongoose.Schema({
  alarmTitle: {
    type: String,
    required: true,
  },
  alarmContent: {
    type: String,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: {
    type: String,
    required: true,
  }
});

alaramSchema.set("timestamps", {
  createdAt: "commentCreatedAt",
  updatedAt: "commentUpdatedAt",
});

const Alarm = mongoose.model("Alarm", alaramSchema);

module.exports = Alarm;
