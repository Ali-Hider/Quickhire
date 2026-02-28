// src/routes/job.routes.js
const express = require("express");
const router = express.Router();

const jobController = require("../controllers/job.controller");
const validateJob = require("../middleware/validateJob");
const validateJobId = require("../middleware/validateJobID");
const isAdmin = require("../middleware/auth");

// GET all jobs with optional filters
router.get("/", jobController.getAllJobs);

// GET single job by ID
router.get("/:id", validateJobId, jobController.getJobById);

router.post("/", isAdmin, jobController.createJob);
router.put("/:id", isAdmin, jobController.updateJob);
router.delete("/:id", isAdmin, jobController.deleteJob);

module.exports = router; 