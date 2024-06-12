import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Admin from './admin';
import "./index.css";
import { OrderProvider } from './context/OrderContext';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
<OrderProvider>


    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
</OrderProvider>
  
  </React.StrictMode>
);



