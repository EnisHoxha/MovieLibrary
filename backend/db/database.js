const mongose = require("mongoose");

const connectDB = (url) => {
  return mongose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
