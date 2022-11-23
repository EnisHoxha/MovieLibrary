const express = require("express");
const router = express.Router();
const cors = require("cors");
const corsOptions = require("../middlewares/corsMiddleware");
const upload = require("../middlewares/multer");
// const auth = require("../middlewares/auth");

const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovie,
  typeMovie,
} = require("../controllers/moviesController");

router
  .route("/")
  .get(cors(corsOptions), getMovies)
  .post(upload.single("image"), createMovie);

router.route("/typeMovie").get(typeMovie);
router.route("/search").get(searchMovie);

router
  .route("/:id")
  .get(getMovie)
  .patch(upload.single("image"), updateMovie)
  .delete(deleteMovie);

module.exports = router;
