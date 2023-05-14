import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from "./App";
import Doctors from "./Components/Doctors/Doctors";
import Mainpage from "./Components/Mainpage/Mainpage";
import Services from "./Components/ServiceSe/Services.js";
import MainSignUp from "./Components/Signup/MainSignUp";
import "./Components/Sass/LandingpageButton.scss";
import Getinfopage from "./Components/ManagerLogin/Getinfopage";
import ManagerLogin from "./Components/ManagerLogin/ManagerLogin";
// import Calendar from "./Components/Scheduling/Calendar";
import MainAboutSetcin from "./Components/About/MainAboutSetcin";
import PrivacyandPolicy from "./Components/Privacy&Policy/PrivacyandPolicy";
import DoctorGetInfo from "./Components/ManagerLogin/Docotrs/DoctorGetInfo";
import ManagerSection from "./Components/ManagerLogin/ManagerSection";
import MainScheSec from "./Components/Scheduling/MainScheSec";
import CardDetails from "./Components/Payment/Payment";
// REACT_APP_RECAPTCHA_SITE_KEY = "6LfRNwgmAAAAAN8Y1IYfVYy7a8pgapket83JSxRK";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/Payment",
    element: <CardDetails />,
  },

  {
    path: "/Patient-Profile",
    element: <MainScheSec />,
  },
  {
    path: "AllDoctors",
    element: <Doctors />,
  },
  {
    path: "ServicesPage",
    element: <Services />,
  },
  {
    path: "Profile",
    element: <MainSignUp />,
  },
  {
    path: "Home",
    element: <Mainpage />,
  },
  {
    path: "Admin",
    element: <ManagerLogin />,
  },
  {
    path: "/Admin/Manager",
    element: <ManagerSection />,
  },
  {
    path: "AboutUs",
    element: <MainAboutSetcin />,
  },

  {
    path: "Privacy&Policy",
    element: <PrivacyandPolicy />,
  },
  {
    path: "/Admin/Doctor",
    element: <DoctorGetInfo />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
