const express = require("express");
const {
  createAPet,
  getAllPets,
  findOnePet,
  updateOnePet,
  deletePet,
} = require("./controller");

const petsRouter = express.Router();

petsRouter.get("/", getAllPets);

petsRouter.post("/", createAPet);

petsRouter.get("/:id", findOnePet);

petsRouter.patch("/:id", updateOnePet);

petsRouter.delete("/:id", deletePet);

module.exports = petsRouter;
