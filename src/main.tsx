import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { OrderProvider } from "./context/OrderContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <OrderProvider>
      <App />
    </OrderProvider>
  </React.StrictMode>
);
