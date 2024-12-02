import { useState } from 'react';
import React from 'react';
import { BiFilterAlt } from 'react-icons/bi';

const EmployeeFilter = ({ onSearch }) => {
  const filters = [
    { key: 'id', label: 'ID', type: 'text' },
    { key: 'nombre', label: 'Nombre', type: 'text' },
    { key: 'apellidos', label: 'Apellidos', type: 'text' },
    { key: 'cargo', label: 'Cargo', type: 'text' },
  ];

  const [selectedFilter, setSelectedFilter] = useState('id');
  const [filterValue, setFilterValue] = useState('');

  const handleSearch = () => {
    onSearch({ [selectedFilter]: filterValue });
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-white border rounded-lg w-full max-w-4xl">
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
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border rounded p-1 text-sm"
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
          placeholder={`Buscar por ${selectedFilter}`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="w-full pl-2 h-10 border border-gray-300 rounded"
        />
      </div>

      {/* Search Button */}
      <div className="w-full md:w-auto p-2">
        <button
          onClick={handleSearch}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-[#31B8EA] focus:outline-none"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default EmployeeFilter;
