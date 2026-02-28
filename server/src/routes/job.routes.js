// src/routes/job.routes.js
const express = require("express");
const router = express.Router();

const jobController = require("../controllers/job.controller");
const validateJob = require("../middleware/validateJob");
const validateJobId = require("../middleware/validateJobID");

// GET all jobs with optional filters
router.get("/", jobController.getAllJobs);

// GET single job by ID
router.get("/:id", validateJobId, jobController.getJobById);

// POST create a new job (Admin)
router.post("/", validateJob, jobController.createJob);

// DELETE job by ID (Admin)
router.delete("/:id", validateJobId, jobController.deleteJob);

module.exports = router;