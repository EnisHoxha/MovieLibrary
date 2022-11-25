const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const {
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genreController");

router
  .route("/")
  .get(getGenres)
  .post(upload.single("genre_image"), createGenre);
router
  .route("/:id")
  .get(getGenre)
  .patch(upload.single("genre_image"), updateGenre)
  .delete(deleteGenre);

module.exports = router;
