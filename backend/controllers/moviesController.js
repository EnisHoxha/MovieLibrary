const Movies = require("../models/movies");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getMovies = asyncWrapper(async (req, res) => {
  const movies = await Movies.find({});
  res.status(StatusCodes.OK).json({ movies });
});

const getMovie = asyncWrapper(async (req, res) => {
  const { id: movieId } = req.params;
  const movie = await Movies.findOne({ _id: movieId });
  if (!movie) {
    throw new NotFoundError(`Movie with id: ${movieId} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ movie });
});

const createMovie = asyncWrapper(async (req, res) => {
  try {
    const movie = await Movies.create({
      ...req.body,
      poster_img: req.file.filename,
    });
    res.status(StatusCodes.OK).json({ movie });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

const updateMovie = asyncWrapper(async (req, res) => {
  const { id: movieId } = req.params;
  if (req.file) {
    const movie = await Movies.findOneAndUpdate(
      { _id: movieId },
      { ...req.body, poster_img: req.file.filename },
      { new: true, runValidators: true }
    );
    if (!movie) {
      throw new NotFoundError(`Movie with id:${movieId} doesn't exist`);
    }
    res.status(StatusCodes.OK).json({ movie });
  } else {
    const movie = await Movies.findOneAndUpdate(
      { _id: movieId },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!movie) {
      throw new NotFoundError(`Movie with id:${movieId} doesn't exist`);
    }
    res.status(StatusCodes.OK).json({ movie });
  }
});

const deleteMovie = asyncWrapper(async (req, res) => {
  const { id: movieId } = req.params;
  const movie = await Movies.findOneAndDelete({ _id: movieId });
  if (!movie) {
    throw new NotFoundError(`No movie with id:${movieId}`);
  }
  res.status(StatusCodes.OK).json({ movie });
});

module.exports = { getMovies, getMovie, createMovie, updateMovie, deleteMovie };
