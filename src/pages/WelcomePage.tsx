
import { useOrder } from "../context/OrderContext";
import Welcome from "../components/Welcome";
import Menu from "../components/Menu";


export default function WelcomePage() {
    const { page } = useOrder();
 
    if (page === "welcome") {
        return <Welcome />;
      }
    if (page === "menu") {
        return <Menu />;
      }
    
  
}


