import React, { useState, useEffect } from 'react';
import { leaveRequestService } from '../services/employeeService';

const EmployeeRequestList = ({ token }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Cargar las solicitudes de ausencia con los empleados relacionados
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const requestsData =
          await leaveRequestService.getAllLeaveRequestsWithEmployees(token);
        setLeaveRequests(requestsData);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, [token]);

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
                Empleado
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
            {leaveRequests.length > 0 ? (
              leaveRequests.map((request) => (
                <tr key={request.id} className="border-b">
                  <td className="px-4 py-2">
                    {request.employee && request.employee.profilePicture ? (
                      <img
                        src={request.employee.profilePicture}
                        alt={`${request.employee.firstName} ${request.employee.lastName}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-white">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    {request.employee ? request.employee.id : 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {request.employee
                      ? `${request.employee.firstName} ${request.employee.lastName}`
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-2">{request.type}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        request.status === 'approved'
                          ? 'bg-green-500'
                          : request.status === 'pending'
                            ? 'bg-yellow-500'
                            : request.status === 'rejected'
                              ? 'bg-red-500'
                              : 'bg-gray-400'
                      }`}
                    >
                      {request.status}
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
