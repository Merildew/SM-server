const express = require("express");
const cors = require("cors");
require("dotenv").config();
const projectsRouter = require("./routes/projectsRouter");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const refreshTokenRouter = require("./routes/refreshTokenRouter");
const createCompanyRouter = require("./routes/createCompanyRouter");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/", projectsRouter);
app.use("/", signupRouter);
app.use("/", loginRouter);
app.use("/", refreshTokenRouter);
app.use("/", createCompanyRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3001");
});
