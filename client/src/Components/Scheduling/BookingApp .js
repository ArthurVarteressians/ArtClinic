import React, { useState } from "react";
import Axios from "axios";

const BookingApp = () => {
  const [availableTime, setAvailableTime] = useState([]);

  const getAvailableTime = () => {
    Axios.get("http://localhost:3001/MakeAppointment").then((response) => {
      // Convert response data to array and update state
      setAvailableTime(Array.isArray(response.data) ? response.data : []);
    });
  };

  const handleGetInfoClick = () => {
    getAvailableTime();
  };

  return (
    <div>
      <button onClick={handleGetInfoClick}>Get Info</button>
      {availableTime.map((time) => (
        <div key={time.id}>
          <p>ID: {time.id}</p>
          <p>Date: {time.date}</p>
          <p>Time: {time.time}</p>
          <p>Available: {time.is_available ? "Yes" : "No"}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BookingApp;
