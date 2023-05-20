import React from "react";
import Getinfopage from "./Getinfopage";
import MonthlyClientCountsChart from "./ManagerChart";
import ManagerNav from "./ManagerNav/ManagerNav";
function ManagerSection() {
  return (
    <div className="managerSecin">
      <Getinfopage />
      <MonthlyClientCountsChart />
    </div>
  );
}

export default ManagerSection;
