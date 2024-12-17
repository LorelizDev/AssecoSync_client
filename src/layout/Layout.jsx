import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserInfo } from '../context/authStore';

const Layout = () => {
  const { isAuthenticated } = useUserInfo();
  return (
    <>
      <Outlet />
      {isAuthenticated ? (
        <>
          <Navigate to="/dashboard" replace />
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default Layout;
