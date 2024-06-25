import { useOrder } from "../context/OrderContext";
import Welcome from "../components/Welcome";
import Menu from "../components/Menu";
import TableSelection from "../components/TableSelection";

export default function WelcomePage() {
  const { page } = useOrder();

  if (page === "welcome") {
    return <Welcome />;
  }
  if (page === "menu") {
    return <Menu />;
  }

  if (page === "tableSelection") {
    return <TableSelection />;
  }
}
