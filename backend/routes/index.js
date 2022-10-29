const express = require("express");
const router = express.Router();
const cors = require("cors");
const corsOptions = require("../middlewares/corsMiddleware");

const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.js");

router.route("/").get(cors(corsOptions), getMovies).post(createMovie);
router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
