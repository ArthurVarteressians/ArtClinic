import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import ServicesLanding from "./Components/ServicesLanding/WebView/ServicesLanding";
import Footer from "./Components/Footer/Footer";
import Mainpage from "./Components/Mainpage/Mainpage";
import LandingFaqsAll from "./Components/FAQS/LandingFaqsAll";
// import "./Components/Sass/LandingpageButton.scss";
import MainSignUp from "./Components/Signup/MainSignUp";
import ManagerLogin from "./Components/ManagerLogin/ManagerLogin";
import NavWeb from "./Components/Navigation/WebView/NavWeb";
import Navtest from "./Components/Navigation/WebView/Navtest";
import Getinfopage from "./Components/ManagerLogin/Getinfopage/Getinfopage";
import { BrowserRouter } from "react-router-dom";
// import AppointmentForm from "./Components/Scheduling/test";
// import Calendar from "./Components/Scheduling/Calendar";
import BarChart from "./Components/ManagerLogin/ManagerChart";
import AboutMap from "./Components/About/About";
import MainAboutSetcin from "./Components/About/MainAboutSetcin";
import SubmitQ from "./Components/About/SubmitQ";
import ManagerSection from "./Components/ManagerLogin/ManagerSection";
import Main from "./Components/Scheduling/MainScheSec";
import MainTest from "./Components/ManagerLogin/AllSections/MainTest";
import GetPatientInformations from "./Components/ManagerLogin/Getinfopage/Patientlist/GetPatientInformations";
import MonthlyClientCountsChart from "./Components/ManagerLogin/Getinfopage/Chart/ManagerChart";
import CallRequests from "./Components/ManagerLogin/Getinfopage/CallRequests/CallRequests";
import ManagerDashbord from "./Components/ManagerLogin/App";
function App() {
  return (
    <div>
      {/* <MainAboutSetcin /> */}
      {/* <BookingApp /> */}
      {/* <BarChart /> */}
      {/* <AboutMap /> */}
      {/* <MonthlyClientCountsChart /> */}
      {/* <CallRequests /> */}
      {/* <Getinfopage /> */}
      {/* <GetPatientInformations /> */}
      <NavWeb />
      {/* <ManagerDashbord /> */}
      {/* <MainTest  /> */}
      {/* <Main /> */}
      {/* <ManagerSection /> */}
      {/* <SubmitQ /> */}
      {/* <ManagerLogin /> */}
      {/* <Calendar /> */}
      {/* <AppointmentForm /> */}
    </div>
  );
}

export default App;
