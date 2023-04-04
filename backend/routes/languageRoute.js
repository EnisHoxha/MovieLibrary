const express = require("express");
const router = express.Router();
const {
  getLanguages,
  getLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} = require("../controllers/languageController");

router.route("/").get(getLanguages).post(createLanguage);
router
  .route("/:id")
  .get(getLanguage)
  .patch(updateLanguage)
  .delete(deleteLanguage);

module.exports = router;
