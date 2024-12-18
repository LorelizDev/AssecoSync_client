import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CalendarComponent from '../components/Calendar';
import Button from '../components/Button';
import StatusVacations from '../components/StatusVacations';
import { TimeClock } from '../components/TimeClock';
import { TimeRegister } from '../components/TimeRegister';
import { StartTime } from '../components/StartTime';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/Calendar');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="relative w-20 bg-primarybg">
        <Sidebar />
      </div>

      {/* Área principal (80% del ancho) */}
      <div className="w-4/5 bg-primarybg flex justify-between items-start pt-8">
        <div className="w-1/2 flex flex-col justify-center items-center space-y-4">
          <StartTime />
          <TimeClock />
          <TimeRegister />
        </div>

        <div className="w-1/2 flex flex-col items-center space-y-4">
          <StatusVacations />
          <Button onClick={handleButtonClick}>Solicitar ausencias</Button>
          <CalendarComponent />
        </div>
      </div>

      {/* Lado derecho (20% del ancho) */}
      <div className="w-1/5 bg-secondarybg "></div>
    </div>
  );
};

export default EmployeeDashboard;
