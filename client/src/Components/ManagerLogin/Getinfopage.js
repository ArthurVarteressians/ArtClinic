import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./MangerLogin.css";
import MonthlyClientCountsChart from "./ManagerChart";
import { useNavigate } from "react-router-dom";
import ManagerNav from "./ManagerNav/ManagerNav";

const Getinfopage = () => {
  const [patientsList, setPatientList] = useState([]);
  const [newPatientList, setNewPatientList] = useState([]);
  const [callReqList, setCallReqList] = useState([]);
  const [showAllPatients, setShowAllPatients] = useState(false);
  const [showNewPatients, setShowNewPatients] = useState(false);
  const [showConsultingRequests, setShowConsultingRequests] = useState(false);

  const getPatientInformations = () => {
    Axios.get("http://localhost:3001/GetClientsLists").then((response) => {
      setPatientList(response.data);
      setShowAllPatients(true);
      setShowNewPatients(false);
      setShowConsultingRequests(false);
    });
  };

  const deletePatient = (id) => {
    Axios.delete(`http://localhost:3001/GetClientsLists/${id}`).then(
      (response) => {
        setPatientList((prevList) =>
          prevList.filter((val) => val.id !== id)
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
    Axios.get("http://localhost:3001/GetNewClientsLists").then((response) => {
      setNewPatientList(response.data);
      setShowAllPatients(false);
      setShowNewPatients(true);
      setShowConsultingRequests(false);
    });
  };

  const fetchConsultingReq = () => {
    Axios.get("http://localhost:3001/ConsultingReq").then((response) => {
      setCallReqList(response.data);
      setShowAllPatients(false);
      setShowNewPatients(false);
      setShowConsultingRequests(true);
    });
  };

  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/Admin");
  };

  return (
    <div>
      <ManagerNav />
      <div className="sectionOne">
        <div className="getPatientInformationsPage">
          <h2>Welcome Manager</h2>

          <div className="getInfobtns">
            <button onClick={getPatientInformations}>All Patients Info</button>
            <button onClick={fetchClientCount}>New Patients Info</button>
            <button onClick={fetchConsultingReq}>Consulting Requests</button>
          </div>

          <div className="MainBoxes">
            {showAllPatients && (
              <div className="SecPartFormanager">
                {patientsList.map((val) => (
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
                        <div style={{ fontWeight: "bold" }}> Phone Number</div>
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
                ))}
              </div>
            )}

            {showNewPatients && (
              <div>
                {newPatientList.map((val) => (
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
                        <div style={{ fontWeight: "bold" }}> Phone Number</div>
                        {val.phonenumber}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showConsultingRequests && (
              <div>
                {callReqList.map((val) => (
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
                        <div style={{ fontWeight: "bold" }}> Phone Number</div>
                        {val.phonenumber}
                      </div>
                      <button
                        onClick={() => confirmDelete(val.id)}
                        className="managerDeleteBtn"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Getinfopage;
