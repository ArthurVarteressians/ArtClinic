const express = require("express");
const router = express.Router();
const db = require("../database");

router.put("/", (req, res) => {
  const { appointmentnumber } = req.params;
  const { status } = req.body;

  const query = `
      UPDATE appointments
      SET status = ?
      WHERE appointmentnumber = ?;
    `;

  db.query(query, [status, appointmentnumber], (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});
module.exports = router;
