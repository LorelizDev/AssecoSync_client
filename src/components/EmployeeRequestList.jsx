import React, { useState, useEffect } from 'react';
import { calendarServices } from '../services/calendarServices';
// Asegúrate de tener el servicio de actualización
import defaultAvatar from '../assets/images/profile-pictures/alan.jpg'; // Imagen por defecto

const EmployeeRequestList = ({ employees }) => {
  const [employeeRequests, setEmployeeRequests] = useState([]);

  // Cargar solicitudes de ausencia con los empleados asociados
  useEffect(() => {
    const fetchEmployeeRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const requests =
          await calendarServices.getAllLeaveRequestsWithEmployees(token);
        setEmployeeRequests(requests);
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
      }
    };
    fetchEmployeeRequests();
  }, []); // Dependencia vacía, solo se ejecuta una vez al cargar el componente

  // Función para mapear el statusId a un texto legible
  const getStatusText = (statusId) => {
    switch (statusId) {
      case 1:
        return 'Pendiente'; // Status "Pending"
      case 2:
        return 'Aprobado'; // Status "Approved"
      case 3:
        return 'Denegado'; // Status "Rejected"
      default:
        return 'Desconocido'; // Si no hay un status correspondiente, devolvemos "Desconocido"
    }
  };

  // Función para manejar el cambio de status a Aprobado
  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      const updatedRequest = await calendarServices.updateLeaveRequestStatus(
        requestId,
        2, // Estado "Aprobado"
        token
      );

      // Actualizamos el estado local con la nueva solicitud actualizada
      setEmployeeRequests((prevRequests) =>
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

  // Función para manejar el cambio de status a Rechazado
  const handleReject = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      const updatedRequest = await calendarServices.updateLeaveRequestStatus(
        requestId,
        3, // Estado "Rechazado"
        token
      );

      // Actualizamos el estado local con la nueva solicitud actualizada
      setEmployeeRequests((prevRequests) =>
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

  return (
    <div className="container p-1">
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
                Estatus
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {employeeRequests.length > 0 ? (
              employeeRequests.map((employeeRequest) => (
                <tr key={employeeRequest.id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={
                        employeeRequest.employee?.avatar
                          ? employeeRequest.employee.avatar
                          : defaultAvatar // Imagen por defecto si no tiene avatar
                      }
                      alt={`${employeeRequest.employee?.firstName} ${employeeRequest.employee?.lastName}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3">{employeeRequest.employee?.id}</td>
                  <td className="px-4 py-2">
                    {employeeRequest.employee?.firstName || 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {employeeRequest.employee?.lastName || 'N/A'}
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
                      {getStatusText(employeeRequest.statusId)}{' '}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {/* Botones de Aceptar y Denegar */}
                    <button
                      onClick={() => handleAccept(employeeRequest.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-full"
                    >
                      <span className="text-lg">✔</span> {/* Aceptar */}
                    </button>
                    <button
                      onClick={() => handleReject(employeeRequest.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-full ml-2"
                    >
                      <span className="text-lg">✖</span> {/* Rechazar */}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-4 py-4">
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
