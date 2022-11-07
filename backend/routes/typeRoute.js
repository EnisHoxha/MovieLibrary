const express = require("express");
const router = express.Router();
const {
  getTypes,
  getType,
  createType,
  updateType,
  deleteType,
} = require("../controllers/typeController");

router.route("/").get(getTypes).post(createType);
router.route("/:id").get(getType).patch(updateType).delete(deleteType);

module.exports = router;
