const express = require("express");
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: "root",
  database: "mobii_examdb",
  password: process.env.PASSWORD,
});

// postToDb is a function that will create the entry into the database
function postToDb(data) {
  const { make, model, year } = data;
  connection.query(
    `INSERT INTO cars VALUES ('${uuidv4()}', '${make}', '${model}', ${year})`,
    (err, results) => {
      if (err) {
        return console.log(err);
      }
      console.log(results);
    }
  );
}

function updateDbEntry(data) {}

// the endpoint /cars/showallcars will return all the cars in the database
app.get("/cars/showallcars", (req, res) => {
  connection.query("SELECT * FROM cars", (err, results) => {
    if (err) {
      return console.log(err);
    }
    res.json(results);
  });
});

// the endpoint /cars (post) will create a new entry in the database
app.post("/cars", (req, res) => {
  // check if the user passed an array to create multiple new entries in to the
  // database. If user will create a single entry, a simple json can be created
  // instead of an array.
  if (req.body.length > 1) {
    req.body.forEach((data) => {
      postToDb(data);
    });
  } else {
    postToDb(req.body);
  }

  res.send("Your new entry has been added to the database.");
});

// put request to /cars will update a particular entry in the database
app.put("/cars", (req, res) => {
  const { id, make, model, year } = req.body;

  connection.query(
    // update the entry based on the id entered by the user in the req.body
    `UPDATE cars SET make='${make}', model='${model}', year=${year} WHERE id='${id}'`,
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        // check if the id inputed by the user exists in the database. if not then
        // it will notify the user that the id provided doesn't exists in the database.
        // if it exists, notify the user that they have successfully updated the database
        if (!results.affectedRows) {
          return res.send(
            "ID not found in the database. Please check and try again."
          );
        } else {
          return res.send("Entry successfully updated in the database.");
        }
      }
    }
  );
});

// delete request to /cars/:id (where id is the id of an entry in the database) will
// delete the corresponding item.
app.delete("/cars/:id", (req, res) => {
  const { id } = req.params;

  connection.query(`DELETE FROM cars WHERE id='${id}'`, (err, results) => {
    console.log(id);
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      // check if id is in the database then return a specific response whether the
      // item is in the database or not
      if (!results.affectedRows) {
        return res.send(
          "ID not found in the database. Please check and try again."
        );
      } else {
        return res.send("Entry successfully deleted in the database.");
      }
    }
  });
});

app.listen(3000, () => {
  console.log("Connected on port 3000");
});
