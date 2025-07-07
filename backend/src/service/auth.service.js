const prisma = require("../config/PrismaClient");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (name, email, password, confirmPassword) => {
  if (!name || !email || !password || !confirmPassword) {
    throw new Error("All fields are required");
  }
  if (password !== confirmPassword) {
    throw new Error("Password didn't match!");
  }

  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password must be strong!");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashPassword },
  });

  return user;
};


const loginUser = async(email, password)=>{
     if (!email || !password) {
    throw new Error("All fields are required");
    }
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
    throw new Error("User not found!");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        
    throw new Error("Invalid password");
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        image: user.image,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2hrs" }
    );
return {user,token};
} 

module.exports = {
    registerUser,
    loginUser
};
