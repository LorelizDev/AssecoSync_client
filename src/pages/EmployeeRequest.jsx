import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeRequestList from '../components/EmployeeRequestList';
import EmployeeFilter from '../components/EmployeeFilter';

const EmployeeRequest = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Obtener token de localStorage

  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  // Función de búsqueda que filtra empleados
  const handleSearch = (searchParams) => {
    const key = Object.keys(searchParams)[0];
    const value = searchParams[key];

    const filtered = filteredEmployees.filter((employee) => {
      const targetValue = employee[key]?.toLowerCase() || '';
      return targetValue.includes(value.toLowerCase());
    });
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Resetear la página al primer resultado después de filtrar
  };

  // Lógica de paginación
  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const totalEmployees = filteredEmployees.length;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < totalEmployees) {
      setCurrentPage((prev) => prev + 1);
    }
  };

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

        <div className="relative px-4 md:pl-[1.2rem] pb-4 max-w-fit">
          <EmployeeFilter onSearch={handleSearch} />
        </div>

        <div className="px-4 overflow-x-auto md:-right-[22%] md:w-[120%]">
          {/* Pasar el token a EmployeeRequestList */}
          <EmployeeRequestList token={token} />
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between items-center px-6 py-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1}-{Math.min(endIndex, totalEmployees)} of{' '}
            {totalEmployees}
          </div>

          {/* Paginación */}
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white'}`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={endIndex >= totalEmployees}
              className={`px-3 py-2 rounded ${endIndex >= totalEmployees ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/5 bg-secondarybg"></div>
    </div>
  );
};

export default EmployeeRequest;
