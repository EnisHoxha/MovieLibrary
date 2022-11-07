const mongoose = require("mongoose");
const timeNow = require("../day");

const GenresSchema = new mongoose.Schema({
  type: { type: String, required: true },
  createdAt: { type: String, default: timeNow() },
  updatedAt: { type: String, default: timeNow() },
});

GenresSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: timeNow() });
});
module.exports = mongoose.model("Genres", GenresSchema);
