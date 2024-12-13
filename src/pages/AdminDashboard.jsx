// Admin Dashboard
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ButtonIcons from '../components/ButtonIcons';
import EmployeeIcon from '../assets/images/icons/employee.svg';
import RegisterIcon from '../assets/images/icons/register.svg';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Inicializar navegación

  // Define button click handlers
  const navigateToEmployees = () => navigate('/AdminEmployeeList');
  const navigateToRegister = () => navigate('/register');

  return (
    <div>
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
          <div className="container px-4 py-6">
            <h1 className="text-1xl text-primary font-bold mb-1">
              Admin Dashboard
            </h1>
            {/* Wrapper to break out of container */}
          </div>
          <ButtonIcons onClick={navigateToEmployees} className="h-24">
            <img src={EmployeeIcon} alt="Employee Icon" className="w-16" />
            Peticiones
          </ButtonIcons>
          <ButtonIcons onClick={navigateToRegister} className="h-24">
            <img src={RegisterIcon} alt="Register Icon" className="w-16" />
            Lista de empleados
          </ButtonIcons>
          <ButtonIcons onClick={navigateToEmployees} className="h-24">
            <img src={EmployeeIcon} alt="Employee Icon" className="w-16" />
            Estadísticas
          </ButtonIcons>
          <ButtonIcons onClick={navigateToRegister} className="h-24">
            <img src={RegisterIcon} alt="Register Icon" className="w-16" />
            Registro
          </ButtonIcons>
        </div>
      </div>

      {/* Lado derecho (20% del ancho) */}
      <div className="w-1/5 bg-secondarybg "></div>
    </div>
  );
};

export default AdminDashboard;
