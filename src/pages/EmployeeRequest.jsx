import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeRequestList from '../components/EmployeeRequestList';

const EmployeeRequest = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="z-10 hidden md:block md:relative md:w-20 bg-primarybg">
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="relative flex-grow md:w-4/5 bg-primarybg">
        <div className="container px-6 py-6">
          <h1 className="text-2xl text-primary font-bold mb-1">
            Solicitud de permisos
          </h1>
        </div>

        {/* Pasar el token a EmployeeRequestList */}
        <EmployeeRequestList token={token} />
      </div>

      {/* Right Side */}
      <div className="w-1/5 bg-secondarybg"></div>
    </div>
  );
};

export default EmployeeRequest;
