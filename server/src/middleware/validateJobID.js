const Job = require("../models/job");
const mongoose = require("mongoose");

module.exports = async function validateJobId(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Job ID format." });
  }

  const jobExists = await Job.findById(id);
  if (!jobExists) {
    return res.status(404).json({ message: "Job not found." });
  }

  next();
};