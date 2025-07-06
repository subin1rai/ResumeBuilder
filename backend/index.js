const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config("./.env");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const port = process.env.PORT;
console.log(port);
app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});
