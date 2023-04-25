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
import Calendar from "./Components/Scheduling/Calendar";
import MainAboutSetcin from "./Components/About/MainAboutSetcin";
import PrivacyandPolicy from "./Components/Privacy&Policy/PrivacyandPolicy";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/Calendar",
    element: <Calendar />,
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
    path: "Getinfopage",
    element: <Getinfopage />,
  },
  {
    path: "AboutUs",
    element: <MainAboutSetcin />,
  },

  {
    path: "Privacy&Policy",
    element: <PrivacyandPolicy />,
  },


]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
