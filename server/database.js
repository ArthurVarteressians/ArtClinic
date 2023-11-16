const mysql = require("mysql2");

const db = mysql.createConnection({
  user: "root",
  host: "new-mysql-container-1",
  password: "123456789",
  database: "artclinic",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = db;
