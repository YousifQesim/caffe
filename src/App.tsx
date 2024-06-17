import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import AdminPage from './pages/AdminPage';
import { OrderProvider } from './context/OrderContext';

const App: React.FC = () => {
  return (
    <div className='min-h-screen overflow-auto'>

    <OrderProvider >
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </OrderProvider>
    </div>
  );
};

export default App;
