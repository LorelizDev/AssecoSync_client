import { useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { registerEmployee } from '../services/adminServices';
import { useNavigate } from 'react-router-dom';
import { getEmployeeByIdFromExternalDb } from '../services/getEmployeeService';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Input from '../components/Input';


export const RegisterForm = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState({ day: '', month: '', year: '' });
  const [errors, setErrors] = useState({});
  const [isExternalLookup, setIsExternalLookup] = useState(false);

  const validateSection = () => {
    const newErrors = {};

    if (currentSection === 0) {
      if (!id) newErrors.id = 'El ID del empleado es obligatorio';
      
      // Si es una búsqueda externa, validar campos adicionales
      if (isExternalLookup) {
        if (!firstName) newErrors.firstName = 'El nombre es obligatorio';
        if (!lastName) newErrors.lastName = 'Los apellidos son obligatorios';
        if (!jobTitle) newErrors.jobTitle = 'Indicar el puesto de trabajo es obligatorio';
        if (!departmentId) newErrors.departmentId = 'Indicar el departamento es obligatorio';
        if (!weeklyHours) newErrors.weeklyHours = 'Indicar la jornada laboral es obligatorio';
      }
    }

    if (currentSection === 1) {
      if (!email) newErrors.email = 'El correo electrónico es obligatorio';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Debe ser un correo electrónico válido';
      }
    }

    if (currentSection === 2) {
      if (!date.day || !date.month || !date.year) {
        newErrors.dateJoined = 'La fecha de inicio es obligatoria';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextSection = () => {
    if (validateSection()) {
      // Si estamos en la primera sección y hay una búsqueda externa 
      // con datos incompletos, mostrar un error
      if (currentSection === 0 && isExternalLookup && 
          (!firstName || !lastName || !jobTitle || !departmentId)) {
        setErrors(prev => ({
          ...prev,
          id: 'No se encontraron todos los datos del empleado'
        }));
        return;
      }

      // Avanzar a la siguiente sección
      setCurrentSection(currentSection + 1);
      // Limpiar errores de la sección anterior
      setErrors({});
    }
  };

  const handlePreviousSection = () => {
    // Si es la primera sección, resetear el estado de búsqueda externa
    if (currentSection === 0) {
      setIsExternalLookup(false);
      // Opcional: limpiar datos si se retrocede desde la primera sección
      setFirstName('');
      setLastName('');
      setJobTitle('');
      setDepartmentId('');
      setWeeklyHours('');
      setEmail('');
    }

    // Retroceder a la sección anterior
    setCurrentSection(currentSection - 1);
    // Limpiar errores de la sección actual
    setErrors({});
  };

  const handleIdChange = async (event) => {
    const inputId = event.target.value;
    setId(inputId);

    // Solo realizar búsqueda si el ID no está vacío
    if (inputId.trim() !== '') {
      try {
        console.log('Consultando datos para el ID:', inputId);
        const employeeData = await getEmployeeByIdFromExternalDb(inputId);
        console.log(employeeData.data)
        if (employeeData) {
          console.log('Datos recibidos del servicio:', employeeData);
          // Rellenar campos con datos externos
          setFirstName(employeeData.firstName || '');
          setLastName(employeeData.lastName || '');
          setJobTitle(employeeData.jobTitle || '');
          setDepartmentId(employeeData.departmentId || '');
          setWeeklyHours(employeeData.weeklyHours || '');
          setEmail(employeeData.email || '');
          
          // Deshabilitar campos
          setIsExternalLookup(true);
        } else {
          // Restablecer búsqueda externa si no se encuentran datos
          setIsExternalLookup(false);
        }
      } catch (error) {
        console.error('Error al recuperar datos del empleado:', error);
        setErrors(prev => ({
          ...prev, 
          id: 'No se pudo recuperar la información del empleado'
        }));
      }
    } else {
      // Restablecer todos los campos si se borra el ID
      setFirstName('');
      setLastName('');
      setJobTitle('');
      setDepartmentId('');
      setWeeklyHours('');
      setEmail('');
      setIsExternalLookup(false);
    }
  };

  // Manejadores de cambio que respetan la búsqueda externa
  const handleFirstNameChange = (event) => {
    if (!isExternalLookup) {
      setFirstName(event.target.value);
    }
  };

  const handleLastNameChange = (event) => {
    if (!isExternalLookup) {
      setLastName(event.target.value);
    }
  };

  const handleJobTitleChange = (event) => {
    if (!isExternalLookup) {
      setJobTitle(event.target.value);
    }
  };

  const handleDepartmentIdChange = (event) => {
    if (!isExternalLookup) {
      setDepartmentId(event.target.value);
    }
  };

  const handleWeeklyHoursChange = (event) => {
    if (!isExternalLookup) {
      setWeeklyHours(event.target.value);
    }
  };

  const handleEmailChange = (event) => {
    if (!isExternalLookup) {
      setEmail(event.target.value);
    }
  };

  const handleDateChange = (e) => {
    const { id, value } = e.target;
    setDate((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const dateJoined = [date.year, date.month, date.day].join('-');

  const handleRegister = async () => {
    // Validación final de todos los campos
    if (validateSection()) {
      try {
        const registerData = { 
          firstName, 
          lastName, 
          id, 
          jobTitle, 
          departmentId, 
          weeklyHours, 
          email, 
          dateJoined 
        };
        
        const result = await registerEmployee(registerData);
        
        if (result.success) {
          navigate("/dashboard");
        } else {
          setErrors({ 
            loginError: result.message || 'Error al registrar el empleado' 
          });
        }
      } catch (error) {
        console.error('Error en el registro:', error);
        setErrors({ 
          loginError: 'No se pudo completar el registro. Inténtelo de nuevo.' 
        });
      }
    }
  };

  return (
    <div className="flex">
      <div className="relative w-20 bg-primarybg">
        <Sidebar />
      </div>
      <div className="bg-primarybg p-16 w-2/4">
        <h3 className="text-lg font-medium mb-6">Nuevo empleado</h3>
        <div className="space-y-4">
          <div
            className={`cursor-pointer ${currentSection === 0 ? ' text-primary' : 'hover:underline'}`}
            onClick={() => setCurrentSection(0)}
          >
            Datos generales
          </div>
          <div
            className={`cursor-pointer ${currentSection === 1 ? ' text-primary' : 'hover:underline'}`}
            onClick={() => setCurrentSection(1)}
          >
            Información de contacto
          </div>
          <div
            className={`cursor-pointer ${currentSection === 2 ? ' text-primary' : 'hover:underline'}`}
            onClick={() => setCurrentSection(2)}
          >
            Fecha de inicio
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-12 w-full">
        {currentSection === 0 && (
          <div>
            <h3 className="flex justify-center text-lg font-medium font-mainFont mb-4">
              Rellena los datos generales
            </h3>

            <div className="flex flex-col justify-center mb-2">
              <Input 
                name="id" 
                type="string" 
                value={id} 
                onChange={handleIdChange} 
                placeholder="ID del empleado" 
              />
              {errors.id && <p className="text-red-500">{errors.id}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input 
                name="firstName" 
                type="string" 
                value={firstName} 
                onChange={handleFirstNameChange} 
                placeholder="Nombre" 
                disabled={isExternalLookup}
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input 
                name="lastName" 
                type="string" 
                value={lastName} 
                onChange={handleLastNameChange} 
                placeholder="Apellidos" 
                disabled={isExternalLookup}
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input 
                name="jobTitle" 
                type="string" 
                value={jobTitle} 
                onChange={handleJobTitleChange} 
                placeholder="Puesto de trabajo" 
                disabled={isExternalLookup}
              />
              {errors.jobTitle && <p className="text-red-500">{errors.jobTitle}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input 
                name="departmentId" 
                type="string" 
                value={departmentId} 
                onChange={handleDepartmentIdChange} 
                placeholder="Departamento" 
                disabled={isExternalLookup}
              />
              {errors.departmentId && <p className="text-red-500">{errors.departmentId}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input 
                name="weeklyHours" 
                type="string" 
                value={weeklyHours} 
                onChange={handleWeeklyHoursChange} 
                placeholder="Jornada laboral" 
                disabled={isExternalLookup}
              />
              {errors.weeklyHours && <p className="text-red-500">{errors.weeklyHours}</p>}
            </div>
            <div className="flex">
              <Button 
                className="flex items-center justify-center" 
                onClick={handleNextSection}
              >
                <span className="mr-2">Siguiente</span>
                <MdArrowForward />
              </Button>
            </div>
          </div>
        )}
        {currentSection === 1 && (
          <div>
            <h3 className="flex justify-center text-lg font-medium font-mainFont mb-4">
              Añade los datos de contacto
            </h3>
            <div className="flex flex-col justify-center mb-2">
              <Input
                type="email"
                id="email"
                placeholder="Dirección de correo electrónico corporativo"
                value={email}
                onChange={handleEmailChange}
                disabled={isExternalLookup}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="flex flex-col">
              <Button 
                className="flex items-center justify-center mb-4" 
                onClick={handleNextSection}
              >
                <span className="mr-2">Siguiente</span>
                <MdArrowForward />
              </Button>
              <Button 
                className="flex items-center justify-center border border-primary bg-primarybg" 
                onClick={handlePreviousSection}
              >
                <MdArrowBack className="text-primary" />
                <span className="mr-2 text-primary">Anterior</span>
              </Button>
            </div>
          </div>
        )}
        {currentSection === 2 && (
          <div>
            <h3 className="flex justify-center text-lg font-medium font-mainFont mb-12">
              Selecciona fecha de inicio
            </h3>
            
            <div className="mb-8">
              <div className="flex space-x-4">
                {errors.date && <p className="text-red-500">{errors.date}</p>}
                <select
                  className="border rounded py-2 px-3 w-1/3"
                  id="day"
                  value={date.day}
                  onChange={handleDateChange}
                >
                  <option value="">Día</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>

                <select
                  className="border rounded py-2 px-3 w-1/3"
                  id="month"
                  value={date.month}
                  onChange={handleDateChange}
                >
                  <option value="">Mes</option>
                  {[
                    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
                  ].map((month, index) => (
                    <option key={index + 1} value={index + 1}>{month}</option>
                  ))}
                </select>

                <select
                  className="border rounded py-2 px-3 w-1/3"
                  id="year"
                  value={date.year}
                  onChange={handleDateChange}
                >
                    <option value="">Año</option>
                    {Array.from({ length: 10 }, (_, i) => 2023 + i).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

            <div className="flex justify-between">
              <Button className="flex items-center justify-center border border-primary bg-primarybg mr-8" onClick={handlePreviousSection}>
                <MdArrowBack className="text-primary" />
                <span className="mr-2 text-primary">Anterior</span>
              </Button>
              <Button className="px-3 py-1 flex items-center justify-center" onClick={handleRegister}>
                <span className="mr-2">Enviar</span>
                <MdArrowForward />
              </Button>
            </div>
          </div>
)}
</div>
  <div className="w-2/4 bg-secondarybg"></div>
</div>
    )};