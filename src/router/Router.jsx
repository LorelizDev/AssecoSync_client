import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import { AdminRoutes, PrivateLayout } from '../layout/PrivateLayout';
import LoginPage from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AdminEmployeeList from '../pages/AdminEmployeeList';
import { RegisterPage } from '../pages/RegisterPage';
import CalendarPage from '../pages/CalendarPage';
import EmployeeRequest from '../pages/EmployeeRequest';
import StatisticsTimeLogPage from '../pages/StatisticsTimeLogPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '*',
    element: <PrivateLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'calendar',
        element: <CalendarPage />,
      },
      {
        path: 'admin',
        element: <AdminRoutes />,
        children: [
          {
            path: 'register-employee',
            element: <RegisterPage />,
          },
          {
            path: 'employees-list',
            element: <AdminEmployeeList />,
          },
          {
            path: 'employee-requests',
            element: <EmployeeRequest />,
          },
          {
            path: 'statistics-time-log',
            element: <StatisticsTimeLogPage />,
          },
        ],
      },
    ],
  },
]);
