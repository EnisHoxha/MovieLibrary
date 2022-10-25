const movies = require("../models/movies");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/customError");

const getMovies = asyncWrapper(async (req, res) => {
  res.send("getMovies controller");
});

const getMovie = asyncWrapper(async (req, res) => {
  res.send("getMovie controller");
});

const createMovie = asyncWrapper((req, res) => {
  res.send("createMovie controller");
});

const updateMovie = (req, res) => {
  res.send("updateMovie controller");
};

const deleteMovie = asyncWrapper(async (req, res) => {
  res.send("deleteMovie controller");
});

module.exports = { getMovies, getMovie, createMovie, updateMovie, deleteMovie };
