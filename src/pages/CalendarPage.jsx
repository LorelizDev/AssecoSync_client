import React, { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Sidebar from '../components/Sidebar';
import Input from '../components/Input';
import Button from '../components/Button';
import { calendarServices } from '../services/calendarServices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from '../context/authStore';

const LEAVE_TYPE_COLORS = {
  'Cita médica': '#17a2b8',
  Mudanza: '#ffc107',
  Otro: '#6f42c1',
  Vacaciones: '#28a745',
};

const CalendarPage = () => {
  const token = useAuthStore((state) => state.token);

  // Estados del componente
  const [isVacationModalOpen, setIsVacationModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [vacationData, setVacationData] = useState({
    start_date: '',
    end_date: '',
    details: '',
  });

  // Obtener las solicitudes de ausencia y renderizarlas en el calendario
  const fetchInitialData = useCallback(async () => {
    if (!token) {
      toast.error('No se encontró token de autenticación');
      return;
    }

    try {
      const requests = await calendarServices.getAllLeaveRequests(token);

      const calendarEvents = requests
        .map((request) => {
          const startDate = new Date(request.startDate);
          const endDate = new Date(request.endDate);

          if (isNaN(startDate) || isNaN(endDate)) {
            console.error('Fecha inválida:', request);
            return null;
          }

          const adjustedEndDate = new Date(endDate);
          adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

          return {
            title: request.type === 'Vacaciones' ? 'Vacaciones' : 'Ausencia',
            start: startDate.toISOString().split('T')[0],
            end: adjustedEndDate.toISOString().split('T')[0],
            color: LEAVE_TYPE_COLORS['Vacaciones'],
          };
        })
        .filter((event) => event !== null);

      setEvents(calendarEvents);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      toast.error(
        'No se pudieron cargar los datos. Por favor, inicie sesión nuevamente.'
      );
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchInitialData();
    }
  }, [fetchInitialData, token]);

  // Manejo del formulario de vacaciones
  const handleVacationChange = (e) => {
    const { name, value } = e.target;
    setVacationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitVacationRequest = async (e) => {
    e.preventDefault();

    try {
      if (!vacationData.start_date || !vacationData.end_date) {
        toast.error('Por favor complete las fechas de inicio y fin');
        return;
      }

      // Log para verificar los datos enviados
      console.log('Datos enviados al backend:', {
        startDate: vacationData.start_date, // Cambio a `startDate`
        endDate: vacationData.end_date, // Cambio a `endDate`
        details: vacationData.details, // Opcional, pero importante para el log
        typeId: 1, // Fijo para vacaciones
        statusId: 1, // Estado inicial pendiente
      });

      // Enviar solicitud de vacaciones
      const newVacation = await calendarServices.createLeaveRequest(
        {
          startDate: vacationData.start_date,
          endDate: vacationData.end_date,
          details: vacationData.details, // Incluye "details" si es necesario
          typeId: 1, // Vacaciones
          statusId: 1, // Pendiente
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

      // Resetear el formulario
      setVacationData({
        start_date: '',
        end_date: '',
        details: '',
      });
      setIsVacationModalOpen(false);

      toast.success('Solicitud de vacaciones creada exitosamente');
    } catch (error) {
      console.error('Error al crear solicitud de vacaciones:', error);

      if (error.response) {
        console.error('Respuesta del backend:', error.response.data);
      }

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

      {isVacationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Solicitar vacaciones</h2>
            <form onSubmit={handleSubmitVacationRequest}>
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
