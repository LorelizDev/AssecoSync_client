import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar hook para navegación
import Sidebar from '../components/Sidebar';
import CalendarComponent from '../components/Calendar';
import Button from '../components/Button';
import StatusVacations from '../components/StatusVacations';

const Dashboard = () => {
  const navigate = useNavigate(); // Inicializar navegación

  const handleButtonClick = () => {
    navigate('/Calendar'); // Navegar a la ruta /Calendar
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="relative w-20 bg-primarybg">
        <Sidebar />
      </div>

      {/* Área principal (80% del ancho) */}
      <div className="w-4/5 bg-primarybg flex justify-between items-start pt-8">
        <div className="w-1/2"></div>
        <div className="w-1/2 flex flex-col items-center space-y-4">
          <StatusVacations />
          <Button onClick={handleButtonClick}>Solicitar ausencias</Button>
          <CalendarComponent />
        </div>
      </div>

      {/* Lado derecho (20% del ancho) */}
      <div className="w-1/5 bg-secondarybg"></div>
    </div>
  );
};

export default Dashboard;
