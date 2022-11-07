const Genre = require("../models/genres.js");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getGenres = asyncWrapper(async (req, res) => {
  const genre = await Genre.find({});
  res.status(StatusCodes.OK).json({ genre });
});

const getGenre = asyncWrapper(async (req, res) => {
  const { id: genreId } = req.params;
  const genre = await Genre.findOne({ _id: genreId });
  if (!genre) {
    throw new NotFoundError(`Genre with id: ${genreId} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ genre });
});

const createGenre = asyncWrapper(async (req, res) => {
  try {
    const genre = await Genre.create({
      ...req.body,
    });
    res.status(StatusCodes.OK).json({ genre });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

const updateGenre = asyncWrapper(async (req, res) => {
  const { id: genreId } = req.params;
  const genre = await Genre.findOneAndUpdate(
    { _id: genreId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!genre) {
    throw new NotFoundError(`Genre with id:${genreId} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ genre });
});

const deleteGenre = asyncWrapper(async (req, res) => {
  const { id: genreId } = req.params;
  const genre = await Genre.findOneAndDelete({ _id: genreId });
  if (!genre) {
    throw new NotFoundError(`No genre with id:${genreId}`);
  }
  res.status(StatusCodes.OK).json({ genre });
});

module.exports = { getGenres, getGenre, createGenre, updateGenre, deleteGenre };
