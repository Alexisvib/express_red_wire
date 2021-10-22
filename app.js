const express = require("express");
require("dotenv").config();
const Serie = require("./models/Serie");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET ALL DATA

//GET pagination
app.get("/pagination", async (req, res) => {
  limit = req.query.limit;
  offset = req.query.offset;
  limit === undefined ? null : limit;
  offset === undefined ? null : offset;
  const result = await Serie.pagination(limit, offset);
  return res.status(200).json(result);
});

app.get("/", async (req, res) => {
  const name = req.query.name;
  const before = req.query.before;
  const order = req.query.order;
  name === undefined ? null : name;
  before === undefined ? null : before;
  order === undefined ? null : order;
  result = await Serie.findAll(name, before, order);
  return res.status(200).json(result[0]);
});

app.post("/", async (req, res) => {
  const values = req.body;
  const { name, date_creation, seen, episode_number } = values;
  result = await Serie.create(name, date_creation, seen, episode_number);
  return res.status(200).json(result);
});

//GET 1 Serie
app.get("/:id", async (req, res) => {
  id = req.params.id;
  const result = await Serie.findOneById(id);
  if (result.length < 1) {
    return res.status(404).json({ erreur: "404 NOT FOUND" });
  }
  return res.status(200).json(result[0]);
});

//Patch
app.patch("/:id", async (req, res) => {
  id = req.params.id;
  const { name, date_creation, seen, episode_number } = req.body;
  const result = await Serie.patch(
    id,
    name,
    date_creation,
    seen,
    episode_number
  );
  if (!result) {
    return res.status(404).json({ erreur: "404 NOT FOUND" });
  }
  return res.status(201).json(result);
});

//Delete
app.delete("/:id", async (req, res) => {
  id = req.params.id;
  const result = await Serie.deleteById(id);
  if (!result) {
    return res.status(404).json({ erreur: "404 NOT FOUND" });
  }
  return res.status(200).json({ message: "Serie deleted" });
});

module.exports = app;
