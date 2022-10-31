const express = require("express");
const router = express.Router();
const cors = require("cors");
const corsOptions = require("../middlewares/corsMiddleware");
const upload = require("../middlewares/multer");

const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/moviesController");

router
  .route("/")
  .get(cors(corsOptions), getMovies)
  .post(upload.single("image"), createMovie);
router
  .route("/:id")
  .get(getMovie)
  .patch(upload.single("image"), updateMovie)
  .delete(deleteMovie);

module.exports = router;
