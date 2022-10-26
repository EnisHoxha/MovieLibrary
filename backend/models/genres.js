const mongoose = require("mongoose");

const GenresSchema = new mongoose.Schema({
  type: { type: String, required: true },
});

module.exports = new mongoose.model("Genres", GenresSchema);
