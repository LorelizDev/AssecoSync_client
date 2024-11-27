import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import LoginPage from '../pages/Login';
import Dashboard from '../pages/Dashboard';

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
    ],
  },
]);
