const { CustomApiError } = require("../errors/customError");
const errorHandleMiddleware = (req, res, err, next) => {
  if (err instanceof CustomApiError) {
    res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "Something went wrong!" });
};

module.exports = errorHandleMiddleware;
