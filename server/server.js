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

// =================================Singup Logic===============================//
app.post("/Profile", async (req, res) => {
  // const name = req.body.name;
  // const email = req.body.email;
  // const age = req.body.age;
  // const phonenumber = req.body.phonenumber;
  // const password = req.body.password;

  const { name, email, age, phonenumber, password } = req.body;
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
                "INSERT INTO patientslist (name, email, age, phonenumber, hashedpassword, patient_status) VALUES (?, ?, ?, ?, ?, 0)",
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

//==============================Client Login======================Main partt
// const Secret = "1I1d6WhwZWjGn4ijZDpBaGq";

// app.post("/ClientsLogins", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const id = req.body.patient_id;
//   let token = null;
//   try {
//     const results = await new Promise((resolve, reject) => {
//       pool.query(
//         `SELECT * FROM patientslist WHERE email = ?`,
//         [email],
//         function (error, results, fields) {
//           if (error) {
//             console.error("Error executing query:", error);
//             reject(error);
//           }
//           resolve(results);
//         }
//       );
//     });

//     if (results.length === 0) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid email or password" });
//     }

//     const hashedPassword = results[0].hashedpassword;
//     if (bcrypt.compareSync(password, hashedPassword)) {
//       const id = results[0].id;
//       const token = jwt.sign({ id: id }, Secret, {
//         expiresIn: "2h",
//       });
//     } else {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid email or password" });
//     }

// await new Promise((resolve, reject) => {
//   pool.query(
//     "INSERT INTO appointments (appointmentnumber, doctor_id, patient_id, appointment_date, registeration_date, update_date, status) VALUES (?,?, ?, ?,  ?, ?, ?)",
//     [3, 7, id, new Date(), new Date(), new Date(), 0],
//     function (error, results, fields) {
//       if (error) {
//         console.error("Error executing query:", error);
//         reject(error);
//       }
//       resolve();
//     }
//   );
// });

//     res.status(200).json({
//       success: true,
//       token: token,
//       email: email,
//       patient_id: id,
//       redirectUrl: "/", // Replace with the appropriate redirect URL
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).send("Server error");
//   }
// });

const Secret = "1I1d6WhwZWjGn4ijZDpBaGq";

app.post("/ClientsLogins", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const results = await new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM patientslist WHERE email = ?`,
        [email],
        function (error, results, fields) {
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
    if (bcrypt.compareSync(password, hashedPassword)) {
      const token = jwt.sign({ id: results[0].id }, Secret, {
        expiresIn: "2h",
      });
      const patientId = results[0].id; // Retrieve patient_id from the query results
      res
        .status(200)
        .header("Authorization", "Bearer " + token) // Add the token to the headers
        .json({
          success: true,
          token: token,
          email: email,
          patient_id: patientId,
          redirectUrl: "/calendar",
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

// // ...

// // Inside the route handler for '/ClientsLogins'
// app.post("/ClientsLogins", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   // Use connection from connection pool
//   pool.getConnection(function (err, connection) {
//     if (err) {
//       console.error("Error getting database connection:", err);
//       return res.status(500).send("Server error");
//     }
//     db.query(
//       "SELECT * FROM patientslist WHERE (email) = (?)",
//       [email],
//       function (error, results, fields) {
//         if (error) {
//           console.error("Error executing query:", error);
//           connection.destroy();
//           return res.status(500).send("Server error");
//         }

//         if (results.length === 0) {
//           connection.destroy(); // Close the connection when done
//           return res.status(401).send("Invalid email or password");
//         }

//         // Verify password
//         const hashedPassword = results[0].hashedpassword;
//         if (bcrypt.compareSync(password, hashedPassword)) {
//           const token = jwt.sign({ email: email }, Secret, {
//             expiresIn: "2h",
//           });

//           // Send token to client
//           res.status(200).json({ token });
//         } else {
//           // Passwords do not match
//           connection.destroy();
//           return res.status(401).send("Invalid email or password");
//         }
//       }
//     );
//   });
// });

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", ""); // Get token from request headers

//   if (!token) {
//     return res.status(403).send("Access denied"); // Return error if token is not present
//   }

//   jwt.verify(token, Secret, (err, decoded) => {
//     if (err) {
//       console.error("Error verifying JWT token:", err);
//       return res.status(500).send("Server error");
//     }
//     req.email = decoded.email; // Extract email from token payload
//     next(); // Call next middleware or route handler
//   });
// };

// // Example protected route that requires authentication
// app.get("/protectedRoute", verifyToken, (req, res) => {
//   const email = req.email; // Access the extracted email from the token payload
//   // Perform actions for authenticated route
//   // You can access the email and use it for authentication/authorization
//   res.status(200).send(`Protected route accessed by email: ${email}`);
// });

// =================================Manager Logic===============================//
app.post("/ManagerLogin", (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM managemenlogin WHERE email = ? AND password = ?`;
  db.query(query, [email, password], (err, result) => {
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
    "SELECT COUNT(*) AS total_clients FROM patientslist WHERE patient_status = 0";
  db.query(query, (err, result) => {
    if (err) {
      // Handle error
      console.error(err);
      res.status(500).json({ error: "Failed to get count of clients" });
    } else {
      // Extract count from query result
      const totalClients = result[0].total_clients;
      // Return count to frontend
      res.status(200).json({ totalClients });
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

app.get("/doctors/:department", (req, res) => {
  const department = req.params.department;
  const query = `SELECT * FROM artclinic.doctors WHERE department = ?`;
  db.query(query, [department], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Failed to fetch doctors" });
    } else {
      if (results.length > 0) {
        res.status(200).json(results); // Send an array of doctors in the response
      } else {
        res.status(404).json({ error: "No doctors found" });
      }
    }
  });
});

//==================================//

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).send("Access denied"); // Return error if token is not present
  }

  jwt.verify(token, Secret, (err, decoded) => {
    if (err) {
      console.error("Error verifying JWT token:", err);
      return res.status(500).send("Server error");
    }
    req.patient_id = decoded.id; // Extract id from token payload
    next();
  });
};

// Route handler for /Sched endpoint
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
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});

//==================================//

app.listen(3001, () => console.log("Server is Up on port 3001"));
