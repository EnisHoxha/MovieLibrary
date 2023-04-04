const mongoose = require("mongoose");
const timeNow = require("../day");

const TypeSchema = new mongoose.Schema({
  type: { type: String, require: true },
  createdAt: { type: String, default: timeNow() },
  updatedAt: { type: String, default: timeNow() },
});

TypeSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: timeNow() });
});

module.exports = mongoose.model("Type", TypeSchema);
