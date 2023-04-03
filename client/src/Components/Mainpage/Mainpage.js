import "./Mainpage.css";
import ".././Sass/LandingpageButton.scss";
import { Link } from "react-router-dom";
import Doctors from "../Doctors/Doctors";
function Mainpage() {
  return (
    <div className="mainPageL">
      <div className="mainContentL">
        <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content.
        </p>
        <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content.
        </p>
      </div>
      <div className="mainpageDoctorLBtnSection">
        <Link to="/AllDoctors">
          <button className="mainpageDoctorLBtn">See Doctors</button>
        </Link>
      </div>
    </div>
  );
}

export default Mainpage;
