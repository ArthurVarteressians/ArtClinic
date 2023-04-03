const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
``;
const util = require("util");

const saltRounds = 10;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "artclinic",
});

const managerDB = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "artclinicmanagers",
});

const query = util.promisify(db.query).bind(db);

app.post("/Profile", (req, res) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const age = req.body.age;
  const phonenumber = req.body.phonenumber;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password === confirmPassword) {
    (async () => {
      try {
        const hashedpasword = await bcrypt.hash(req.body.password, saltRounds);
        await query(
          "INSERT INTO patientslist(name, lastname,email,age,phonenumber,hashedpasword) VALUES (?,?,?,?,?,?)",
          [name, lastname, email, age, phonenumber, hashedpasword],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("New patient added");
            }
          }
        );
      } catch {}
    })();
  } else {
    console.log("Error");
  }
});

app.get("/ManagerLogin", (req, res) => {
  db.query("SELECT * FROM patientslist", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/ManagerDelete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM patientslist WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/ManagerLoginSection", (req, res) => {
  const email = req.body.managerEmail;
  const hashedpasword = req.body.managerPassword;

  managerDB.query(
    "SELECT * FROM artclinicmanagerstable WHERE email = ? AND hashedpasword = ? ",
    [email, hashedpasword],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong Information!" });
      }
    }
  );
});

app.post("/CheckEmail", (req, res) => {
  const email = req.body.email;

  managerDB.query(
    "SELECT COUNT(*) as count FROM artclinicmanagerstable WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      } else {
        // Check if the email exists
        const count = result[0].count;
        if (count > 0) {
          res.json({ message: "Email already exists" });
        } else {
          res.json({ message: "Email does not exist" });
        }
      }
    }
  );
});

app.listen(3001, () => console.log("Server is Up on port 3001"));
