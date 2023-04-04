const mongoose = require("mongoose");
const timeNow = require("../day");

const MovieSchema = new mongoose.Schema({
  movie_title: { type: String, required: true },
  budget: {
    type: Number,
    min: [7000, "Budget cant be less than 7000$"],
    max: 400000000,
    default: 1,
  },
  movie_link: { type: String },
  actors: { type: [], required: true },
  genres: { type: [], required: true },
  poster_img: { type: String },
  featured_img: { type: String },
  featured: { type: Boolean, default: false },
  description: { type: String, default: "No Description yet!" },
  original_language: { type: String, required: true },
  imdb_rating: {
    type: Number,
    min: [1, "Rating cant be less than 0"],
    max: [10, "Rating cant be more than 10"],
  },
  release_date: {
    type: String,
    required: [true, "Please enter the date when movie was released"],
  },
  runtime: {
    type: Number,
    min: [30, "Movie Runtime cant be less than 30 Minutes"],
    max: [180, "Movie Runtime cant be more than 2 Hours"],
  },
  adult: { type: Boolean, default: false },
  type: {
    type: String,
    required: true,
  },
  directors: { type: [], required: true },
  film_studio: { type: String, required: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  createdAt: { type: String, default: timeNow() },
  updatedAt: { type: String, default: timeNow() },
});

MovieSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: timeNow() });
});

module.exports = mongoose.model("Movies", MovieSchema);
