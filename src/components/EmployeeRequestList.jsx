import React, { useState, useEffect } from 'react';
import { calendarServices } from '../services/calendarServices';
import EmployeeFilter from './EmployeeFilter';
import { RxAvatar } from 'react-icons/rx';

const EmployeeRequestList = () => {
  const [employeeRequests, setEmployeeRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [typeRequests, setTypeRequests] = useState({});

  useEffect(() => {
    const fetchEmployeeRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const requests =
          await calendarServices.getAllLeaveRequestsWithEmployees(token);
        setEmployeeRequests(requests);
        setFilteredRequests(requests);

        const typeRequestsData = {};
        for (const request of requests) {
          if (!typeRequestsData[request.typeId]) {
            typeRequestsData[request.typeId] = await fetchTypeRequestById(
              request.typeId
            );
          }
        }
        setTypeRequests(typeRequestsData);
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
      }
    };

    const fetchTypeRequestById = async (typeId) => {
      try {
        const token = localStorage.getItem('token');
        const typeRequest = await calendarServices.getLeaveRequestTypeById(
          typeId,
          token
        );
        return typeRequest.type;
      } catch (error) {
        console.error('Error al obtener el tipo de solicitud:', error);
        return 'Desconocido';
      }
    };

    fetchEmployeeRequests();
  }, []);

  const getStatusText = (statusId) => {
    switch (statusId) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'Aprobado';
      case 3:
        return 'Denegado';
      default:
        return 'Desconocido';
    }
  };

  const handleSearch = (filter) => {
    const key = Object.keys(filter)[0];
    const value = filter[key].toLowerCase();

    const filtered = employeeRequests.filter((request) => {
      const employee = request.employee;
      if (employee) {
        if (key === 'name') {
          return (
            employee.firstName.toLowerCase().includes(value) ||
            employee.lastName.toLowerCase().includes(value)
          );
        }
        return employee[key]?.toLowerCase().includes(value);
      }
      return false;
    });

    setFilteredRequests(filtered);
  };

  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await calendarServices.updateLeaveRequestStatus(requestId, 2, token);

      setFilteredRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId
            ? { ...request, statusId: 2, status: 'Aprobado' }
            : request
        )
      );
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await calendarServices.updateLeaveRequestStatus(requestId, 3, token);

      setFilteredRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId
            ? { ...request, statusId: 3, status: 'Denegado' }
            : request
        )
      );
    } catch (error) {
      console.error('Error al rechazar la solicitud:', error);
    }
  };

  const handleReset = () => {
    setFilteredRequests(employeeRequests);
    setFilterValue('');
  };

  return (
    <div className="container p-1">
      <EmployeeFilter
        onSearch={handleSearch}
        onReset={handleReset}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      <div className="rounded-[14px] overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-[#fcfcfc]">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Perfil
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
                Motivo
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Estatus
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((employeeRequest) => (
                <tr key={employeeRequest.id} className="border-b">
                  <td className="px-4 py-2">
                    {!employeeRequest.avatar ? (
                      <RxAvatar className="w-12 h-12 text-grayicon" />
                    ) : (
                      <img
                        src={employeeRequest.avatar}
                        alt={`${employeeRequest.firstName} ${employeeRequest.lastName}`}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                  </td>
                  <td className="p-3">{employeeRequest.employee?.id}</td>
                  <td className="px-4 py-2">
                    {employeeRequest.employee?.firstName || 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {employeeRequest.employee?.lastName || 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {typeRequests[employeeRequest.typeId] || 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        employeeRequest.statusId === 1
                          ? 'bg-yellow-500'
                          : employeeRequest.statusId === 2
                            ? 'bg-green-500'
                            : employeeRequest.statusId === 3
                              ? 'bg-red-500'
                              : 'bg-gray-400'
                      }`}
                    >
                      {getStatusText(employeeRequest.statusId)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAccept(employeeRequest.id)}
                        className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
                      >
                        <span className="text-xl">✔</span>
                      </button>
                      <button
                        onClick={() => handleReject(employeeRequest.id)}
                        className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                      >
                        <span className="text-xl">✖</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center px-4 py-4">
                  No se encontraron solicitudes de permiso.
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
