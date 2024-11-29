import React from 'react';
import Sidebar from '../components/Sidebar';
import { TimeClock } from '../components/TimeClock';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="relative w-20 bg-primarybg">
        <Sidebar />
      </div>

      <div className="w-4/5 bg-primarybg flex justify-between items-start pt-8">
        <div className="w-1/2">
          <TimeClock />
        </div>
        <div className="w-1/2 flex flex-col items-center space-y-4">

        </div>
      </div>  

      {/* Lado derecho (20% del ancho) */}
      <div className="w-1/5 bg-secondarybg "></div>
      
    </div>
  );
};

export default Dashboard;
