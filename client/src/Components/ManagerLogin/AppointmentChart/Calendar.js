import React from "react";
import AppointmentCounts from "./AppointmentCounts";
import AppointmentCountsChart from "./AppointmentCountsChart";

function Calendar() {
  return (
    <>
      <div className="Mainmain">
        {/* <AppointmentCounts /> */}
        <AppointmentCountsChart />
      </div>
    </>
  );
}

export default Calendar;
