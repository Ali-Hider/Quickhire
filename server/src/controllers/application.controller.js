// src/controllers/application.controller.js
const Application = require("../models/application");

// POST /api/applications - submit a job application
exports.submitApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};