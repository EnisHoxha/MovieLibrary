const mongoose = require("mongoose");
const timeNow = require("../moment");

const GenresSchema = new mongoose.Schema({
  type: { type: String, required: true },
  createdAt: { type: String, default: timeNow },
});

module.exports = mongoose.model("Genres", GenresSchema);
