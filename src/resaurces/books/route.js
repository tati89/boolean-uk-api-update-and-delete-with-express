const express = require("express");
const {
  createABook,
  getAllBooks,
  findOneBook,
  updateBook,
  deleteBook,
} = require("./controller");

const booksRouter = express.Router();

booksRouter.get("/", getAllBooks);

booksRouter.post("/", createABook);

booksRouter.get("/:id", findOneBook);

booksRouter.patch("/:id", updateBook);

booksRouter.delete("/:id", deleteBook);

module.exports = booksRouter;
