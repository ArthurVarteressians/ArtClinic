import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./MangerLogin.css";
import MonthlyClientCountsChart from "./ManagerChart";

const Getinfopage = () => {
  const [patientsList, setPatientList] = useState([]);
  const [newPatientList, setNewPatientList] = useState([]);
  const [showNewPatients, setShowNewPatients] = useState(false); // added state for showing/hiding new patients

  const getPatientInformations = () => {
    setShowNewPatients(false); // set showNewPatients to false when "All Patients Info" button is clicked
    Axios.get("http://localhost:3001/GetClientsLists").then((response) => {
      setPatientList(response.data);
    });
  };

  const deletePatient = (id) => {
    Axios.delete(`http://localhost:3001/GetClientsLists/${id}`).then(
      (response) => {
        setPatientList(
          patientsList.filter((val) => {
            return val.id !== id;
          })
        );
        Swal.fire("Success", "Your item is deleted!", "success");
      }
    );
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete?",
      showDenyButton: true,
      confirmButtonText: "Cancel",
      denyButtonText: `Yes, delete it`,
    }).then((result) => {
      if (result.isDenied) {
        deletePatient(id);
      }
    });
  };

  const fetchClientCount = () => {
    setShowNewPatients(true); // set showNewPatients to true when "NEW Patients Count" button is clicked
    Axios.get("http://localhost:3001/GetNewClientsLists").then((response) => {
      setNewPatientList(response.data);
    });
  };

  return (
    <div>
      <div className="secionOne">
        <div className="getPatientInformationsPage">
          <h2>Hello Manager</h2>
          <div className="getInfobtns">
            <button onClick={getPatientInformations}>All Patients Info</button>
            <button onClick={fetchClientCount}>New Patients Info</button>
          </div>
          <div className="MainBoxes">
            <div className="allContent">
              {showNewPatients ? (
                <div className="SecPartFormanager">
                  {newPatientList.map((val) => {
                    return (
                      <div className="patientManagerInfo" key={val.id}>
                        <div className="patientManagerInfoSection">
                          <div>
                            <div style={{ fontWeight: "bold" }}> Name</div>
                            {val.name}
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
                            <div style={{ fontWeight: "bold" }}>
                              Phone Number
                            </div>
                            {val.phonenumber}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  {patientsList.map((val) => {
                    return (
                      <div className="patientManagerInfo" key={val.id}>
                        <div className="patientManagerInfoSection">
                          <div>
                            <div style={{ fontWeight: "bold" }}> Name</div>
                            {val.name}
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
                            <div style={{ fontWeight: "bold" }}>
                              Phone Number
                            </div>
                            {val.phonenumber}
                          </div>
                          <button
                            onClick={() => confirmDelete(val.id)}
                            className="managerDeleteBtn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        
        </div>

      </div>

    </div>
  );
};
export default Getinfopage;
