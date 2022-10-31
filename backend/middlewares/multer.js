const multer = require("multer");
const path = require("path");
const { createCustomError } = require("../errors/customError");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../public/images"));
  },

  filename: function (req, file, callback) {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //+1 because UTc has 11 month so we need to add +1 to make 12 months.
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newdate = day + "-" + month + "-" + year;
    callback(null, newdate + "-" + file.fieldname + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (!file.originalname.match(/\.(webp|jpg|jpeg|png|svg)$/)) {
      const err = createCustomError("File must be webp|jpg|jpeg|png|svg ", 400);
      return callback(err);
    }
  },
});

module.exports = upload;
