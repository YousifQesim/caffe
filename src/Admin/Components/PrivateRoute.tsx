import { Navigate } from 'react-router-dom';
import AdminPage from '../Admin'; // Ensure correct import

/**
 * PrivateRoute component acts as a route guard to protect AdminPage.
 * It checks for a valid token in localStorage. If token exists, renders AdminPage.
 * If token does not exist, redirects user to the '/login' page.
 */
const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  return token ? <AdminPage /> : <Navigate to="/login" />;
};

export default PrivateRoute;
