const prisma = require("../config/PrismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { registerUser, loginUser } = require("../service/auth.service");

const userRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    //sending the data to the logical section
    const {token, user} = await registerUser(name, email, password, confirmPassword);
    //after success returning data;
    return res.status(201).json({
      user,
      token,
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
      console.log(error);
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const {token, user} = await loginUser(email, password);
    return res.status(200).json({
      message: "Login successful",
      user,
      token,
      status: 200,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


const getUserProfile = async (req,res)=>{
  console.log("profile")
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
    const user = await prisma.user.findFirst(req.user.userId);
    console.log(user);
    if(!user) return res.status(400).json({message:"User not found!"});

    return res.status(200).json(user);
}

module.exports = {
  userRegister,
  login,
  getUserProfile
};
