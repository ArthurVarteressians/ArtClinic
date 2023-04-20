import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./MangerLogin.css";

const Getinfopage = () => {
  const [patientsList, setPatientList] = useState([]);

  const getPatientInformations = () => {
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

  const fetchClientCount = async () => {
    try {
      // Make GET request to get count of clients
      const response = await fetch("http://localhost:3001/GetNewClientsLists");
      if (response.ok) {
        // Parse response to JSON
        const data = await response.json();
        // Extract totalClients count from data
        const totalClients = data.totalClients;
        // Display totalClients count as needed
        console.log(`Total new registered clients are: ${totalClients}`);
      } else {
        // Handle error
        console.error("Failed to get count of clients");
      }
    } catch (error) {
      // Handle network error
      console.error(error);
    }
  };

  return (
    <div>
      <div className="secionOne">
        <div className="getPatientInformationsPage">
          <h2>Manager Logined Successfully</h2>
          <div className="getInfobtns">
            <button onClick={getPatientInformations}>All Patients Info</button>
            <button onClick={fetchClientCount}>NEW Patients Count</button>
          </div>
          <div className="MainBoxes">
            <div className="allContent">
              {patientsList.map((val, key) => {
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
                        <div style={{ fontWeight: "bold" }}> Phone Number</div>
                        {val.phonenumber}
                      </div>

                      <button onClick={() => confirmDelete(val.id)}>
                        Delete Patient
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Getinfopage;
