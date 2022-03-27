const express = require("express");
const cors = require("cors");
const app = express();
const PROJECTS = require("./const/projects").PROJECTS;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const PORT = process.env.PORT || 3001;

app.get('/projects', (req,res) => {
    res.json(PROJECTS);
})

app.post('/users',(req, res) => {
  if(!req.body) return res.sendStatus(400);
  if(req.body.login !== "admin" || req.body.pass !== "1234"){
    res.send(false);
  }
  else res.send(true);
})

app.listen(PORT, () => {
  console.log("Server running on port 3001");
});