import React, { useEffect, useState } from "react";
import Axios from "axios";

const UserAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const myTest = () => {
    Axios.get("http://localhost:3001/PatientAppointmentHistory", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to retrieve appointments");
        }
        const data = response.data;
        console.log(data);
      })
      .catch((error) => setError(error.response.data.message));
  };


  return (
    <div>
      {appointments.map((appointment) => (
        <div key={appointment.appointmentnumber}>
          <h2>Appointment Number: {appointment.appointmentnumber}</h2>
          <p>Doctor ID: {appointment.doctor_id}</p>
          <p>Patient ID: {appointment.patient_id}</p>
          <p>Appointment Date: {appointment.appointment_date}</p>
          <p>Registration Date: {appointment.registeration_date}</p>
          <p>Update Date: {appointment.update_date}</p>
          <p>Status: {appointment.status}</p>
        </div>
      ))}
    </div>
  );
};

export default UserAppointment;
