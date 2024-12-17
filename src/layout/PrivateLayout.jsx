import { Navigate, Outlet } from 'react-router-dom';
import { useUserInfo } from '../context/authStore';
import Navbar from '../components/Navbar';

export const PrivateLayout = () => {
  const { isAuthenticated } = useUserInfo();
  return isAuthenticated ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export const AdminRoutes = () => {
  const { isAuthenticated, role } = useUserInfo();

  return isAuthenticated && role === 'admin' ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
