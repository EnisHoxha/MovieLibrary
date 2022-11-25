const Movies = require("../models/movies");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getMovies = asyncWrapper(async (req, res) => {
  const page_limit = req.query.limit;
  const movies = await Movies.find({}).limit(page_limit);
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
  // console.log(req.files.featured_image[0].filename);
  // console.log(req.files.image[0].filename);
  try {
    const movie = await Movies.create({
      ...req.body,
      poster_img: req.files.image[0].filename,
      featured_img: req.files.featured_image[0].filename,
    });
    res.status(StatusCodes.OK).json({ movie });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

const updateMovie = asyncWrapper(async (req, res) => {
  console.log(req.files.image);
  const { id: movieId } = req.params;
  if (req.files.image && req.files.featured_image) {
    const movie = await Movies.findOneAndUpdate(
      { _id: movieId },
      {
        ...req.body,
        poster_img: req.files.image[0].filename,
        featured_img: req.files.featured_image[0].filename,
      },
      { new: true, runValidators: true }
    );
    if (!movie) {
      throw new NotFoundError(`Movie with id:${movieId} doesn't exist`);
    }
    res.status(StatusCodes.OK).json({ movie });
  } else if (req.files.featured_image) {
    const movie = await Movies.findOneAndUpdate(
      { _id: movieId },
      {
        ...req.body,
        featured_img: req.files.featured_image[0].filename,
      },
      { new: true, runValidators: true }
    );
    if (!movie) {
      throw new NotFoundError(`Movie with id:${movieId} doesn't exist`);
    }
    res.status(StatusCodes.OK).json({ movie });
  } else if (req.files.image) {
    const movie = await Movies.findOneAndUpdate(
      { _id: movieId },
      {
        ...req.body,
        poster_img: req.files.image[0].filename,
      },
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

const searchMovie = asyncWrapper(async (req, res) => {
  const search = req.query.name;
  const movie = await Movies.find({
    movie_title: { $regex: search, $options: "i" },
  });
  if (!movie) {
    throw new NotFoundError(`No movie with name: ${search}`);
  }
  res.status(StatusCodes.OK).json({ movie });
});

const typeMovie = asyncWrapper(async (req, res) => {
  const types = "Movie";
  const movie = await Movies.find({ type: types });
  if (!movie) {
    throw new NotFoundError(`No movies were found`);
  }
  res.status(StatusCodes.OK).json({ movie });
});

const typeFeatured = asyncWrapper(async (req, res) => {
  const featured = true;
  const movie = await Movies.find({ featured: featured });
  if (!movie) {
    throw new NotFoundError(`No movies were found`);
  }
  res.status(StatusCodes.OK).json({ movie });
});

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovie,
  typeMovie,
  typeFeatured,
};
