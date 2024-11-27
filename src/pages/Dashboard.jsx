import React from 'react';
import Sidebar from '../components/Sidebar'; // Importamos la Sidebar

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="relative w-20 bg-primarybg">
        <Sidebar />
      </div>

      {/* Área principal (80% del ancho) */}
      <div className="w-4/5 bg-primarybg"></div>

      {/* Lado derecho (20% del ancho) */}
      <div className="w-1/5 bg-secondarybg"></div>
    </div>
  );
};

export default Dashboard;
