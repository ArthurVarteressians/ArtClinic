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
import "./Components/Sass/LandingpageButton.scss"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    path: "MakeAppontmentBTN",
    element: <MainSignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
