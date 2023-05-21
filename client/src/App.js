import "./App.css";

import NavWeb from "./Components/Navigation/WebView/NavWeb";
import Navtest from "./Components/Navigation/WebView/Navtest";
import { BrowserRouter } from "react-router-dom";
import Calendar from "./Components/ManagerLogin/AppointmentChart/Calendar";
import DoctorAppointments from "./Components/ManagerLogin/Getinfopage/CheckDocotrosAppointments/DoctorAppointments ";
function App() {
  return (
    <div>
      {/* <NavWeb /> */}
      {/* <Calendar /> */}
<DoctorAppointments />

    </div>
  );
}

export default App;
