const mongoose = require("mongoose");
const timeNow = require("../moment");

const LanguagesSchema = new mongoose.Schema({
  language: { type: String, required: true },
  iso_code: { type: String, required: true },
  createdAt: { type: String, default: timeNow },
});

module.exports = mongoose.model("Languages", LanguagesSchema);
