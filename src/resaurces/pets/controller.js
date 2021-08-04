const db = require("../../utils/database");
const Pet = require("./model");

const { createOne, getAll, findOne, updateOne, deleteOne } = Pet();

function getAllPets(req, res) {
  getAll().then((result) => res.json(result.rows));
}

function createAPet(req, res) {
  const newPet = req.body;

  createOne(newPet).then((newPetfromServer) =>
    res.json({ new_pet: newPetfromServer })
  );
}

function findOnePet(req, res) {
  const id = req.params.id;

  findOne(id).then((pet) => res.json({ found_pet: pet }));
}

function updateOnePet(req, res) {
  const id = req.params.id;
  updatedData = req.body;

  updateOne(id, updatedData).then((updatedPet) =>
    res.json({ updated_pet: updatedPet })
  );
}

function deletePet(req, res) {
  const id = req.params.id;

  try {
    deleteOne(id).then(res.json({ deleted: true }));
  } catch (error) {
    console.error(null, error.message);
  }
}

module.exports = {
  createAPet,
  getAllPets,
  findOnePet,
  updateOnePet,
  deletePet,
};
