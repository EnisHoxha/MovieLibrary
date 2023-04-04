const { actor_img } = require("../config.env");
const mongoose = require("mongoose");
const timeNow = require("../day");

const ActorsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  actor_img: {
    type: String,
    default: actor_img,
  },
  createdAt: { type: String, default: timeNow() },
  updatedAt: { type: String, default: timeNow() },
});

ActorsSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: timeNow() });
});
module.exports = mongoose.model("Actors", ActorsSchema);
