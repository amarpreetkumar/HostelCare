const express = require("express");
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  assignComplaint,
  updateComplaintStatus,
  getStaffComplaints
} = require("../controllers/complaintController");

const upload = require("../middleware/upload"); 

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", protect, upload.single("image"), createComplaint);
router.get("/my", protect, getMyComplaints);
router.get("/", protect, getAllComplaints);
router.put("/assign", protect, assignComplaint);
router.put("/status", protect, updateComplaintStatus);
router.get("/staff", protect, getStaffComplaints);
module.exports = router;
