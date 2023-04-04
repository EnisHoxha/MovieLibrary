const CustomAPIError = require("./customError");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./notFound");
const BadRequestError = require("./badRequest");

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};
