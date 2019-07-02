//Descrição
//https://github.com/Rocketseat/bootcamp-gostack-desafio-01/blob/master/README.md

const express = require("express");
const server = express();

server.use(express.json());

//Log number of requests
server.use((req, res, next) => {
  count++;
  console.log(`${count} ${req.method} - ${req.url}`);
  return next();
});

let projects = [];
let count = 0;

//GET PROJECTS
server.get("/projects", (req, res) => {
  return res.json(projects);
});

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
server.put("/projects/:id", checkProjExists, (req, res) => {
  // const { id } = req.params;
  const { title } = req.body;

  // let proj = projects.find(proj => proj.id == id);
  req.proj.title = title;

  return res.json(req.proj);
});

//DELETE PROJECT
server.delete("/projects/:id", checkProjExists, (req, res) => {
  // const { id } = req.params;

  // let proj = projects.find(proj => proj.id == id);
  const index = projects.indexOf(req.proj);

  projects.splice(index, 1);

  return res.json();
});

//ADD TASK TO A PROJECT
server.post("/projects/:id/tasks", checkProjExists, (req, res) => {
  // const { id } = req.params;
  const { title } = req.body;

  // let proj = projects.find(proj => proj.id == id);
  req.proj.tasks.push(title);

  return res.json(req.proj);
});

//MIDDLEWARES
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

function checkProjExists(req, res, next) {
  const { id } = req.params;

  let proj = projects.find(proj => proj.id == id);
  if (!proj) {
    return res.status(404).json({ error: `Project with id ${id} not found` });
  }
  req.proj = proj;
  return next();
}

server.listen(3000);
