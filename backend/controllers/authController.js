const User = require("../models/users");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");
require("dotenv").config();

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  // res.cookie("token", token, { httpOnly: true, maxAge: 100000 });
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, role: user.role }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: process.env.COOKIE_MAX_AGE,
  });

  res.cookie("user_auth", user.role, {
    maxAge: process.env.COOKIE_MAX_AGE,
  });
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, role: user.role }, token });
};

module.exports = { register, login };
