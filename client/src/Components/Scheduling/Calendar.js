import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Calender.css";
import { getDay, addMonths } from "date-fns";

function Calendar() {
  const initialDate = new Date();
  initialDate.setHours(14, 0, 0, 0); // set the time to 14:00
  const [appointmentType, setAppointmentType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTimeOption, setselectedTimeOption] = useState("");

  const [startDate, setStartDate] = useState(null);

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  // Function to handle dropdown header click
  const handleDropdownHeaderClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownHeaderClick2 = () => {
    setIsOpen2(!isOpen2);
  };

  // Function to handle dropdown item click
  const handleDropdownItemClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleDropdownTimeClick = (option) => {
    setselectedTimeOption(option);
    setIsOpen2(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment scheduled for ${name} at ${selectedDate}`);
    setName("");
    setEmail("");
    setSelectedDate(initialDate);
  };

  return (
    <div className="schedulingSystem">
      <div className="Container">
        <h1>Schedule an Appointment </h1>

        <div className="Test" onClick={handleDropdownHeaderClick}>
          <h3>{"Select Department"}</h3>
          {selectedOption || ""}

          {isOpen && (
            <>
              <ul>
                <li onClick={() => handleDropdownItemClick("Heart Doc")}>
                  Heart Doc
                </li>
                <li onClick={() => handleDropdownItemClick("Bone Doc")}>
                  Bone Doc
                </li>
                <li onClick={() => handleDropdownItemClick("Brain Doc")}>
                  Brain Doc
                </li>
                <li onClick={() => handleDropdownItemClick("Lung Doc")}>
                  Lung Doc
                </li>
                <li onClick={() => handleDropdownItemClick("Teeth Doc")}>
                  Teeth Doc
                </li>
              </ul>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            required
          ></input>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          ></input> */}
          <label htmlFor="date">Date</label>
          <DatePicker
            selected={startDate}
            filterDate={isWeekday}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            maxDate={addMonths(new Date(), 2)} // 2 future months
            showDisabledMonthNavigation
            id="date"
            required
          />{" "}
          <div className="Test" onClick={handleDropdownHeaderClick2}>
            <h3>{"Time"}</h3>
            {selectedTimeOption || " "}

            {isOpen2 && (
              <>
                <ul>
                  <li onClick={() => handleDropdownTimeClick("12")}>12</li>
                  <li onClick={() => handleDropdownTimeClick("14")}>14 </li>
                  <li onClick={() => handleDropdownTimeClick("16")}>16</li>
                </ul>
              </>
            )}
          </div>
          <button className="SubmitApps" type="submit" disabled={!selectedDate}>
            Schedule Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Calendar;
