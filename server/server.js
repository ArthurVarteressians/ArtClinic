const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const util = require("util");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
app.use(cors());
app.use(express.json());

//===========================Clinic DB===================================/

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "artclinic",
});

//==============

const pool = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "artclinic",
});
//==================================//
const query = util.promisify(db.query).bind(db);

//===========================Manager DB===================================/
const managerDB = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "artclinicmanagers",
});
//==================================//






// =================================Singup Logic===============================//
app.post("/Profile", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const age = req.body.age;
  const phonenumber = req.body.phonenumber;
  const password = req.body.password;

  if (password) {
    try {
      // Check if email or phone number already exist in the database
      db.query(
        "SELECT COUNT(*) as emailCount, COUNT(*) as phoneNumberCount FROM patientslist WHERE email = ? OR phonenumber = ?",
        [email, phonenumber],
        async (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal server error");
          } else {
            // Check if the email or phone number exists
            const emailCount = result[0].emailCount;
            const phoneNumberCount = result[0].phoneNumberCount;
            if (emailCount > 0) {
              res.status(400).json({ message: "Email already exists" });
            } else if (phoneNumberCount > 0) {
              res.status(400).json({ message: "Phone number already exists" });
            } else {
              const hashedPassword = await bcrypt.hash(password, saltRounds);
              await query(
                "INSERT INTO patientslist (name, email, age, phonenumber, hashedpassword) VALUES (?, ?, ?, ?, ?)",
                [name, email, age, phonenumber, hashedPassword]
              );
              res.status(200).json({ message: "New patient added" });
            }
          }
        }
      );
    } catch (err) {
      console.error("Error inserting new patient: ", err);
      res.status(500).send("Internal server error");
    }
  } else {
    console.error("Passwords do not match");
    res.status(400).send("Passwords do not match");
  }
});

//==============================Client Login======================

// Login route
app.post("/ClientsLogins", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Use connection from connection pool
  pool.getConnection(function (err, connection) {
    if (err) {
      console.error("Error getting database connection:", err);
      return res.status(500).send("Server error");
    }
    connection.query(
      "SELECT * FROM patientslist WHERE email = ?",
      [email],
      function (error, results, fields) {
        if (error) {
          console.error("Error executing query:", error);
          connection.destroy();
          return res.status(500).send("Server error");
        }

        // Process query results and perform password comparison
        if (results.length === 0) {
          connection.destroy(); // Close the connection when done
          return res.status(401).send("Invalid email or password");
        }

        // Verify password
        const hashedPassword = results[0].hashedpassword;
        if (bcrypt.compareSync(password, hashedPassword)) {
          const token = jwt.sign({ email: email }, "TestI");

          connection.destroy();
          return res.status(200).json({ token });
        } else {
          // Passwords do not match
          connection.destroy();
          return res.status(401).send("Invalid email or password");
        }
      }
    );
  });
});

//=======================================

// =================================Manager Logic===============================//
app.post("/ManagerLogin", (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM artclinicmanagerstable WHERE email = ? AND hashedpasword = ?`;
  managerDB.query(query, [email, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length > 0) {
        const manager = result[0];
        res.status(200).json({
          success: true,
          message: "Login successful",
          managerId: manager.id,
          managerName: manager.name,
          managerEmail: manager.email,
        });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    }
  });
});
//==================================//

app.get("/GetClientsLists", (req, res) => {
  db.query("SELECT * FROM patientslist", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//==================================//

app.delete("/GetClientsLists/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM patientslist WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//==================================//

app.listen(3001, () => console.log("Server is Up on port 3001"));
