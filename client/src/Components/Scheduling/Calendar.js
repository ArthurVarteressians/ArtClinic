import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calender.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Calendar() {
  //======================
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [department, setDepartment] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [test, setTest] = useState("");
  //=================
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please reload your page");
      navigate("/Profile");
      return;
    }
  }, []);

  const fetchDoctors = (department) => {
    fetch(`http://localhost:3001/doctors/${department}`)
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Error fetching doctors:", err));
  };

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    setSelectedDoctorId(doctorId);
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);
    fetchDoctors(selectedDepartment);
  };

  const handleSubmit = async () => {
    try {
      if (doctors.length > 0) {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3001/Sched",
          {
            doctorId: doctors[0].doctor_id,
            date: selectedDate,
            time: selectedTime,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Appointment booked successfully");
        console.log(token);
        // console.log("Appointment booked successfully:", response.data);
      } else {
        console.error("No doctors found in the doctors array");
      }
    } catch (error) {
      console.error("Failed to book appointment:", error);
    }
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="allSchedule">
      <div className="ScheBox">
        <div className="MainScheSec">
          <h2>Select Department</h2>
          <select
            className="MainselectBox"
            value={department}
            onChange={handleDepartmentChange}
          >
            <option value="">Select Department</option>
            <option value="Dentist">Dentist</option>
            <option value="Cardiologists">Cardiologists</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Pulmonologist">Pulmonologist</option>
            <option value="Radiologist">Radiologist</option>
          </select>
          {department && (
            <div>
              <ul>
                {doctors.map((doctor) => (
                  <li key={doctor.id}>
                    <span>
                      Your Doctor will be:{" "}
                      <span
                        style={{
                          color: "blue",
                          fontSize: "14px",
                          fontWeight: "400",
                          border: "1px solid black",
                          padding: "2px",
                          borderRadius: "8px",
                        }}
                      >
                        {doctor.fullname}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="MainScheSec">
          <h3>Select Appointment Date and Time:</h3>
          <DatePicker selected={selectedDate} onChange={handleDateChange} />
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => handleTimeChange(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Book Appointment</button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Calendar;
