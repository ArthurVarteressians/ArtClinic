import React, { useState } from "react";
import CallRequests from "../Getinfopage/CallRequests/CallRequests";
import MonthlyClientCountsChart from "../Getinfopage/Chart/ManagerChart";
import GetPatientInformations from "../Getinfopage/Patientlist/GetPatientInformations";
import "./FullManagerSection.css";

function FullManagerSecion() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleClick = (component) => {
    setActiveComponent(component);
  };

  const handlePatientInformationClick = () => {
    setActiveComponent("patientInformations");
  };

  return (
    <div>
      <div className="subheader">
        <button
          className={activeComponent === "callRequests" ? "active" : ""}
          onClick={() => handleClick("callRequests")}
        >
          Call Requests
        </button>
        <button
          className={activeComponent === "monthlyClientCounts" ? "active" : ""}
          onClick={() => handleClick("monthlyClientCounts")}
        >
          Monthly Client Counts
        </button>
        <button
          className={activeComponent === "patientInformations" ? "active" : ""}
          onClick={handlePatientInformationClick}
        >
          Patient Information
        </button>
      </div>

      {activeComponent === "callRequests" && <CallRequests />}
      {activeComponent === "monthlyClientCounts" && (
        <MonthlyClientCountsChart />
      )}
      {activeComponent === "patientInformations" && <GetPatientInformations />}
    </div>
  );
}

export default FullManagerSecion;
