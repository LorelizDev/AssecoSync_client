import React from 'react';
import { RxAvatar } from 'react-icons/rx';

const EmployeeList = ({ employees }) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-[14px] border border[#b8b8b8]">
      <table className="w-full text-xs">
        <thead className="bg-[#fcfcfc]">
          <tr className="text-base">
            <th className="p-3 text-left">Profile</th>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nombres</th>
            <th className="p-3 text-left">Apellidos</th>
            <th className="p-3 text-left">Correo</th>
            <th className="p-3 text-left">Cargo</th>
          </tr>
        </thead>

        <tbody className="text-base">
          {employees.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-3 text-center">
                No hay empleados disponibles.
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-100">
                <td className="p-3">
                  {!employee.avatar ? (
                    <RxAvatar className="w-10 h-10 text-grayicon" />
                  ) : (
                    <img
                      src={employee.avatar}
                      alt={`${employee.firstName} ${employee.lastName}`}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                </td>
                <td className="p-3">{employee.id}</td>
                <td className="p-3">{employee.firstName}</td>
                <td className="p-3">{employee.lastName}</td>
                <td className="p-3">{employee.email}</td>
                <td className="p-3">{employee.jobTitle}</td>
                <td className="p-3">
                  <button className="bg-primary text-white px-3 py-1 rounded">
                    Editar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
