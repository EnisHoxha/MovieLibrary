const mongoose = require("mongoose");
const timeNow = require("../moment");

const TypeSchema = new mongoose.Schema({
  type: { type: String, require: true },
  createdAt: { type: String, default: timeNow },
});

module.exports = mongoose.model("Type", TypeSchema);
