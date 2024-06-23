
import { Navigate } from 'react-router-dom';
import AdminPage from '../Admin'; // Ensure correct import

const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  return token ? <AdminPage /> : <Navigate to="/login" />;
};

export default PrivateRoute;
