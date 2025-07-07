const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const resumeRoute = require("./src/routes/resume.route.js");
const userRoute = require("./src/routes/user.route.js");

dotenv.config("./.env");
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));


//routes
app.use("/api/health", (req, res) => {
    res.status(200).json({ message: "Good Health" });
});

app.use("/api/resume", resumeRoute);
app.use("/api/auth", userRoute);

const port = process.env.PORT;
console.log(port);
app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});
