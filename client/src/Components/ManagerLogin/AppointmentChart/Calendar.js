import React from "react";
import AppointmentCountsChart from "./AppointmentCountsChart";
import MonthlyClientCountsChart from "../Getinfopage/Chart/ManagerChart";

function Calendar() {
  return (
    <>
        <MonthlyClientCountsChart />
        <hr/>
         <AppointmentCountsChart />
    </>
  );
}

export default Calendar;
