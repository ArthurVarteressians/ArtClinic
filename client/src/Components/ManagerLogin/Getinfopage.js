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

  return (
    <div className="getPatientInformationsPage">
      <h2>Manager Logined Successfully</h2>
      <button onClick={getPatientInformations}>Get Clients Info</button>

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
  );
};

export default Getinfopage;
