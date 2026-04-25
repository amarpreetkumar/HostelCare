const Complaint = require("../models/Complaint");

// student creates complaint
exports.createComplaint = async (req, res) => {
  try {

    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can raise complaints" });
    }

    const { title, description, category } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      category,
      image: req.file ? req.file.path : "",
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Complaint created successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// student views own complaints
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// admin views all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const complaints = await Complaint.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// admin assigns complaint to staff
exports.assignComplaint = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { complaintId, staffId } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        assignedTo: staffId,
        status: "in-progress",
      },
      { new: true }
    );

    res.json({
      message: "Complaint assigned to staff",
      complaint,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// staff updates complaint status
exports.updateComplaintStatus = async (req, res) => {
  try {
    if (req.user.role !== "staff") {
      return res.status(403).json({ message: "Only staff can update status" });
    }

    const { complaintId, status } = req.body;

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // staff can update only assigned complaints
    if (complaint.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not assigned to this complaint" });
    }

    complaint.status = status;
    await complaint.save();

    res.json({
      message: "Complaint status updated",
      complaint,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// staff views assigned complaints
exports.getStaffComplaints = async (req, res) => {

 try {

  if (req.user.role !== "staff") {
   return res.status(403).json({ message: "Access denied" });
  }

  const complaints = await Complaint.find({
   assignedTo: req.user.id
  }).sort({ createdAt: -1 });

  res.json(complaints);

 } catch (error) {

  res.status(500).json({ message: error.message });

 }

};