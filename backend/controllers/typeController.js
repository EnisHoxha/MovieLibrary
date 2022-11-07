const Type = require("../models/type.js");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getTypes = asyncWrapper(async (req, res) => {
  const type = await Type.find({});
  res.status(StatusCodes.OK).json({ type });
});

const getType = asyncWrapper(async (req, res) => {
  const { id: typeId } = req.params;
  const type = await Type.findOne({ _id: typeId });
  if (!type) {
    throw new NotFoundError(`Type with id: ${typeId} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ type });
});

const createType = asyncWrapper(async (req, res) => {
  try {
    const type = await Type.create({
      ...req.body,
    });
    res.status(StatusCodes.OK).json({ type });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

const updateType = asyncWrapper(async (req, res) => {
  const { id: typeId } = req.params;
  const type = await Type.findOneAndUpdate(
    { _id: typeId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!type) {
    throw new NotFoundError(`Type with id:${typeId} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ type });
});

const deleteType = asyncWrapper(async (req, res) => {
  const { id: typeId } = req.params;
  const type = await Type.findOneAndDelete({ _id: typeId });
  if (!type) {
    throw new NotFoundError(`No type with id:${typeId}`);
  }
  res.status(StatusCodes.OK).json({ type });
});

module.exports = { getTypes, getType, createType, updateType, deleteType };
