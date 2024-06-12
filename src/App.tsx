import React from "react";
import { useOrder } from "./context/OrderContext"; 
import Welcome from "./components/Welcome";

import Menu from "./components/Menu";
const App: React.FC = () => {
  const { page } = useOrder();

  if (page === "welcome") {
    return <Welcome />;
  }


  if (page === "menu") {
    return <Menu />;
  }

  return null;
};

export default App;
