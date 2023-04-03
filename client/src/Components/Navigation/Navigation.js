import { useMediaQuery } from "@material-ui/core";
import NavWeb from "./WebView/NavWeb";
import NavMob from "./MobileView/NavMob";

function Navigation() {
  const ifWeb = useMediaQuery("(width > 650px)");
  const ifMob = useMediaQuery("(width < 649.9px)");

  return (
    <div>
      {ifMob && <NavMob />}
      {ifWeb && <NavWeb />}
    </div>
  );
}
export default Navigation;