// this is a seeder file that will seed initial sample data to the database
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: "root",
  database: "mobiiDb",
  password: process.env.PASSWORD,
  port: "6680",
});

// delete all rows in the database before inserting new seeds
connection.query("DELETE FROM cars;");

connection.query(
  // uuidv4() is used to generate random ids for every item in the database
  `INSERT INTO cars VALUES ('${uuidv4()}', 'Toyota', 'Fortuner', 2022),
    ('${uuidv4()}', 'Nissan', 'Navarra', 2021),
    ('${uuidv4()}', 'Honda', 'Civic', 2020), 
    ('${uuidv4()}', 'Suzuki', 'Ertiga', 2019),
    ('${uuidv4()}', 'Mitsubishi', 'Lancer', 2018)`, // additional sample data
  // can be inserted here, just make sure to follow the table schema
  (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log(result);
  }
);

connection.end();
