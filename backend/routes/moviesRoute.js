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
  typeFeatured,
  typeGenre,
} = require("../controllers/moviesController");

router
  .route("/")
  .get(cors(corsOptions), getMovies)
  .post(
    upload.fields([{ name: "image" }, { name: "featured_image" }]),
    createMovie
  );

router.route("/search").get(searchMovie);
router.route("/typeMovie").get(typeMovie);
router.route("/typeGenre").get(typeGenre);
router.route("/typeFeatured").get(typeFeatured);

router
  .route("/:id")
  .get(getMovie)
  .patch(
    upload.fields([{ name: "image" }, { name: "featured_image" }]),
    updateMovie
  )
  .delete(deleteMovie);

module.exports = router;
