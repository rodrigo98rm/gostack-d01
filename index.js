const express = require("express");
const server = express();

server.use(express.json());

let projects = [];

//GET PROJECTS
server.get("/projects", (req, res) => {
  return res.json(projects);
});

function checkNewProjData(req, res, next) {
  const { id, title } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing attribute: id" });
  }
  if (!title) {
    return res.status(400).json({ error: "Missing attribute: title" });
  }
  return next();
}

//CREATE PROJECT
server.post("/projects", checkNewProjData, (req, res) => {
  const { id, title } = req.body;
  const proj = {
    id,
    title,
    tasks: []
  };
  projects.push(proj);
  return res.json(proj);
});

//UPDATE PROJECT
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let proj = projects.find(proj => proj.id == id);
  proj.title = title;

  return res.json(proj);
});

server.listen(3000);
