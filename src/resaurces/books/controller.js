const db = require("../../utils/database");
const Book = require("./model");

const { createOne, getAll, findOne } = Book();

function getAllBooks(req, res) {
  getAll((result) => res.json({ books: result }));
}

function createABook(req, res) {
  const newBook = req.body;

  createOne(newBook, (newBook) => res.json({ "new book": newBook }));
}

function findOneBook(req, res) {
  const id = req.params.id;

  findOne(id, (result) => {
    res.json({ result });
  });
}

module.exports = { createABook, getAllBooks, findOneBook };
