import React, { useState, useEffect } from "react";
import Cal from "./Calendar";
import "./Cal.css";
import "./Calender.css";
import SchedulingNav from "./SchedulingNav";
import Footer from "../Footer/Footer";
import Under from "./Under";
function Calendar() {
  const [showAppointmentSection, setShowAppointmentSection] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [showAppointmentHistorySection, setShowAppointmentHistorySection] =
    useState(false);

  const handleAppointmentClick = () => {
    setShowAppointmentSection(true);
    setShowPaymentSection(false);
    setShowAppointmentHistorySection(false);
  };

  const handlePaymentClick = () => {
    setShowAppointmentSection(false);
    setShowPaymentSection(true);
    setShowAppointmentHistorySection(false);
  };

  const handleAppointmentHistoryClick = () => {
    setShowAppointmentSection(false);
    setShowPaymentSection(false);
    setShowAppointmentHistorySection(true);
  };

  return (
    <>
      <SchedulingNav />
      <div className="Mainmain">
        <div className="SchedulingBtns">
          <button onClick={handleAppointmentClick}>Make an Appointment</button>
          <button onClick={handleAppointmentHistoryClick}>
            Appointment History
          </button>
          <button onClick={handlePaymentClick}>Payment History</button>
        </div>

        {showAppointmentSection && <Cal />}

        {showPaymentSection && <Under />}

        {showAppointmentHistorySection && <Under />}
      </div>
      <Footer />
    </>
  );
}
export default Calendar;
