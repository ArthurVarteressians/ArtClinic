import React from "react";
import img1 from "../img1.jpg";
import img2 from "../img2.jpg";
import img3 from "../img3.jpg";
import img4 from "../img4.jpg";
import img5 from "../img5.jpg";
import img6 from "../img6.jpg";

import Landingbg from "./b1.png";
import "./DoctorWeb.css";
import Doctor from "./DoctorWeb";

const DoctorsWeb = () => {
  const soc1 = [
    <a>
      <i class="fa-brands fa-instagram"></i>
    </a>,
    <a>
      <i class="fa-brands fa-facebook"></i>
    </a>,
    <a>
      <i class="fa-brands fa-linkedin"></i>
    </a>,
  ];
  const soc2 = [
    <a>
      <i class="fa-brands fa-instagram"></i>
    </a>,
    <a>
      <i class="fa-brands fa-facebook"></i>
    </a>,
  ];
  const soc3 = [
    <a>
      <i class="fa-brands fa-instagram"></i>
    </a>,
    <a>
      <i class="fa-brands fa-facebook"></i>
    </a>,
    <a>
      <i class="fa-brands fa-linkedin"></i>
    </a>,
  ];
  const soc4 = [
    <a>
      <i class="fa-brands fa-facebook"></i>
    </a>,
  ];
  const soc5 = [
    <a>
      <i class="fa-brands fa-instagram"></i>
    </a>,
  ];
  const soc6 = [
    <a>
      <i class="fa-brands fa-facebook"></i>
    </a>,
    <a>
      <i class="fa-brands fa-linkedin"></i>
    </a>,
  ];
  return (
    <div
      className="DoctorsWebBG"
      style={{ backgroundImage: `url(${Landingbg})` }}
    >
      <div className="DoctorsWebPageBody">
        <div className="doctorsWebContainer">
          <Doctor
            img={img1}
            alt="img"
            name="M. Brandon"
            profession="Dentist"
            description="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
            social={soc1}
          />
          <Doctor
            img={img2}
            alt="img"
            name="J. Aikens"
            profession="Cardiologists"
            description="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
            social={soc2}
          />
          <Doctor
            img={img3}
            alt="img"
            name="J. Aikens"
            profession="Cardiologists"
            description="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
            social={soc3}
          />
          <Doctor
            img={img4}
            alt="img"
            name="J. Aikens"
            profession="Cardiologists"
            description="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
            social={soc4}
          />
          <Doctor
            img={img5}
            alt="img"
            name="K. Pauline"
            profession="Audiologists"
            description="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
            social={soc5}
          />
          <Doctor
            img={img6}
            alt="img"
            name="J. Richard"
            profession="Radiologist"
            description="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
            social={soc6}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorsWeb;
