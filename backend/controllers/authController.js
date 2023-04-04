const User = require("../models/users");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");
var CryptoJS = require("crypto-js");
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
    domain: process.env.DOMAIN,
  });

  const secure_key = process.env.CRYPTOJS_KEY;
  const encryptedRole = CryptoJS.AES.encrypt(user.role, secure_key).toString();

  res.cookie("user_auth", encryptedRole, {
    maxAge: process.env.COOKIE_MAX_AGE,
    domain: process.env.DOMAIN,
  });
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, role: user.role }, token });
};

const logout = async (req, res) => {
  const { token, user_auth } = req.body;
  await res.clearCookie(token, { domain: process.env.DOMAIN });
  await res.clearCookie(user_auth, { domain: process.env.DOMAIN });
  res.end();
};

module.exports = { register, login, logout };
