import React, { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import "./Getinfopage.css";

const GetPatientInformations = () => {
  const [patientsList, setPatientList] = useState([]);
  const [showPatientsGrid, setShowPatientsGrid] = useState(false);

  useEffect(() => {
    getPatientInformations();
  }, []);

  const getPatientInformations = () => {
    Axios.get("http://localhost:3001/GetClientsLists")
      .then((response) => {
        setPatientList(response.data);
        setShowPatientsGrid(true);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", "Failed to fetch patient information.", "error");
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

  return (
    <div className="getPatientInformations">
      {showPatientsGrid && (
        <div className="patientsGrid">
          {patientsList.map((val) => (
            <div className="patientInfo" key={val.id}>
              <div className="showPatientInfo">
                <p>
                  <span style={{ fontWeight: "bold" }}>Patient ID: </span>
                  <span style={{ textDecoration: "underline" }}>
                    {" "}
                    {val.id}{" "}
                  </span>
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Name: </span>
                  {val.name}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Email: </span>
                  {val.email}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Age: </span>
                  {val.age}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Phone Number: </span>
                  {val.phonenumber}
                </p>
              </div>
              <button
                onClick={() => confirmDelete(val.id)}
                className="deleteBtn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetPatientInformations;
