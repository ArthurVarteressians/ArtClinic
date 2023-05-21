import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./DoctorAppointments.css"
const DoctorAppointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/doctorsss");
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAppointments = async (doctorId) => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/appointmentss?doctorId=${doctorId}`
      );
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;
    setSelectedDoctor(doctorId);
    fetchAppointments(doctorId);
  };

  const totalAppointments = appointments.length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };


  return (
    <div>
      <h2>Doctor Appointments</h2>
      <select value={selectedDoctor} onChange={handleDoctorChange}>
        <option value="">Select a Doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.doctor_id} value={doctor.doctor_id}>
            {doctor.fullname}
          </option>
        ))}
      </select>

      {appointments.length > 0 ? (
        <div>
          <p>
            Total Appointments:{" "}
            <span style={{ fontWeight: "bold" }}> {totalAppointments}</span>
          </p>
          <div className="appointment-grid">
            {appointments.map((appointment) => (
              <div
                key={appointment.appointmentNumber}
                className="appointment-card"
              >
                <div className="card-header">
                  <h3>Appointment Number: {appointment.appointmentNumber}</h3>
                </div>
                <div className="card-body">
                  <p>Patient ID: {appointment.patient_id}</p>
                  <p>Patient Name: {appointment.patient_name}</p>
                  <p>
                    Patient Phone Number: {appointment.patient_phone_number}
                  </p>
                  <p>Appointment Date: {formatDate(appointment.appointment_date)}</p>
                  <p>Update Date: {formatDate(appointment.update_date)}</p>
                  <p>
                    Appointment Status:{" "}
                    {appointment.appointment_status === 0 ? (
                      <span className="in-progress">In Progress</span>
                    ) : (
                      <span className="closed">Closed</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default DoctorAppointments;
