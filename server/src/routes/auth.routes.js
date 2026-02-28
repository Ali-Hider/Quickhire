// src/routes/auth.routes.js
const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

// POST signup
router.post("/signup", authController.signup);

// POST login
router.post("/login", authController.login);

module.exports = router;
