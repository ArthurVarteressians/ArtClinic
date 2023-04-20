import React, { useEffect } from "react";
import "./ServicesWeb.css";
import img1 from "../img1.png";
import img3 from "../img3.png";
import img4 from "../img4.png";
import img5 from "../img5.png";
import { Link, useNavigate } from "react-router-dom";

const ServicesWeb = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate("/Profile");
  };

  return (
    <div>
      <div class="servicesWebMain">
        <div class="service1">
          <img src={img1} alt="Service1" />
          <p>
            Our cutting-edge imaging technology allows for detailed
            visualization of the heart and its structures. Our expert
            radiologists analyze heart images to aid in the diagnosis and
            management of cardiovascular conditions, ensuring optimal heart
            health.
          </p>
        </div>

        <div class="service2">
          <p>
            Our state-of-the-art imaging technology allows for accurate and
            detailed imaging of the brain. Our expert radiologists interpret
            brain images to aid in the diagnosis and treatment of neurological
            conditions, ensuring optimal brain health.
          </p>
          <img src={img5} alt="service2" />
        </div>
        <div class="service3">
          <img src={img3} alt="service3" />
          <p>
            Our specialized dental imaging services capture high-quality images
            of teeth, gums, and jawbone. Our skilled radiologists interpret
            dental images to assist in the diagnosis and treatment of various
            dental conditions, ensuring healthy and beautiful smiles.
          </p>
        </div>
        <div class="service4">
          <p>
            Our advanced imaging techniques provide detailed images of the
            lungs, aiding in the diagnosis and management of respiratory
            conditions. Our experienced radiologists analyze lung images to
            guide treatment plans for optimal lung health.
          </p>
          <img src={img4} alt="service4" />
        </div>
        <button onClick={handleClick}>Schedule A Meeting</button>
      </div>
    </div>
  );
};

export default ServicesWeb;
