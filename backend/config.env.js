const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  actor_img: process.env.PROFILE_PICTURE_PATH,
};
