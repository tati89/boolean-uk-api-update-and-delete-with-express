const express = require("express");
const { createABook, getAllBooks, findOneBook } = require("./controller");

const booksRouter = express.Router();

booksRouter.get("/", getAllBooks);

booksRouter.post("/", createABook);

booksRouter.get("/:id", findOneBook);

module.exports = booksRouter;
