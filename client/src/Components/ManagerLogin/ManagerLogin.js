import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MangerLogin.css";
import Navtest from "../Navigation/WebView/Navtest";
import Footer from "../Footer/Footer";

const ManagerLogin = () => {
  const [patientsList, setPatientList] = useState([]);
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogin = () => {
    Axios.post("http://localhost:3001/ManagerLogin", {
      email: managerEmail,
      password: managerPassword,
    })
      .then((response) => {
        const { data } = response;
        if (data && data.success) {
          if (data.doctorId) {
            navigate("/Admin/Doctor");
            localStorage.setItem("token", data.token);
          } else if (data.managerId) {
            localStorage.setItem("token", data.token);
            navigate("/Admin/Manager");
          } else {
            setError("Invalid role");
          }
        } else {
          setError("Invalid email or password. Please try again.");
        }
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again.");
      });
  };
  return (
    <div>
      <Navtest />

      <div className="MainBoxes">
        <div className="mainSignUpBodySection">
          <h2>Admins Login</h2>
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
      <Footer />
    </div>
  );
};
export default ManagerLogin;
