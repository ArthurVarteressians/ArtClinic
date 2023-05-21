import { useMediaQuery } from "@material-ui/core";
import NavWeb from "./WebView/NavWeb";

function Navigation() {
  const ifWeb = useMediaQuery("(width > 650px)");

  return (
    <div>
      {ifWeb && <NavWeb />}
    </div>
  );
}
export default Navigation;
