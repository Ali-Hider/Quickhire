const Job = require("../models/job");

module.exports = async function validateJob(req, res, next) {
  const { title, company, location, category, description } = req.body;

  if (!title || !company || !location || !category || !description) {
    return res.status(400).json({ message: "All required fields must be provided." });
  }

  next();
};