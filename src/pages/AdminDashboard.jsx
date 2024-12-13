// Admin Dashboard
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Inicializar navegación

  // Define button click handlers
  const navigateToEmployees = () => navigate('/AdminEmployeeList');
  const navigateToRegister = () => navigate('/register');
  //   const navigateToClockInReports = () => navigate('/reports');
  //   const navigateToRequests = () => navigate('/support');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="z-10 hidden md:block md:relative md:w-20 bg-primarybg">
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="relative flex-grow md:w-4/5 bg-primarybg">
        <div className="w-1/2 flex flex-col justify-center items-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <div>
          <Button onClick={navigateToEmployees}>Empleados</Button>
          <Button onClick={navigateToRegister}>Registro</Button>
        </div>
      </div>

      {/* Lado derecho (20% del ancho) */}
      <div className="w-1/5 bg-secondarybg "></div>
    </div>
  );
};

export default AdminDashboard;
