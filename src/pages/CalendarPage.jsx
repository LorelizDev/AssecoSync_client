import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Sidebar from '../components/Sidebar'; // Importación sin llaves
import Input from '../components/Input';
import Button from '../components/Button'; // Asegúrate de importar tu componente Button

const CalendarPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
    absenceType: '',
    details: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    setIsModalOpen(true); // Este es el comportamiento que deseas cuando se hace clic en el botón
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="z-10 hidden md:block md:w-20 bg-primarybg">
        <Sidebar />
      </div>

      {/* Área principal */}
      <div className="w-full md:w-4/5 flex flex-col bg-primarybg relative">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-1xl text-primary font-bold mb-4">
            Calendario de Ausencias
          </h1>

          {/* Usando el componente Button */}
          <Button onClick={handleButtonClick}>Solicitar ausencias</Button>
        </div>

        {/* Fondo dividido 80% primarybg y 20% secondarybg */}
        <div className="relative flex w-full h-full p-4">
          {/* Calendario en el fondo primarybg, ocupando todo el espacio pero con márgenes */}
          <div className="flex-1 bg-primarybg p-4 rounded-lg shadow-md">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={false}
              events={[
                { title: 'Vacaciones', date: '2024-12-05' },
                { title: 'Cita médica', date: '2024-12-10' },
              ]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek',
              }}
              eventsColor="#378006"
              contentHeight="auto" // Esto asegura que el calendario ocupe toda la altura disponible
            />
          </div>

          {/* Lado derecho con color secondarybg */}
          <div className="w-1/5 bg-secondarybg"></div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Solicitar ausencia</h2>
            <form onSubmit={handleFormSubmit}>
              <Input
                label="ID de empleado"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                placeholder="Ingrese el ID del empleado"
              />
              <Input
                label="Fecha de inicio"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
              <Input
                label="Fecha final"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de ausencia
                </label>
                <select
                  name="absenceType"
                  value={formData.absenceType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full h-[45px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-400 focus:border-blue-400 transition"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="Vacaciones">Vacaciones</option>
                  <option value="Cita médica">Cita médica</option>
                  <option value="Mudanza">Mudanza</option>
                  <option value="Otra">Otra</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Detalles de la ausencia
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Ingrese detalles adicionales"
                  className="mt-1 block w-full h-[100px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-400 focus:border-blue-400 transition"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
