import { Margin } from "@mui/icons-material";
import packageJson from "../package.json";

export default function Footer(){
    return(
<footer>
<span> version: {packageJson["version"]}</span>
</footer>
);
}

