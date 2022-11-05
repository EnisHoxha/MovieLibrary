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
    const extension = path.extname(file.originalname);
    const ext = extension.toLowerCase();
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".webp" &&
      ext !== ".jpeg"
    ) {
      const err = createCustomError("Only image Formats are allowed...", 400);
      return callback(err);
    }
    callback(null, true);
  },
});

module.exports = upload;
