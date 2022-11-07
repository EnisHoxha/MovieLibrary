const express = require("express");
const router = express.Router();
const {
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genreController");

router.route("/").get(getGenres).post(createGenre);
router.route("/:id").get(getGenre).patch(updateGenre).delete(deleteGenre);

module.exports = router;
