import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../src/context/AuthStore.jsx';

export const EmployeeRoutes = () => {
  const { isAuthenticated, role } = useAuthStore();

  return isAuthenticated && role === 'employee' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export const AdminRoutes = () => {
  const { isAuthenticated, isAdmin, role } = useAuthStore();

  return isAuthenticated && isAdmin && role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

