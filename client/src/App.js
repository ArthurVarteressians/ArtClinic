import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import ServicesLanding from "./Components/ServicesLanding/WebView/ServicesLanding";
import Footer from "./Components/Footer/Footer";
import Mainpage from "./Components/Mainpage/Mainpage";
import LandingFaqsAll from "./Components/FAQS/LandingFaqsAll";
// import "./Components/Sass/LandingpageButton.scss";
import MainSignUp from "./Components/Signup/MainSignUp";
import ManagerLogin from "./Components/ManagerLogin/ManagerLogin";
import Form from "./test";
import NavWeb from "./Components/Navigation/WebView/NavWeb";
import Navtest from "./Components/Navigation/WebView/Navtest";
import SignUp from "./Components/Signup/SignUp";
import Getinfopage from "./Components/ManagerLogin/Getinfopage";
import { BrowserRouter } from "react-router-dom";
// import AppointmentForm from "./Components/Scheduling/test";
import Calendar from "./Components/Scheduling/Calendar";
import BookingApp from "./Components/Scheduling/BookingApp ";
import BarChart from "./Components/ManagerLogin/ManagerChart";
import AboutMap from "./Components/About/About";
import MainAboutSetcin from "./Components/About/MainAboutSetcin";
import SubmitQ from "./Components/About/SubmitQ";
import ManagerSection from "./Components/ManagerLogin/ManagerSection";

function App() {
  return (
    <div>
      {/* <MainAboutSetcin /> */}
      {/* <BookingApp /> */}
      {/* <BarChart /> */}
      {/* <AboutMap /> */}
      <NavWeb />

      {/* <ManagerSection /> */}

      {/* <SubmitQ /> */}
      {/* <ManagerLogin /> */}
      {/* <Calendar /> */}
      {/* <AppointmentForm /> */}
    </div>
  );
}

export default App;
