import React, { useState } from "react";
import Axios from "axios";
import "./MangerLogin.css";
import { useNavigate } from "react-router-dom";

const ManagerLogin = () => {
  const [patientsList, setPatientList] = useState([]);
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Send a POST request to the server with manager email and password
    Axios.post("http://localhost:3001/ManagerLogin", {
      email: managerEmail,
      password: managerPassword,
    })
      .then((response) => {
        navigate("/Getinfopage");
      })
      .catch((error) => {
        // If login fails, show error message
        setError("Invalid email or password. Please try again.");
      });
  };

  return (
    <div className="MainBoxes">
      <div className="mainSignUpBodySection">
        <h2>Hello Manager</h2>
        <div className="mainSignUpBody">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter your email"
            type="email"
            id="email"
            onChange={(e) => {
              setManagerEmail(e.target.value);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter password"
            type="password"
            id="password"
            onChange={(e) => {
              setManagerPassword(e.target.value);
            }}
          />

          <button onClick={handleLogin}>Sign In</button>

          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};
export default ManagerLogin;