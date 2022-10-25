const express = require("express");
const router = express.Router();

const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.js");

router.route("/").get(getMovies).post(createMovie);
router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
