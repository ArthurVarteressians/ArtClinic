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

  const [availableTimes, setAvailableTimes] = useState([]);

  //=================

  const filterDate = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
  };

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

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/Profile");
      }, 2000);
      return;
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (doctors.length > 0) {
        const token = localStorage.getItem("token");

        // Check if the selected time is available
        const availabilityResponse = await axios.post(
          "http://localhost:3001/checkAvailability",
          {
            doctorId: doctors[0].doctor_id,
            date: selectedDate,
            time: selectedTime,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (availabilityResponse.status === 200) {
          // The selected time is available, proceed with booking the appointment
          const response = await axios.post(
            "http://localhost:3001/Sched",
            {
              doctorId: doctors[0].doctor_id,
              date: selectedDate,
              time: selectedTime,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );

          toast.success("Appointment booked successfully");
        } else {
          toast.error("The selected time is not available");
        }
      } else {
        console.error("No doctors found in the doctors array");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // The selected time is not available
        toast.error("The selected time is not available!");
      } else if (error.response && error.response.status === 401) {
        // Session expired
        toast.error("Session expired. Please log in again!");

        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/Profile");
        }, 2000);
      } else {
        toast.error("Please log in again!");
        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/Profile");
        }, 2000);
      }
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
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            filterDate={filterDate} // Exclude weekends
          />

          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Select Time</option>
            <option value="10:00">10:00</option>
            <option value="12:00">12:00</option>
            <option value="14:00">14:00</option>
            <option value="16:00">16:00</option>
          </select>
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
