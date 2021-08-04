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

  async function findOne(id) {
    const sql = `
     SELECT * FROM books
     WHERE id = $1;
     `;

    try {
      const result = await db.query(sql, [id]);
      return result.rows;
    } catch (error) {
      console.error(error);
    }
  }

  async function updateOne(id, newBookData) {
    //find current book that needs to be updated
    const currentBook = await findOne(id);

    const newBook = { ...currentBook, ...newBookData };

    const sql = `
      UPDATE books
      SET title = $1, type = $2, author = $3, topic = $4
      WHERE id = $5

      RETURNING *;
      `;

    try {
      const result = await db.query(sql, [
        newBook.title,
        newBook.type,
        newBook.author,
        newBook.topic,
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
    }
  }

  createATable();

  return {
    createOne,
    getAll,
    findOne,
    updateOne,
  };
}

module.exports = Book;
