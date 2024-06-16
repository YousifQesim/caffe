import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import AdminPage from './pages/AdminPage';
import { OrderProvider } from './context/OrderContext';

const App: React.FC = () => {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
};

export default App;
