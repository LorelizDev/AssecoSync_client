import React, { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import { calendarServices } from '../services/calendarServices';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from '../context/authStore';
import ModalForm from '../components/ModalForm';

const LEAVE_TYPE_COLORS = {
  'Cita médica': '#17a2b8',
  Mudanza: '#ffc107',
  Otro: '#6f42c1',
  Vacaciones: '#28a745',
};

const CalendarPage = () => {
  const { token, role } = useAuthStore();
  const [isVacationModalOpen, setIsVacationModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
    typeId: '',
    details: '',
  });
  const [vacationData, setVacationData] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
    details: '',
  });
  const [leaveRequestTypes, setLeaveRequestTypes] = useState([]);

  // Validación de fechas
  const validateDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return !isNaN(start) && !isNaN(end) && start <= end;
  };

  // Fetch inicial de datos
  const fetchInitialData = useCallback(async () => {
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

          // Validación de fechas inválidas
          if (!validateDates(startDate, endDate)) {
            console.error('Fecha inválida:', request);
            return null;
          }

          const leaveType = types.find((type) => type.id === request.typeId);

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

      setEvents(calendarEvents);
      setLeaveRequestTypes(types);
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

  // Manejo de cambios en los inputs
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

  // Enviar solicitud de ausencia
  const handleSubmitLeaveRequest = async (e) => {
    e.preventDefault();

    try {
      if (!formData.startDate || !formData.endDate || !formData.typeId) {
        toast.error('Por favor complete todos los campos requeridos');
        return;
      }

      // Validación de fechas
      if (!validateDates(formData.startDate, formData.endDate)) {
        toast.error('Las fechas son inválidas o inconsistentes');
        return;
      }

      const newRequest = await calendarServices.createLeaveRequest(
        {
          employeeId: formData.employeeId,
          startDate: formData.startDate,
          endDate: formData.endDate,
          details: formData.details,
          typeId: formData.typeId,
          statusId: 1, // Estado pendiente
        },
        token
      );

      const adjustedEndDate = new Date(formData.endDate);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

      const leaveType = leaveRequestTypes.find(
        (type) => type.id === parseInt(formData.typeId)
      );

      const newEvent = {
        title: leaveType ? leaveType.type : 'Ausencia',
        start: formData.startDate,
        end: adjustedEndDate.toISOString().split('T')[0],
        color: LEAVE_TYPE_COLORS[leaveType?.type] || '#6c757d',
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);

      setFormData({
        employeeId: '',
        startDate: '',
        endDate: '',
        typeId: '',
        details: '',
      });
      setIsModalOpen(false);

      toast.success('Solicitud de ausencia creada exitosamente');
    } catch (error) {
      console.error('Error al crear solicitud de ausencia:', error);
      toast.error('Error al crear la solicitud de ausencia');
    }
  };

  // Enviar solicitud de vacaciones
  const handleSubmitVacationRequest = async (e) => {
    e.preventDefault();

    try {
      if (!vacationData.startDate || !vacationData.endDate) {
        toast.error('Por favor complete las fechas de inicio y fin');
        return;
      }

      // Validación de fechas
      if (!validateDates(vacationData.startDate, vacationData.endDate)) {
        toast.error('Las fechas son inválidas o inconsistentes');
        return;
      }

      const newVacation = await calendarServices.createLeaveRequest(
        {
          employeeId: vacationData.employeeId,
          startDate: vacationData.startDate,
          endDate: vacationData.endDate,
          details: vacationData.details,
          typeId: 1, // Fijo para vacaciones
          statusId: 1, // Pendiente
        },
        token
      );

      const adjustedEndDate = new Date(vacationData.endDate);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

      const newEvent = {
        title: 'Vacaciones',
        start: vacationData.startDate,
        end: adjustedEndDate.toISOString().split('T')[0],
        color: LEAVE_TYPE_COLORS['Vacaciones'],
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);

      setVacationData({
        employeeId: '',
        startDate: '',
        endDate: '',
        details: '',
      });
      setIsVacationModalOpen(false);

      toast.success('Solicitud de vacaciones creada exitosamente');
    } catch (error) {
      console.error('Error al crear solicitud de vacaciones:', error);
      toast.error('Error al crear la solicitud de vacaciones');
    }
  };

  const abscenseText =
    role === 'admin' ? 'Crear registro de ausencia' : 'Solicitar ausencia';

  const vacationText =
    role == 'admin' ? 'Crear registro de vacaciones' : 'Solicitar vacaciones';

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="z-10 hidden md:block md:w-20 bg-primarybg">
        <Sidebar />
      </div>

      <div className="relative flex-grow md:w-4/5 bg-primarybg">
        <div className="container px-6 py-6">
          <h1 className="text-2xl text-primary font-bold  mb-1">
            Calendario de Ausencias
          </h1>
        </div>

        <div className="relative px-4 md:pl-[1.2rem] pb-4 max-w-fit">
          <Button onClick={() => setIsModalOpen(true)} className="mb-4 mr-4">
            {abscenseText}
          </Button>
          <Button onClick={() => setIsVacationModalOpen(true)} className="mb-4">
            {vacationText}
          </Button>
        </div>

        {/* Contenedor del calendario */}
        <div className="px-4 overflow-x-auto md:-right-[22%] md:w-[120%]">
          <div
            className="bg-white rounded-[14px] border border-[#b8b8b8] shadow-lg 
                    w-full max-w-none md:h-[600px] h-[600px] overflow-hidden"
          >
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

      {/* Modals y Toast */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitLeaveRequest}
        title={abscenseText}
        formData={formData}
        handleInputChange={handleInputChange}
        leaveRequestTypes={leaveRequestTypes}
      />
      <ModalForm
        isOpen={isVacationModalOpen}
        onClose={() => setIsVacationModalOpen(false)}
        onSubmit={handleSubmitVacationRequest}
        title={vacationText}
        formData={vacationData}
        handleInputChange={handleVacationChange}
        leaveRequestTypes={leaveRequestTypes}
        excludeVacation={true}
      />
      <ToastContainer />

      {/* Right Side */}
      <div className="w-1/5 bg-secondarybg"></div>
    </div>
  );
};

export default CalendarPage;
