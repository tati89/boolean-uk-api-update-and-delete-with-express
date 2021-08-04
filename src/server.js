const express = require("express");
const morgan = require("morgan");

const db = require("./utils/database");
const booksRouter = require("./resaurces/books/route");

//Import routes
const app = express();

//Setup middlewear
app.use(morgan("dev"));
app.use(express.json());

//Test all routes
app.use("/books", booksRouter);
app.get("*", (req, res) => {
  res.json({ msg: "OK" });
});

//Start server

port = 3030;

app.listen(port, () => {
  db.connect((error) => {
    if (error) {
      console.error("[ERROR] Connection error: ", error.stack);
    } else {
      console.log("Connected..");
    }
  });
  console.log(`Listening on ${port} ...`);
});
