const mysql = require("mysql2");

const db = mysql.createConnection({
    user: "root",
    host: "new-mysql-container-1",
    password: "123456789",
    database: "artclinic",
  });

  module.exports = db;