// src/routes/application.routes.js
const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/application.controller");
const validateApplication = require("../middleware/validateApplication");

// POST submit application
router.post("/", validateApplication, applicationController.submitApplication);

module.exports = router;