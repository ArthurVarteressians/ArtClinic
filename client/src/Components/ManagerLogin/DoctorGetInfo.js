import Axios from "axios";
import React, { useState } from "react";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const handleGetAppointments = () => {
    const doctor_id = 1;

    Axios.get(`http://localhost:3001/api/doctors/${doctor_id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to retrieve appointments");
        }
        return response.data;
      })
      .then((data) => setAppointments(data))
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <div>
      <h1>Welcome Doctor</h1>
      <button onClick={handleGetAppointments}>Get Appointments</button>
      {appointments.map((appointment) => (
        <div key={appointment.appointment_id}>
          {/* <p>Appointment ID: {appointment.appointment_id}</p> */}
          {/* <p>Doctor ID: {appointment.doctor_id}</p> */}
          <p>Patient ID: {appointment.patient_id}</p>
          <p>Appointment Date: {appointment.appointment_date}</p>
          {/* <p>Status: {appointment.status}</p>
          <p>Doctor Name: {appointment.fullname}</p>
          <p>Department: {appointment.department}</p> */}
        </div>
      ))}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default DoctorAppointments;
