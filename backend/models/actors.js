const { actor_img } = require("../config.env");
const mongoose = require("mongoose");

const ActorsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: {
    type: String,
    default: actor_img,
  },
});

module.exports = mongoose.model("Actors", ActorsSchema);
