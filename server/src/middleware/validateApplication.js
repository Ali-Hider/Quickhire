
const Job = require("../models/job");

module.exports = async function validateApplication(req, res, next) {
  const { jobId, name, email, resumeLink } = req.body;

  if (!jobId || !name || !email || !resumeLink) {
    return res.status(400).json({ message: "All required fields must be provided." });
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }


  try {
    new URL(resumeLink);
  } catch (_) {
    return res.status(400).json({ message: "Invalid resume link URL." });
  }

  
  try {
    const jobExists = await Job.findById(jobId);
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found." });
    }
  } catch (error) {
    return res.status(400).json({ message: "Invalid Job ID format." });
  }

  next();
};