const mongoose = require("mongoose");
const timeNow = require("../moment");

const MovieSchema = new mongoose.Schema({
  movie_title: { type: String, required: true },
  budget: {
    type: Number,
    min: [7000, "Budget cant be less than 7000$"],
    max: 400000000,
    default: 1,
  },
  actors: { type: [], required: true },
  genres: { type: [], required: true },
  poster_img: { type: String, required: true },
  description: { type: String, default: "No Description yet!" },
  original_language: { type: String, required: true },
  imdb_rating: {
    type: Number,
    min: [0, "Rating cant be less than 0"],
    max: [10, "Rating cant be more than 10"],
  },
  release_date: Date,
  runtime: {
    type: Number,
    min: [75, "Movie Runtime cant be less than 75 Minutes"],
    max: [120, "Movie Runtime cant be more than 2 Hours"],
  },
  adult: { type: Boolean, default: false },
  type: {
    type: String,
    required: true,
  },
  directors: { type: [], required: true },
  film_studio: { type: String, required: true },
  like: Number,
  dislike: Number,
  createdAt: { type: String, default: timeNow },
});

module.exports = mongoose.model("Movies", MovieSchema);
