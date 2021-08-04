const db = require("../../utils/database");
const Book = require("./model");

const { createOne, getAll, findOne, updateOne, deleteOne } = Book();

function getAllBooks(req, res) {
  getAll((result) => res.json({ books: result }));
}

function createABook(req, res) {
  const newBook = req.body;

  createOne(newBook, (newBook) => res.json({ "new book": newBook }));
}

function findOneBook(req, res) {
  const id = req.params.id;

  findOne(id, (book) => res.json({ found_book: book }));
}

function updateBook(req, res) {
  const id = req.params.id;
  updatedData = req.body;

  updateOne(id, updatedData, (updatedData, error) =>
    res.json({ found_book: updatedData, error })
  );
}

function deleteBook(req, res) {
  const id = req.params.id;

  deleteOne(id, (done) => res.json({ deleted: done }));
}

module.exports = {
  createABook,
  getAllBooks,
  findOneBook,
  updateBook,
  deleteBook,
};
