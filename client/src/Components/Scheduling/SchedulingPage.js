import React from "react";
import Calendar from "./Calendar";
import SchedulingNav from "./SchedulingNav";
import Footer from "../Footer/Footer";
const SchedulingPage = () => {
  return (
    <div>
      <SchedulingNav />
      <Calendar />
      <Footer />
    </div>
  );
};

export default SchedulingPage;
