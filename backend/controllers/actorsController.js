const Actors = require("../models/actors");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getActors = asyncWrapper(async (req, res) => {
  const actors = await Actors.find({});
  res.status(StatusCodes.OK).json({ actors });
});

const getActor = asyncWrapper(async (req, res) => {
  const { id: actorId } = req.params;
  const actor = await Actors.findOne({ _id: actorId });
  if (!actor) {
    throw new NotFoundError(`Actor with id: ${actorId} doesn't exist`);
  }
  res.status(StatusCodes.OK).json({ actor });
});

const createActor = asyncWrapper(async (req, res) => {
  try {
    const actor = await Actors.create({
      ...req.body,
      actor_img: req.file.filename,
    });
    res.status(StatusCodes.OK).json({ actor });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

const updateActor = asyncWrapper(async (req, res) => {
  const { id: actorId } = req.params;
  if (req.file) {
    const actor = await Actors.findOneAndUpdate(
      { _id: actorId },
      { ...req.body, actor_img: req.file.filename },
      { new: true, runValidators: true }
    );
    if (!actor) {
      throw new NotFoundError(`Actor with id:${actorId} doesn't exist`);
    }
    res.status(StatusCodes.OK).json({ actor });
  } else {
    const actor = await Actors.findOneAndUpdate(
      { _id: actorId },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!actor) {
      throw new NotFoundError(`Actor with id:${actorId} doesn't exist`);
    }
    res.status(StatusCodes.OK).json({ actor });
  }
});

const deleteActor = asyncWrapper(async (req, res) => {
  const { id: actorId } = req.params;
  const actor = await Actors.findOneAndDelete({ _id: actorId });
  if (!actor) {
    throw new NotFoundError(`No actor with id:${actorId}`);
  }
  res.status(StatusCodes.OK).json({ actor });
});

module.exports = { getActors, getActor, createActor, updateActor, deleteActor };
