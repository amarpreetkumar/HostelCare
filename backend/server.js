const express = require("express");
const mongoose = require("mongoose");
const complaintRoutes = require("./routes/complaintRoutes");
require("dotenv").config();
const User = require("./models/User");

const authRoutes = require("./routes/authRoutes");

const { protect } = require("./middleware/authMiddleware");
const app = express();



const cors = require("cors");
app.use(cors({
  origin: "*",   // for now (safe for student project)
}));

app.use(express.json()); // VERY IMPORTANT
//for image uploads
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

app.get("/", (req, res) => {
  res.send("HostelCare Backend Running");
});


app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

