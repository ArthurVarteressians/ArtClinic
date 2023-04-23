import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Imgs/logo.png";
import Telicon from "./emergency-call.gif";
import LoginIcon from "./profile.gif";

function Navtest() {
  return (
    <div className="navWebV">
      <div className="navWebVContainer">
      <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>

        <div className="navWebVLinks">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link to="/AllDoctors">Doctors</Link>
          </li>
          <li>
            <Link to="/ServicesPage">Services</Link>
          </li>
          <li>
            <div className="iconLoginNav">
              <Link to="/Profile">
                <img src={LoginIcon} />
                <span className="iconNumber">02212</span>
              </Link>
            </div>
          </li>
          <li>
            <div className="iconNumSe">
              <img src={Telicon} alt="Clinic Number" />
              <span className="iconNumber">02212</span>
            </div>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Navtest;
