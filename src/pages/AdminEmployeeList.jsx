import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeList from '../components/EmployeeList'; // Import the EmployeeList component
import EmployeeFilter from '../components/EmployeeFilter';
import employeesData from '../../data/db.json';

const AdminEmployeeList = () => {
  const [employees, setEmployees] = useState(employeesData.employees);

  const handleSearch = (searchParams) => {
    const filteredEmployees = employeesData.employees.filter((employee) => {
      return Object.entries(searchParams).every(([key, value]) =>
        employee[key].toLowerCase().includes(value.toLowerCase())
      );
    });
    setEmployees(filteredEmployees);
  };

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
      <div className="w-full md:w-4/5 bg-primarybg relative">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-1xl text-primary font-bold mb-4">
            Lista de empleados
          </h1>
          {/* Wrapper to break out of container */}
        </div>
        <div className="relative px-4 md:pl-[1.2rem] pb-4 max-w-fit">
          <EmployeeFilter onSearch={handleSearch} />
        </div>
        <div className="w-full md:absolute md:-right-[22%] md:w-[120%]">
          <EmployeeList employees={employees} />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/5 bg-secondarybg"></div>
    </div>
  );
};

export default AdminEmployeeList;
