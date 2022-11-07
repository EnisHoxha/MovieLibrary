const { actor_img } = require("../config.env");
const mongoose = require("mongoose");
const timeNow = require("../day");

const ActorsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: {
    type: String,
    default: actor_img,
  },
  createdAt: { type: String, default: timeNow },
});

module.exports = mongoose.model("Actors", ActorsSchema);
