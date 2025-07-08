const prisma = require("../config/PrismaClient");
const express = require('express');
const { createResume, getUserResume, getResumeById, updateResume } = require("../controller/resumeController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect() ,getUserResume);
router.post("/create", protect() ,createResume);
router.get("/:id", protect() ,getResumeById);
router.put("/updateResume/:resumeId", protect() ,updateResume);

module.exports = router;