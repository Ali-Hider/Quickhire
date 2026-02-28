const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  resumeLink: { type: String, required: true },
  coverNote: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);