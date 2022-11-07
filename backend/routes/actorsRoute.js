const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const {
  getActors,
  getActor,
  createActor,
  updateActor,
  deleteActor,
} = require("../controllers/actorsController");

router.route("/").get(getActors).post(upload.single("image"), createActor);
router
  .route("/:id")
  .get(getActor)
  .patch(upload.single("image"), updateActor)
  .delete(deleteActor);

module.exports = router;
