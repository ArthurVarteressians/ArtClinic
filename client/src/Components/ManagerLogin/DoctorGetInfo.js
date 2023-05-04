import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [statusOptions, setStatusOptions] = useState(["0", "1"]);
  const [doctorFullName, setDoctorFullName] = useState("");

  const myTest = () => {
    Axios.get("http://localhost:3001/myTest", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to retrieve appointments");
        }
        const data = response.data;
        setDoctorFullName(data);
        toast.success(`Welcome Doctor ${data}!`, {
          autoClose: 1500, 
        });
      })
      .catch((error) => setError(error.response.data.message));
  };

  const handleGetAppointments = () => {
    Axios.get(`http://localhost:3001/api/doctors/artt`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to retrieve appointments");
        }
        const data = response.data;
        setAppointments(data);
        setTotalAppointments(data.length);
      })
      .catch((error) => setError(error.response.data.message));
  };

  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/Admin");
  };

  const handleStatusChange = (appointmentnumber, newStatus) => {
    // Make a PUT request to update the status of the appointment with the given ID
    Axios.put(`http://localhost:3001/api/appointments/${appointmentnumber}`, {
      status: newStatus,
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to update appointment status");
        }
        // Update the appointments list with the updated appointment status
        const updatedAppointments = appointments.map((appointment) => {
          if (appointment.appointmentnumber === appointmentnumber) {
            return { ...appointment, status: newStatus };
          } else {
            return appointment;
          }
        });
        setAppointments(updatedAppointments);
      })
      .catch((error) => setError(error.response.data.message));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Iterate over the appointments list and update the status of each appointment
    appointments.forEach((appointment) => {
      handleStatusChange(appointment.appointmentnumber, appointment.newStatus);
    });
  };
  useEffect(() => {
    myTest();
  }, []);

  console.log(doctorFullName);
  return (
    <div>
      <h3>
        Doctor <span style={{ fontWeight: "300" }}>{doctorFullName}</span>
      </h3>

      <button onClick={handleSignOut}>Sign Out</button>
      <button onClick={handleGetAppointments}>Get Appointments</button>
      <p>Total Appointments: {totalAppointments}</p>
      <br />
      {appointments.map((appointment) => (
        <div key={appointment.appointmentnumber}>
          <p>App: {appointment.appointmentnumber}</p>
          <p>
            <span style={{ fontWeight: "bold" }}>Patient full name:</span>{" "}
            {appointment.name}
          </p>
          <p>
            <span style={{ fontWeight: "lighter" }}> Appointment Date:</span>{" "}
            {appointment.appointment_date}
          </p>
          <p>Status: {appointment.status}</p>
          <br />
          <br />

          <label htmlFor={`status-${appointment.appointmentnumber}`}>
            Update Status:
            <select
              id={`status-${appointment.appointmentnumber}`}
              value={appointment.newStatus}
              onChange={(event) => (appointment.newStatus = event.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <div>
            <button type="submit">Update Statuses</button>
          </div>
        </div>
      ))}

      {error && <p>{error}</p>}
      <ToastContainer />
    </div>
  );
};

export default DoctorAppointments;
