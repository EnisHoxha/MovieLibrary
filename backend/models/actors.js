const { actor_img } = require("../config.env");
const mongoose = require("mongoose");

const ActorsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String,
    default: actor_img,
  },
});

module.exports = new mongoose.model("Actors", ActorsSchema);
