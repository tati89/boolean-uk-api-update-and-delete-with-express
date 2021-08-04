const db = require("../../utils/database");

function Book() {
  function createATable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS books (
        id              SERIAL        PRIMARY KEY,
        title           VARCHAR(255)   NOT NULL,
        type            VARCHAR(255)   NOT NULL,
        author          VARCHAR(255)   NOT NULL,
        topic           VARCHAR(255)   NOT NULL
      );
        `;

    db.query(sql)
      .then((result) => console.timeLog("Book table is ready.."))
      .catch(console.error);
  }

  function getAll(callback) {
    const sql = `
    SELECT *
    FROM books;
  `;

    db.query(sql)
      .then((result) => callback(result.rows))
      .catch(console.error);
  }

  function createOne(newBook, callback) {
    const { title, type, author, topic } = newBook;
    const sql = `
      INSERT INTO books
        (title, type, author, topic)
      VALUES ($1, $2, $3, $4)

       RETURNING *;
    `;

    db.query(sql, [title, type, author, topic]).then((result) =>
      callback(result.rows[0])
    );
  }

  function findOne(id, callback) {
    const sql = `
     SELECT * FROM books
     WHERE id = $1;
     `;

    db.query(sql, [id]).then((result) => callback(result.rows));
  }

  function updateOne(id, callback) {
    const sql = `
      UPDATE books
      SET title = $1
      WHERE id = $1

      RETURNING *;
      `;
  }

  createATable();

  return {
    createOne,
    getAll,
    findOne,
  };
}

module.exports = Book;
