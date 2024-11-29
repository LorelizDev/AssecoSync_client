import React from 'react';

const StatusBar = () => {
  return (
    <div className="w-[470px] h-[72px] bg-white rounded-lg shadow-md flex justify-between items-center px-6">
      <div className="flex flex-col justify-center items-center">
        <div className="text-font font-medium">16 días</div>
        <div className="text-font">Disfrutadas</div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-primary font-bold text-2xl">7 días</div>
        <div className="text-font">Disponibles</div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-font font-medium">23 días</div>
        <div className="text-font">En total</div>
      </div>
    </div>
  );
};

export default StatusBar;
