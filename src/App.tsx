import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './Admin/Components/LoginPage'; // Ensure correct import
import PrivateRoute from './Admin/Components/PrivateRoute'; // Ensure correct import
import { OrderProvider } from './context/OrderContext';

const App: React.FC = () => {
  return (
    <div className='min-h-screen overflow-auto'>
      <OrderProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<PrivateRoute />} />
          </Routes>
        </Router>
      </OrderProvider>
    </div>
  );
};

export default App;
