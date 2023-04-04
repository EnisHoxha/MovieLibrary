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
    cors(corsOptions),
    upload.fields([{ name: "image" }, { name: "featured_image" }]),
    createMovie
  );

router.route("/search").get(cors(corsOptions), searchMovie);
router.route("/typeMovie").get(cors(corsOptions), typeMovie);
router.route("/typeGenre").get(cors(corsOptions), typeGenre);
router.route("/typeFeatured").get(cors(corsOptions), typeFeatured);

router
  .route("/:id")
  .get(cors(corsOptions), getMovie)
  .patch(
    cors(corsOptions),
    upload.fields([{ name: "image" }, { name: "featured_image" }]),
    updateMovie
  )
  .delete(deleteMovie);

module.exports = router;
