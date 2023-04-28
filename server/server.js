const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const util = require("util");
const jwt = require("jsonwebtoken");
const { verify } = require("crypto");
const moment = require("moment");
const saltRounds = 10;
app.use(cors());
app.use(express.json());
const cookieParser = require("cookie-parser");

//===========================Clinic DB===================================/

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123456789",
  database: "artclinic",
});
//==================================//

const query = util.promisify(db.query).bind(db);

// =================================Singup Logic===============================//
app.post("/Profile", async (req, res) => {
  const { name, email, age, phonenumber, password, registrationDate } =
    req.body;
  if (password) {
    try {
      const registrationDate = moment(
        req.body.registrationDate,
        "MM/DD/YYYY"
      ).format("YYYY-MM-DD");

      // Check if email or phone number already exist in the database
      db.query(
        "SELECT COUNT(*) as emailCount, COUNT(*) as phoneNumberCount FROM patientslist WHERE email = ? OR phonenumber = ?",
        [email, phonenumber],
        async (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Internal server error");
          } else {
            // Check if the email or phone number exists
            const emailCount = result[0].emailCount;
            const phoneNumberCount = result[0].phoneNumberCount;
            if (emailCount > 0) {
              return res.status(400).json({ message: "Email already exists" });
            } else if (phoneNumberCount > 0) {
              return res
                .status(400)
                .json({ message: "Phone number already exists" });
            } else {
              const hashedPassword = await bcrypt.hash(password, saltRounds);
              await query(
                "INSERT INTO patientslist (name, email, age, phonenumber, hashedpassword, registration_date, patient_status) VALUES (?, ?, ?, ?, ? , ?, 0)",
                [
                  name,
                  email,
                  age,
                  phonenumber,
                  hashedPassword,
                  registrationDate,
                ]
              );
              db.query(
                // TODO: pool
                `SELECT * FROM patientslist WHERE email = ?`,
                [email],
                (error, results) => {
                  if (error) {
                    console.error("Error executing query:", error);
                    reject(error);
                  }
                  const token = jwt.sign({ id: results[0].id }, SECRET, {
                    expiresIn: "2h",
                  });
                  // resolve(results);
                  return res
                    .status(200)
                    .header("Authorization", "Bearer " + token)
                    .json({
                      message: "New patient added",
                      token: "Bearer " + token,
                    });
                }
              );
            }
          }
        }
      );
    } catch (err) {
      console.error("Error inserting new patient: ", err);
      return res.status(500).send("Internal server error");
    }
  } else {
    console.error("Passwords do not match");
    return res.status(400).send("Passwords do not match");
  }
});

//==============================Client Login======================Main parttconst SECRET = "1I1d6WhwZWjGn4ijZDpBaGq";
const SECRET = "1I1d6WhwZWjGn4ijZDpBaGq";

app.post("/ClientsLogins", async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM patientslist WHERE email = ?`,
        [email],
        (error, results) => {
          if (error) {
            console.error("Error executing query:", error);
            reject(error);
          }
          resolve(results);
        }
      );
    });

    if (results.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const hashedPassword = results[0].hashedpassword;
    if (await bcrypt.compare(password, hashedPassword)) {
      const token = jwt.sign({ id: results[0].id }, SECRET, {
        expiresIn: "2h",
      });

      console.log(`Token generated successfully: ${token}`);

      const patientId = results[0].id; // Retrieve patient_id from the query results
      return res.status(200).json({
        success: true,
        token: token,
        email: email,
        patient_id: patientId,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Server error");
  }
});

//=======================================

// =================================Manager Logic===============================//const SECRET = "1I1d6WhwZWjGn4ijZDpBaGq"; // Secret for JWT

app.post("/ManagerLogin", async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM managemenlogin WHERE email = ? AND password = ?`;
  db.query(query, [email, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length > 0) {
        const user = result[0];
        let response;
        if (user.role === "doctor") {
          const token = jwt.sign({ id: user.id }, SECRET, {
            expiresIn: "2h",
          });
          response = {
            success: true,
            message: "Doctor login successful",
            doctorId: user.id,
            doctorEmail: user.email,
            token: token,
          };
          console.log(response.message);
        } else if (user.role === "manager") {
          const token = jwt.sign({ id: user.id }, SECRET, {
            expiresIn: "2h",
          });
          response = {
            success: true,
            message: "Manager login successful",
            managerId: user.id,
            managerEmail: user.email,
            token: token,
          };
          console.log(response.message);
        } else {
          res.status(401).json({ error: "Invalid role" });
          return;
        }
        res.status(200).json(response);
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    }
  });
});

//======================Get all client list============//

app.get("/GetClientsLists", (req, res) => {
  db.query("SELECT * FROM patientslist", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//======================Get all NEW client list============//

app.get("/GetNewClientsLists", (req, res) => {
  // Execute MySQL query to get count of clients with status 0
  const query =
    "SELECT name, email, age, phonenumber FROM patientslist WHERE patient_status = 0;";
  db.query(query, (err, result) => {
    if (err) {
      // Handle error
      console.error(err);
      res.status(500).json({ error: "Failed to get count of clients" });
    } else {
      // Extract count from query result
      const totalClients = result[0].total_clients;
      // Return count to frontend
      res.send(result);
    }
  });
});

//==================================//

// Example backend endpoint to fetch client counts
app.get("/GetNewClientsListssss", (req, res) => {
  // Fetch client counts from your MySQL database
  const query =
    "SELECT DAY(registration_date) as day, COUNT(*) as count FROM patientslist WHERE patient_status = 0 AND MONTH(registration_date) = ? AND YEAR(registration_date) = ? GROUP BY DAY(registration_date) HAVING COUNT(*) > 0;";
  // Execute the query to fetch client counts
  db.query(
    query,
    [new Date().getMonth() + 1, new Date().getFullYear()],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch client counts" });
      } else {
        // Format the fetched data as an array of counts for each day in the month
        const clientCounts = Array.from({ length: 31 }, (_, i) => {
          const day = i + 1;
          const count =
            results.find((result) => result.day === day)?.count || 0; // Update this line
          return count;
        });

        // Send the client counts data as a JSON response
        res.json(clientCounts);
      }
    }
  );
});

//===================================

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

app.get("/doctors/:department", (req, res) => {
  const department = req.params.department;
  const query = `SELECT * FROM artclinic.doctors WHERE department = ?`;
  db.query(query, [department], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Failed to fetch doctors" });
    } else {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ error: "No doctors found" });
      }
    }
  });
});

//==================================//===================================================================================================================================================================

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send("Access denied");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.error("Error verifying JWT token:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
    req.patient_id = decoded.id;
    next();
  });
};

app.post("/Sched", verifyToken, (req, res) => {
  const doctorId = req.body.doctorId;
  const date = req.body.date;
  const time = req.body.time;
  const dateTimeString = date + " " + time;
  const appointmentNumber = 0;
  const registrationDate = new Date();
  const updateDate = new Date();
  const status = 0;
  const patientId = req.patient_id;
  try {
    const getCurrentAppointmentNumberQuery =
      "SELECT MAX(appointmentnumber) as maxAppointmentNumber FROM appointments";
    db.query(getCurrentAppointmentNumberQuery, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to store appointment" });
      } else {
        const currentAppointmentNumber = results[0].maxAppointmentNumber || 0;

        const newAppointmentNumber = currentAppointmentNumber + 1;

        const appointmentDate = moment(
          dateTimeString,
          "YYYY-MM-DD HH:mm"
        ).format("YYYY-MM-DD HH:mm:ss");

        const query = `INSERT INTO appointments (appointmentnumber, doctor_id, patient_id, appointment_date, registeration_date, update_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(
          query,
          [
            newAppointmentNumber,
            doctorId,
            patientId,
            appointmentDate,
            registrationDate,
            updateDate,
            status,
          ],
          (error, results) => {
            if (error) {
              console.error(error);
              res.status(500).json({ error: "Failed to store appointment" });
            } else {
              const appointmentId = results.insertId;
              res.status(201).json({
                id: appointmentId,
                message: "Appointment booked successfully",
              });
            }
          }
        );
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to store appointment" });
  }
});


//==================================//

app.post("/SubmitQ", async (req, res) => {
  const { name, email, phonenumber } = req.body;

  db.query(
    "INSERT INTO callrequests (name, email , phonenumber, status) VALUES (?,  ? , ?, 0)",
    [name, email, phonenumber],
    (error, results) => {
      if (results) {
        res.status(200).send("We will call you as soon as possible. Thanks."); // Send success response
      } else {
        console.error("Error");
        res.status(500).send("Error adding data"); // Send error response
      }
    }
  );
});

//==================================================

// Get appointment details for a specific doctor endpoint

app.get("/api/doctors/:doctor_id", (req, res) => {
  const { doctor_id } = req.params;

  // Query to retrieve appointment details for a specific doctor
  const query = `
    SELECT a.appointmentnumber, a.doctor_id, a.patient_id, a.appointment_date, a.status, d.fullname, d.department
    FROM appointments a
    JOIN doctors d ON a.doctor_id = d.doctor_id
    WHERE a.doctor_id = ?;
  `;

  // Execute the query with the doctorId parameter
  db.query(query, [doctor_id], (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

app.listen(3001, () => console.log("Server is Up on port 3001"));
