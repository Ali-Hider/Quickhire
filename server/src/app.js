// src/app.js
const express = require("express");
const cors = require("cors");

const app = express();

// -----------------------
// Middleware
// -----------------------
app.use(cors());
app.use(express.json());

// -----------------------
// Routes
// -----------------------
const jobRoutes = require("./routes/job.routes");
const applicationRoutes = require("./routes/application.routes");

app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// -----------------------
// Export app
// -----------------------
module.exports = app;