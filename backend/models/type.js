const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema({
  type: { type: String, require: true },
});

module.exports = new mongoose.model("Type", TypeSchema);
