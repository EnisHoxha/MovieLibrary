const mongoose = require("mongoose");

const LanguagesSchema = new mongoose.Schema({
  language: { type: String, required: true },
  iso_code: { type: String, required: true },
});

module.exports = new mongoose.model("Languages", LanguagesSchema);