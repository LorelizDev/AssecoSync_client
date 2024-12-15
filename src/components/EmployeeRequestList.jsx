import React, { useState, useEffect } from 'react';

const EmployeeRequestList = () => {
  const [employees, setEmployees] = useState([]);

  // Fetch data
  useEffect(() => {
    // Import the JSON database
    import('../db/dblist.json')
      .then((data) => {
        // Filter employees who have a request
        const filteredEmployees = data.employeesData.filter(
          (emp) => emp.request
        );
        setEmployees(filteredEmployees);
      })
      .catch((error) => console.error('Error loading employee data:', error));
  }, []);

  return (
    <div className="container p-1">
      <div className="rounded-[14px] overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-[#fcfcfc]">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Profile
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Nombre
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Apellidos
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Petición
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Estatus
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={employee.profilePicture}
                      alt={`${employee.firstName} ${employee.lastName}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3">{employee.id}</td>
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.lastName}</td>
                  <td className="px-4 py-2">{employee.request}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        employee.status === 'Aprobado'
                          ? 'bg-green-500'
                          : employee.status === 'Pendiente'
                            ? 'bg-yellow-500'
                            : employee.status === 'Denegado'
                              ? 'bg-red-500'
                              : 'bg-gray-400'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-4 py-4">
                  No employee requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeRequestList;
