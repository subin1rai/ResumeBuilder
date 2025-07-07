const prisma = require("../config/PrismaClient");
const express = require('express');
const router = express.Router();

router.get("/resume", async(req,res)=>{

    const data = await prisma.user.findFirst();
    res.status(200).json({message: "hello", data});
});

module.exports = router;