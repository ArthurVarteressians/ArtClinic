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
const axios = require("axios");
const db = require("./database");
const PORT = 3001;
//===========================Clinic DB===================================
const SECRET = "1I1d6WhwZWjGn4ijZDpBaGq";
const query = util.promisify(db.query).bind(db);
// =================================Singup Request===============================
const clientSignup = require("./routes//clientSignupServerFile");
app.use("/Profile", clientSignup);
// =================================Login Request===============================
const clientLogin = require("./routes/clientLoginServerFile");
app.use("/ClientsLogins", clientLogin);
// =================================Manager Logic===============================
const managerLoginRouter = require("./routes/managerLoginServerFile");
app.use("/ManagerLoginmmm", managerLoginRouter);
//=================================Manager Call Requests Show===============================
const managerConsultingReq = require("./routes/managerConsultingReqServerFile");
app.use("/ConsultingReq", managerConsultingReq);
// =================================Client Call Req ===============================
const clientSubmitCall = require("./routes/clientCallReqSubmitingServerFile");
app.use("/SubmitQ", clientSubmitCall);
// =================================Doctors Appointment List Check===============================
const doctorAppointmentList = require("./routes/doctorLoginAppointmentList");
app.use("/api/doctors/openAppointments", doctorAppointmentList);
// =================================Doctors Login Toast===============================
const doctorLoginToast = require("./routes/doctorLoginToast");
app.use("/getDoctorName", doctorLoginToast);
// =================================Doctors Client Status Updates===============================
// const doctorAppoitmentUpdate = require("./routes/doctorAppoitmentUpdate");
// app.use("/api/appointments/:appointmentnumber", doctorAppoitmentUpdate);
// =================================Manager Get All Client Lists===============================
const managerGetClientsLists = require("./routes/managerGetClientsLists");
app.use("/GetClientsLists", managerGetClientsLists);
//==================================Manager Get NEW Client List========================
const managerGetNewClientsLists = require("./routes/managerGetNewClientsLists");
app.use("/GetNewClientsLists", managerGetNewClientsLists);
//==================================Manager New Month Chart Client Count============
const managerClientChart = require("./routes/managerClientChart");
app.use("/GetNewClientsChartList", managerClientChart);
//===================================Manager Delete Client=================================
const managerDeleteClient = require("./routes/managerDeleteClient");
app.use("/GetClientsLists", managerDeleteClient);
//===================================Manager Call Requests Delete=================================
const managerDeleteCallRequests = require("./routes/managerDeleteCallRequests");
app.use("/ConsultingReq", managerDeleteCallRequests);
//==================================Department Change Handler=================================
const departmentChange = require("./routes/departmentChange");
app.use("/doctors", departmentChange);

//==================================Scheduling Part=================================





const appointmentCountsRouter = require("./routes/appointmentCounts");
// ...
app.use("/appointmentCounts", appointmentCountsRouter);

//===============





const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send("Access denied");
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.error("Error verifying JWT token:", err);
      return res.status(500).send("Server error");
    }
    req.patient_id = decoded.id;
    next();
  });
};

const verifyDocToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send("Access denied");
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.error("Error verifying JWT token:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
    req.decodedToken = decoded;
    next();
  });
};
//=======================

app.get("/api/doctors/closedAppointments", verifyDocToken, (req, res) => {
  const doctor_id = req.decodedToken.id;
  const query = `
    SELECT a.appointmentnumber, 
           DATE_FORMAT(a.appointment_date, '%Y-%m-%d %H:%i:%s') AS appointment_date, 
           a.appointment_status,
           p.name,
           p.phonenumber
    FROM appointments a
    JOIN patientslist p ON a.patient_id = p.id
    WHERE a.doctor_id = ? AND a.appointment_status = 1
  `;
  db.query(query, [doctor_id], (error, results) => {
    if (error) {
      console.error("Error retrieving closed appointments:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

///===============================

app.put("/api/appointments/:appointments", (req, res) => {
  const appointmentnumber = req.params.appointments;
  const { status } = req.body;

  const query =
    "UPDATE appointments SET appointment_status = ? WHERE appointmentnumber = ?";
  db.query(query, [status, appointmentnumber], (error, results) => {
    if (error) {
      console.error("Error updating appointment status:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.sendStatus(200);
  });
});

app.get("/patientInformation", verifyToken, (req, res) => {
  const patient_id = req.patient_id;
  const query = `
    SELECT id, name, phoneNumber, email
    FROM patientslist
    WHERE id = ?;
  `;
  db.query(query, [patient_id], (error, results) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      if (results && results.length > 0) {
        const patientInfo = {
          id: results[0].id,
          name: results[0].name,
          phoneNumber: results[0].phoneNumber,
          email: results[0].email,
        };
        res.send(patientInfo);
      } else {
        res.sendStatus(404);
      }
    }
  });
});


//=======================

app.post("/checkAvailability", (req, res) => {
  const doctorId = req.body.doctorId;
  const date = req.body.date;
  const formattedDate = moment(date).format("YYYY-MM-DD");

  const query = `SELECT appointment_date FROM appointments WHERE doctor_id = ?`;

  db.query(query, [doctorId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch available times" });
    } else {
      const bookedTimes = results
        .filter(
          (result) =>
            moment(result.appointment_date).format("YYYY-MM-DD") ===
            formattedDate
        )
        .map((result) => moment(result.appointment_date).format("HH:mm"));

      const availableTimes = getAvailableTimes(bookedTimes);
      res.status(200).json({ availableTimes });
    }
  });
});

function getAvailableTimes(bookedTimes) {
  const allTimes = ["10:00", "12:00", "14:00", "16:00"];
  const availableTimes = allTimes.filter((time) => !bookedTimes.includes(time));
  return availableTimes;
}

//=================================================
app.get("/checkOpenAppointment", verifyToken, (req, res) => {
  const { authorization } = req.headers;

  // Check if the authorization token is present
  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const patientId = req.patient_id;
  console.log(patientId);
  const query =
    "SELECT * FROM appointments WHERE patient_id = ? AND appointment_status = 0";
  db.query(query, [patientId], (error, results) => {
    if (error) {
      console.error("Error checking open appointment:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      return res.json({ hasOpenAppointment: true });
    }

    return res.json({ hasOpenAppointment: false });
  });
});

//=============================
app.post("/Sched", verifyToken, async (req, res) => {
  const doctorId = req.body.doctorId;
  const date = req.body.date;
  const time = req.body.time;
  const dateTimeString = date + " " + time;
  const appointmentNumber = 0;
  const registrationDate = new Date();
  const updateDate = new Date();
  const appointment_status = 0;
  const patientId = req.patient_id;

  try {
    const availabilityResponse = await axios.post(
      "http://localhost:3001/checkAvailability",
      {
        doctorId,
        date,
        time,
      }
    );

    if (availabilityResponse.status === 200) {
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
            "YYYY-MM-DD HH:mm:ss"
          ).format("YYYY-MM-DD HH:mm:ss");
          const query = `INSERT INTO appointments (appointmentnumber, doctor_id, patient_id, appointment_date, registeration_date, update_date, appointment_status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
          db.query(
            query,
            [
              newAppointmentNumber,
              doctorId,
              patientId,
              appointmentDate,
              registrationDate,
              updateDate,
              appointment_status,
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
    } else {
      res.status(409).json({ error: "The selected time is not available" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check appointment availability" });
  }
});

//=======================================================

app.get("/PatientAppointmentHistory", verifyToken, (req, res) => {
  const patientId = req.patient_id;

  // Retrieve appointment history for the patient
  db.query(
    `SELECT a.appointmentnumber, d.fullname, d.doctor_id, d.department, a.patient_id, a.appointment_date, a.registeration_date, a.update_date, a.appointment_status 
    FROM appointments AS a
    JOIN doctors AS d ON a.doctor_id = d.doctor_id
    WHERE a.patient_id = ?`,
    [patientId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      res.json(result);
    }
  );
});

app.listen(PORT, () => console.log(`Server is Up on port ${PORT}`));
