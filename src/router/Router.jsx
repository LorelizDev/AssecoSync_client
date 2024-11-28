import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import LoginPage from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AdminEmployeeList from '../pages/AdminEmployeeList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        // Nueva ruta para el Dashboard
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        // New rout AdminEmployeeList
        path: 'AdminEmployeeList',
        element: <AdminEmployeeList />,
      },
    ],
  },
]);
