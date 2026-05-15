const express = require("express");
const {
  registerUser,
  loginUser,
  getStaffUsers,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/staff", protect, getStaffUsers);

module.exports = router;
