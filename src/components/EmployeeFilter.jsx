import { useState } from 'react';
import React from 'react';

const EmployeeFilter = ({ onSearch }) => {
  const filters = [
    { key: 'id', label: 'ID', type: 'text' },
    { key: 'name', label: 'Name', type: 'text' },
    {
      key: 'position',
      label: 'Position',
      type: 'dropdown',
      options: ['Manager', 'Developer'],
    },
    { key: 'email', label: 'Email', type: 'text' },
    {
      key: 'status',
      label: 'Status',
      type: 'dropdown',
      options: ['Active', 'Inactive'],
    },
  ];

  const [filterValues, setFilterValues] = useState({});

  const handleFilterChange = (key, value) => {
    setFilterValues({ ...filterValues, [key]: value });
  };

  const handleSearch = () => {
    onSearch(filterValues);
  };

  return (
    <div className="flex items-center bg-white border rounded-lg shadow p-2 space-x-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.622 5.622a1 1 0 00-.293.707v4.362a1 1 0 01-.553.894l-3 1.5A1 1 0 0110 19v-6.293a1 1 0 00-.293-.707L4.293 6.707A1 1 0 014 6V4z"
          />
        </svg>
      </div>
      <span className="text-sm font-medium text-gray-700">Filtrar por</span>

      {filters.map((filter) => (
        <div key={filter.key} className="mb-4">
          {filter.type === 'text' && (
            <input
              type="text"
              placeholder={filter.label}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="h-10 border border-gray-300"
            />
          )}
          {filter.type === 'dropdown' && (
            <select
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              className="h-10 border border-gray-300"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button
        onClick={handleSearch}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-[#31B8EA] focus:outline-none"
      >
        Search
      </button>
    </div>
  );
};

export default EmployeeFilter;
