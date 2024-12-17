// Admin Dashboard
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ButtonIcons from '../components/ButtonIcons';
import EmployeeListIcon from '../assets/images/icons/employee-list.svg';
import RegisterIcon from '../assets/images/icons/register.svg';
import StatisticsIcon from '../assets/images/icons/button clock-in.svg';
import RequestIcon from '../assets/images/icons/peticiones.svg';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Define button click handlers
  const navigateToEmployees = () => navigate('/admin/employees-list');
  const navigateToRegister = () => navigate('/admin/register-employee');
  const navigateToStatistics = () => navigate('/admin/statistics-time-log');
  const navigateToRequests = () => navigate('/admin/employee-requests');

  return (
    <div
      className="flex flex-col md:flex-row
  h-screen"
    >
      {/* Sidebar */}
      <div className="z-10 hidden md:block md:relative md:w-20 bg-primarybg">
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="relative flex-grow md:w-4/5 bg-primarybg">
        <div className="container px-6 py-6">
          <h1 className="text-2xl text-primary font-bold mb-1">
            Admin Dashboard
          </h1>
          {/* Wrapper to break out of container */}
        </div>
        <div className="w-full md:absolute md:-right-[22%] md:w-[120%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-fit">
            {/* Buttons */}
            <ButtonIcons onClick={navigateToRegister} className="px-4 h-[6rem]">
              <img src={RegisterIcon} alt="Register Icon" className="w-16" />
              <p className="text-base">Registro</p>
            </ButtonIcons>

            <ButtonIcons
              onClick={navigateToEmployees}
              className="px-4 h-[6rem]"
            >
              <img
                src={EmployeeListIcon}
                alt="Employee List Icon"
                className="w-16"
              />
              <p className="text-base">Lista de empleados</p>
            </ButtonIcons>

            <ButtonIcons
              onClick={navigateToStatistics}
              className="px-4 h-[6rem]"
            >
              <img
                src={StatisticsIcon}
                alt="Statistics Icon"
                className="w-16"
              />
              <p className="text-base">Estadísticas</p>
            </ButtonIcons>

            <ButtonIcons onClick={navigateToRequests} className="px-4 h-[6rem]">
              <img src={RequestIcon} alt="Request Icon" className="w-16" />
              <p className="text-base">Solicitudes Permisos</p>
            </ButtonIcons>
          </div>
        </div>
      </div>

      {/* Lado derecho (20% del ancho) */}
      <div className="w-1/5 bg-secondarybg "></div>
    </div>
  );
};

export default AdminDashboard;
