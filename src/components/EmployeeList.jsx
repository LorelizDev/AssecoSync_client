import React from 'react';

const EmployeeList = ({ employees }) => {
  return (
    <div className="w-[1360] bg-white rounded-[14px] border border[#b8b8b8] overflow-hidden">
      <table className="w-full text-xs">
        <thead className="bg-[#fcfcfc]">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nombres</th>
            <th className="p-3 text-left">Apellidos</th>
            <th className="p-3 text-left">Correo</th>
            <th className="p-3 text-left">Cargo</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{employee.id}</td>
              <td className="p-3">{employee.name}</td>
              <td className="p-3">{employee.lastName}</td>
              <td className="p-3">{employee.email}</td>
              <td className="p-3">{employee.position}</td>
              <td className="p-3">
                <button className="bg-primary text-white px-3 py-1 rounded">
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
