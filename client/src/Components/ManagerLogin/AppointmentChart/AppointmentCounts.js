import React, { useEffect, useState } from "react";
import Axios from "axios";

const AppointmentCounts = () => {
  const [appointmentCounts, setAppointmentCounts] = useState([]);

  useEffect(() => {
    Axios.get("http://54.198.184.143:3001/appointmentCounts")
      .then((response) => {
        setAppointmentCounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Appointment Counts</h2>
      <ul>
        {appointmentCounts.map((appointment) => (
          <li key={appointment.doctorId}>
            Doctor ID: {appointment.id} - Count: {appointment.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentCounts;
