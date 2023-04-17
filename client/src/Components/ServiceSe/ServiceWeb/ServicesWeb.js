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
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            consequatur doloremque voluptatum quaerat, molestiae quam non neque
            exercitationem dolores rerum rem ratione. Eum aut excepturi omnis
            alias corporis quas delectus?
          </p>
        </div>

        <div class="service2">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            consequatur doloremque voluptatum quaerat, molestiae quam non neque
            exercitationem dolores rerum rem ratione. Eum aut excepturi omnis
            alias corporis quas delectus?
          </p>
          <img src={img5} alt="service2" />
        </div>
        <div class="service3">
          <img src={img3} alt="service3" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            consequatur doloremque voluptatum quaerat, molestiae quam non neque
            exercitationem dolores rerum rem ratione. Eum aut excepturi omnis
            alias corporis quas delectus?
          </p>
        </div>
        <div class="service4">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            consequatur doloremque voluptatum quaerat, molestiae quam non neque
            exercitationem dolores rerum rem ratione. Eum aut excepturi omnis
            alias corporis quas delectus?
          </p>
          <img src={img4} alt="service4" />
        </div>
        <button onClick={handleClick}>Schedule A Meeting</button>
      </div>
    </div>
  );
};

export default ServicesWeb;
