const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", async (req, res) => {
    const { name, email, phonenumber } = req.body;
  
    db.query(
      "INSERT INTO callrequests (name, email , phonenumber, status) VALUES (?,  ? , ?, 0)",
      [name, email, phonenumber],
      (error, results) => {
        if (results) {
          res.status(200).send("We will call you as soon as possible. Thanks."); // Send success response
        } else {
          console.error("Error");
          res.status(500).send("Error adding data"); 
        }
      }
    );
  });
  module.exports = router;
