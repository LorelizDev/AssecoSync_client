import React, { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Sidebar from '../components/Sidebar';
import Input from '../components/Input';
import Button from '../components/Button';
import { calendarServices } from '../services/calendarServices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from '../context/authStore'; // Asegurar importación correcta

// Mapeo de colores para los diferentes tipos de ausencia
const LEAVE_TYPE_COLORS = {
  'Cita médica': '#17a2b8', // Cian
  Mudanza: '#ffc107', // Amarillo
  Otro: '#6f42c1', // Púrpura
  Vacaciones: '#28a745', // Verde (para vacaciones)
};

const CalendarPage = () => {
  // Obtener el token del store de autenticación
  const token = useAuthStore((state) => state.token);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVacationModalOpen, setIsVacationModalOpen] = useState(false);
  const [leaveRequestTypes, setLeaveRequestTypes] = useState([]);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    start_date: '',
    end_date: '',
    type_id: '',
    details: '',
  });
  const [vacationData, setVacationData] = useState({
    employee_id: '',
    start_date: '',
    end_date: '',
    details: '',
  });

  // Función para obtener datos iniciales con useCallback para optimizar rendimiento
  const fetchInitialData = useCallback(async () => {
    // Verificar que el token exista antes de hacer la solicitud
    if (!token) {
      toast.error('No se encontró token de autenticación');
      return;
    }

    try {
      const types = await calendarServices.getLeaveRequestTypes(token);

      const requests = await calendarServices.getAllLeaveRequests(token);

      const calendarEvents = requests
        .map((request) => {
          const startDate = new Date(request.startDate);
          const endDate = new Date(request.endDate);

          if (isNaN(startDate) || isNaN(endDate)) {
            console.error('Fecha inválida:', request);
            return null;
          }

          const leaveType = types.find((type) => type.id === request.typeId);

          console.log('Tipo de solicitud encontrado:', leaveType);

          const adjustedEndDate = new Date(endDate);
          adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

          return {
            title: leaveType ? leaveType.type : 'Ausencia',
            start: startDate.toISOString().split('T')[0],
            end: adjustedEndDate.toISOString().split('T')[0],
            color: LEAVE_TYPE_COLORS[leaveType?.type] || '#6c757d',
          };
        })
        .filter((event) => event !== null);

      console.log('Eventos del calendario:', calendarEvents);
      setEvents(calendarEvents);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      toast.error(
        'No se pudieron cargar los datos. Por favor, inicie sesión nuevamente.'
      );
    }
  }, [token]);

  useEffect(() => {
    // Solo intentar cargar datos si hay un token
    if (token) {
      fetchInitialData();
    }
  }, [fetchInitialData, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVacationChange = (e) => {
    const { name, value } = e.target;
    setVacationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitLeaveRequest = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.employee_id ||
        !formData.start_date ||
        !formData.end_date ||
        !formData.type_id
      ) {
        toast.error('Por favor complete todos los campos requeridos');
        return;
      }

      // Crear la solicitud de ausencia en el backend pasando el token
      const newRequest = await calendarServices.createLeaveRequest(
        formData,
        token
      );

      // Obtener el tipo de ausencia
      const leaveType = leaveRequestTypes.find(
        (type) => type.id === parseInt(formData.type_id)
      );

      const eventColor = leaveType
        ? LEAVE_TYPE_COLORS[leaveType.type] || '#6c757d'
        : '#6c757d';

      const adjustedEndDate = new Date(formData.end_date);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

      const newEvent = {
        title: leaveType ? leaveType.type : 'Ausencia',
        start: formData.start_date,
        end: adjustedEndDate.toISOString().split('T')[0],
        color: eventColor,
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);

      setFormData({
        employee_id: '',
        start_date: '',
        end_date: '',
        type_id: '',
        details: '',
      });
      setIsModalOpen(false);

      toast.success('Solicitud de ausencia creada exitosamente');
    } catch (error) {
      console.error('Error al crear solicitud:', error);
      toast.error('Error al crear la solicitud de ausencia');
    }
  };

  const handleSubmitVacationRequest = async (e) => {
    e.preventDefault();
    try {
      if (
        !vacationData.employee_id ||
        !vacationData.start_date ||
        !vacationData.end_date
      ) {
        toast.error('Por favor complete todos los campos requeridos');
        return;
      }

      // Enviar solicitud de vacaciones pasando el token
      const newVacation = await calendarServices.createLeaveRequest(
        {
          employee_id: vacationData.employee_id,
          start_date: vacationData.start_date,
          end_date: vacationData.end_date,
          details: vacationData.details,
        },
        token
      );

      const adjustedEndDate = new Date(vacationData.end_date);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

      const newEvent = {
        title: 'Vacaciones',
        start: vacationData.start_date,
        end: adjustedEndDate.toISOString().split('T')[0],
        color: LEAVE_TYPE_COLORS['Vacaciones'],
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);

      setVacationData({
        employee_id: '',
        start_date: '',
        end_date: '',
        details: '',
      });
      setIsVacationModalOpen(false);

      toast.success('Solicitud de vacaciones creada exitosamente');
    } catch (error) {
      console.error('Error al crear solicitud de vacaciones:', error);
      toast.error('Error al crear la solicitud de vacaciones');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="z-10 hidden md:block md:w-20 bg-primarybg">
        <Sidebar />
      </div>

      <div className="w-full md:w-4/5 bg-primarybg relative">
        <div className="container mx-auto py-6">
          <h1 className="text-2xl text-primary font-bold mb-4 pl-[1.2rem]">
            Calendario de Ausencias
          </h1>
        </div>

        <div className="relative px-4 md:pl-[1.2rem] pb-4">
          <Button onClick={() => setIsModalOpen(true)} className="mb-4">
            Solicitar ausencias
          </Button>
          <Button onClick={() => setIsVacationModalOpen(true)} className="mb-4">
            Solicitar vacaciones
          </Button>
        </div>

        <div className="w-full md:absolute md:-right-[22%] md:w-[120%]">
          <div className="w-full overflow-x-auto bg-white rounded-[14px] border border-[#b8b8b8]">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={false}
              events={events}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek',
              }}
              contentHeight="auto"
              className="w-full text-xs"
              buttonText={{
                today: 'Hoy',
                month: 'Mes',
                week: 'Semana',
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-1/5 bg-secondarybg"></div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Solicitar ausencia</h2>
            <form onSubmit={handleSubmitLeaveRequest}>
              <Input
                label="ID de empleado"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleInputChange}
                placeholder="Ingrese el ID del empleado"
                required
              />
              <Input
                label="Fecha de inicio"
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Fecha de fin"
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                required
              />
              {/* Selector de tipo de ausencia */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de ausencia
                </label>
                <select
                  name="type_id"
                  value={formData.type_id}
                  onChange={handleInputChange}
                  className="mt-1 block w-full h-[45px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-400 focus:border-blue-400 transition"
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  {leaveRequestTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Detalles de la ausencia"
                className="mt-2 w-full px-3 py-2 border rounded-md"
              />
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isVacationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Solicitar vacaciones</h2>
            <form onSubmit={handleSubmitVacationRequest}>
              <Input
                label="ID de empleado"
                name="employee_id"
                value={vacationData.employee_id}
                onChange={handleVacationChange}
                placeholder="Ingrese el ID del empleado"
                required
              />
              <Input
                label="Fecha de inicio"
                type="date"
                name="start_date"
                value={vacationData.start_date}
                onChange={handleVacationChange}
                required
              />
              <Input
                label="Fecha de fin"
                type="date"
                name="end_date"
                value={vacationData.end_date}
                onChange={handleVacationChange}
                required
              />
              <textarea
                name="details"
                value={vacationData.details}
                onChange={handleVacationChange}
                placeholder="Detalles de las vacaciones"
                className="mt-2 w-full px-3 py-2 border rounded-md"
              />
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setIsVacationModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CalendarPage;
