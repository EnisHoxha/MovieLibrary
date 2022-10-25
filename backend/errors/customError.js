class CustomAPIerror extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, CustomAPIerror) => {
  return new CustomAPIerror(msg, statusCode);
};

module.exports = {
  CustomAPIerror,
  createCustomError,
};
