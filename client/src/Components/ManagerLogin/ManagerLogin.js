import React from "react";
import { useState } from "react";
import "./MangerLogin.css";
import Axios from "axios";

const ManagerLogin = () => {
  const [patientsList, setPatientList] = useState([]);

  const [managerEmail, setManagerEmail] = useState("");
  const [managerPassword, setManagerPassword] = useState("");

  const getPatientInformations = () => {
    Axios.get("http://localhost:3001/ManagerLogin").then((response) => {
      setPatientList(response.data);
    });
  };



  const deletePatients = (id) => {
    Axios.delete(`http://localhost:3001/ManagerDelete/${id}`).then(
      (response) => {
        setPatientList(
          patientsList.filter((val) => {
            return val.id != id;
          })
        );
      }
    );
  };
  return (
    <div>
      <div className="mainSignUpBodySection">
        <h2>Hello Maanager</h2>
        <div className="mainSignUpBody">
          <label for="email">Email:</label>
          <input
            placeholder="Enter your registration email"
            type="email"
            id="email"
            onChange={(e) => {
              setManagerEmail(e.target.value);
            }}
          />

          <label for="password">Password:</label>
          <input
            placeholder="Enter password"
            type="password"
            id="password"
            onChange={(e) => {
              setManagerPassword(e.target.value);
            }}
          />

          {/* <button onClick={managerLoginSection}>Login into account</button> */}

          <button onClick={getPatientInformations}>Sign In</button>
        </div>
        {patientsList.map((val, key) => {
          return (
            <div className="patientManagerInfo">
              <div className="patientManagerInfoSection">
                <div>
                  <div style={{ fontWeight: "bold" }}> Name</div>
                  {val.name}
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}> Last Name</div>
                  {val.lastname}
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}> Email</div>
                  {val.email}
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}> Age</div>
                  {val.age}
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}> Phone Number</div>
                  {val.phonenumber}
                </div>

                <button
                  className="managerDeleteBtn"
                  onClick={() => {
                    deletePatients(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManagerLogin;
