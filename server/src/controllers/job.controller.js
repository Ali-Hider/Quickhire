// src/controllers/job.controller.js
const Job = require("../models/job");

// GET /api/jobs - list all jobs, optional filter by category/location
exports.getAllJobs = async (req, res) => {
  try {
    const { category, location } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (location) filter.location = location;

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// GET /api/jobs/:id - get single job details
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// POST /api/jobs - create a new job (Admin)
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// DELETE /api/jobs/:id - delete a job
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};