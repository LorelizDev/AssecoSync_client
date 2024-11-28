import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '..src/context/AuthStore.jsx';

export const EmployeeRoutes = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const AdminRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuthStore();

  return isAuthenticated && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
