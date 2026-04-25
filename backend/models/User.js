const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "admin", "staff"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);


/*
Schema → structure of document

unique: true → no duplicate emails

enum → restrict values

timestamps → auto adds createdAt, updatedAt

💬 Interview line:

“I used enums to restrict user roles for safety.”
*/