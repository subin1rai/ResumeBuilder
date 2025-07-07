const prisma = require("../config/PrismaClient");
const express = require('express');
const router = express.Router();
const {userRegister, login} = require("../controller/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", userRegister);
router.post("/login", login);
router.get("/profile", protect,login);

module.exports = router;