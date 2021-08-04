const db = require("../../utils/database");

function Pet() {
  function createATable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS pets (
        id              SERIAL        PRIMARY KEY,
        name           VARCHAR(10)   NOT NULL,
        age            INTEGER   NOT NULL
      );
        `;

    db.query(sql)
      .then((result) => console.timeLog("Pets table is ready.."))
      .catch(console.error);
  }

  async function getAll() {
    const sql = `
    SELECT *
    FROM pets;
  `;

    const result = await db.query(sql).catch(console.error);
    return result;
  }

  async function createOne(newPet) {
    const { name, age } = newPet;
    const sql = `
      INSERT INTO pets
        (name, age)
      VALUES ($1, $2)

       RETURNING *;
    `;

    try {
      const result = await db.query(sql, [name, age]);
      return result.rows[0];
    } catch (error) {
      console.error(null, error.message);
    }
  }

  async function findOne(id) {
    const sql = `
     SELECT * FROM pets
     WHERE id = $1;
     `;

    try {
      const result = await db.query(sql, [id]);
      return result.rows;
    } catch (error) {
      console.error(null, error.message);
    }
  }

  async function updateOne(id, newPetData) {
    //find current book that needs to be updated
    const currentPet = await findOne(id);

    const newPet = { ...currentPet, ...newPetData };

    const sql = `
      UPDATE pets
      SET name = $1, age = $2
      WHERE id = $3

      RETURNING *;
      `;

    try {
      const result = await db.query(sql, [newPet.name, newPet.age, id]);
      return result.rows[0];
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteOne(id) {
    const sql = `
      DELETE FROM pets
      WHERE id = $1;
      `;

    const result = await db.query(sql, [id]);
    return result.rows;
  }

  createATable();

  return {
    createOne,
    getAll,
    findOne,
    updateOne,
    deleteOne,
  };
}

module.exports = Pet;
