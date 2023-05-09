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
    console.log("Deleting patient with ID:", id); // Log the ID parameter

    Axios.delete(`http://localhost:3001/GetClientsLists/${id}`)
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          Swal.fire("Error", "Failed to delete item.", "error");
        } else {
          setPatientList((prevList) => prevList.filter((val) => val.id !== id));
          Swal.fire("Success", "Your item is deleted!", "success");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", "Failed to delete item.", "error");
      });
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
  const confirmDelete2 = (id2) => {
    Swal.fire({
      title: "Do you want to delete?",
      showDenyButton: true,
      confirmButtonText: "Cancel",
      denyButtonText: `Yes, delete it`,
    }).then((result) => {
      if (result.isDenied) {
        deleteConsultingRequest(id2);
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

  const fetchConsultingRequest = () => {
    Axios.get("http://localhost:3001/ConsultingReq").then((response) => {
      setCallReqList(response.data); // <-- Update this line
      setShowAllPatients(false);
      setShowNewPatients(false);
      setShowConsultingRequests(true);
    });
  };

  const deleteConsultingRequest = (id2) => {
    console.log("Deleting consulting request with ID:", id2); // Log the ID parameter

    Axios.delete(`http://localhost:3001/ConsultingReq/${id2}`)
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          Swal.fire("Error", "Failed to delete item.", "error");
        } else {
          setCallReqList((prevList) => prevList.filter((val) => val.id2 !== id2));
          Swal.fire("Success", "Your item is deleted!", "success");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", "Failed to delete item.", "error");
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
            <button onClick={fetchConsultingRequest}>
              Consulting Requests
            </button>
          </div>

          <div className="MainBoxess">
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
                        onClick={() => confirmDelete2(val.id2)}
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
