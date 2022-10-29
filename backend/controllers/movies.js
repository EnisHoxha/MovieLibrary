const movies = require("../models/movies");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/customError");

const getMovies = asyncWrapper(async (req, res, next) => {
  let nr = 1;
  if (nr < 0) {
    res.send("Hello from getMovies controller");
  }
  const err = createCustomError("This is an custom error message...", 400);
  next(err);
});

const getMovie = asyncWrapper(async (req, res) => {
  res.send("getMovie controller");
});

const createMovie = asyncWrapper(async (req, res) => {
  res.send("createMovie controller");
});

const updateMovie = asyncWrapper(async (req, res) => {
  res.send("updateMovie controller");
});

const deleteMovie = asyncWrapper(async (req, res) => {
  res.send("deleteMovie controller");
});

module.exports = { getMovies, getMovie, createMovie, updateMovie, deleteMovie };
