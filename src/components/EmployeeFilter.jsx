import { useState } from 'react';
import React from 'react';
import { BiFilterAlt } from 'react-icons/bi';

const EmployeeFilter = ({ onSearch, onReset }) => {
  const filters = [
    { key: 'id', label: 'ID', type: 'text' },
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'lastName', label: 'Apellidos', type: 'text' },
    { key: 'jobTitle', label: 'Cargo', type: 'text' },
  ];

  const [selectedFilter, setSelectedFilter] = useState('id');
  const [filterValue, setFilterValue] = useState('');

  const currentFilterLabel = filters.find((filter) => filter.key === selectedFilter)?.label || 'Filtro';

  const handleSearch = () => {
    onSearch({ [selectedFilter]: filterValue });
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setFilterValue(''); // Reset the text input
  };

  const handleReset = () => {
    setSelectedFilter('id'); // Reset dropdown to default
    setFilterValue(''); // Clear search input
    onReset(); // Notify parent to reset the search
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-white border rounded-lg w-full max-w-4xl mb-6">
      {/* Filter Icon and Label */}
      <div className="flex items-center w-full md:w-auto p-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full mr-2">
          <BiFilterAlt />
        </div>
        <span className="text-sm font-medium text-[#1D1D1D] mr-2">
          Filtrar por
        </span>

        {/* Dropdown for Filter Selection */}
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="border rounded p-1 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        >
          {filters.map((filter) => (
            <option key={filter.key} value={filter.key}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      {/* Search Input */}
      <div className="flex-grow w-full md:w-auto p-2">
        <input
          type="text"
          placeholder={`Buscar por ${currentFilterLabel}`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="w-full pl-2 h-10 border border-gray-300 rounded focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {/* Search Button */}
      <div className="flex space-x-2 w-full md:w-auto p-2">
        <button
          onClick={handleSearch}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-[#31B8EA] focus:outline-none"
        >
          Buscar
        </button>
        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded hover:bg-gray-700 focus:outline-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default EmployeeFilter;
