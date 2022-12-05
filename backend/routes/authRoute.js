const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/authController");
const cors = require("cors");
const corsOptions = require("../middlewares/corsMiddleware");

router.post("/login", cors(corsOptions), login);
router.post("/register", cors(corsOptions), register);
router.post("/logout", cors(corsOptions), logout);

module.exports = router;
