const prisma = require("../config/PrismaClient");
const express = require('express');
const router = express.Router();
const {userRegister, login, getUserProfile} = require("../controller/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", userRegister);
router.post("/login", login);
router.get("/profile", protect(),getUserProfile);

module.exports = router;