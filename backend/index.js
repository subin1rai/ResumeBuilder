const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const createResume = require("./src/routes/resume.route.js");

dotenv.config("./.env");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));



//routes
app.use("/api/health", (req, res) => {
    res.status(200).json({ message: "Good Health" });
});

app.use("/api/resumes", createResume);

const port = process.env.PORT;
console.log(port);
app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});
