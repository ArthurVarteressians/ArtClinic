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
const axios = require("axios");
const db = require("./database");

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
app.use("/api/doctors/artt", doctorAppointmentList);
// =================================Doctors Login Toast===============================
const doctorLoginToast = require("./routes/doctorLoginToast");
app.use("/getDoctorName", doctorLoginToast);
// =================================Doctors Client Status Updates===============================
const doctorAppoitmentUpdate = require("./routes/doctorAppoitmentUpdate");
app.use("/api/appointments/:appointmentnumber", doctorAppoitmentUpdate);
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
  const token = req.headers.authorization;
  console.log(token);
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

app.post("/Sched", verifyToken, async (req, res) => {
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
    } else {
      res.status(409).json({ error: "The selected time is not available" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check appointment availability" });
  }
});

//=======================================================

app.listen(3001, () => console.log("Server is Up on port 3001"));
