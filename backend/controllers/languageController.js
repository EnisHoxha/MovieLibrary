const Language = require("../models/languages.js");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getLanguages = asyncWrapper(async (req, res) => {
  const language = await Language.find({});
  res.status(StatusCodes.OK).json({ language });
});

const getLanguage = asyncWrapper(async (req, res) => {
  const { id: languageId } = req.params;
  const language = await Language.findOne({ _id: languageId });
  if (!language) {
    throw new NotFoundError(`Language with id: ${languageId} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ language });
});

const createLanguage = asyncWrapper(async (req, res) => {
  try {
    const language = await Language.create({
      ...req.body,
    });
    res.status(StatusCodes.OK).json({ language });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

const updateLanguage = asyncWrapper(async (req, res) => {
  const { id: languageId } = req.params;
  const language = await Language.findOneAndUpdate(
    { _id: languageId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!language) {
    throw new NotFoundError(`Language with id:${languageId} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ language });
});

const deleteLanguage = asyncWrapper(async (req, res) => {
  const { id: languageId } = req.params;
  const language = await Language.findOneAndDelete({ _id: languageId });
  if (!language) {
    throw new NotFoundError(`No language with id:${languageId}`);
  }
  res.status(StatusCodes.OK).json({ language });
});

module.exports = {
  getLanguages,
  getLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage,
};
