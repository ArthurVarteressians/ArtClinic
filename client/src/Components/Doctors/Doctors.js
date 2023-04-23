import { useMediaQuery } from "@material-ui/core";
import DoctorsWeb from "./WebView/DoctorsWeb";
import DoctorsMobile from "./MobiveView/DoctorsMobile";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import Navtest from "../Navigation/WebView/Navtest";
function Doctors() {
  const ifWeb = useMediaQuery("(width > 650px)");
  const ifMob = useMediaQuery("(width < 649.9px)");

  return (
    <div>
      <Navtest />
      {ifMob && <DoctorsMobile />}
      {ifWeb && <DoctorsWeb />}
      <Footer />
    </div>
  );
}

export default Doctors;
