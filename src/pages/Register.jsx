import { useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { useAuthStore } from '../context/authStore';
import { registerEmployee } from '../services/adminServices';
import { useNavigate } from 'react-router-dom';
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
  const [dateJoined, setDateJoined] = useState({ day: '', month: '', year: '' });
  const [errors, setErrors] = useState({});

  const validateSection = () => {
    const newErrors = {};

    if (currentSection === 0) {
      const firstName = document.querySelector('input[name="firstName"]').value.trim();
      const lastName = document.querySelector('input[name="lastName"]').value.trim();
      const id = document.querySelector('input[name="id"]').value.trim();
      const jobTitle = document.querySelector('input[name="jobTitle"]').value.trim();
      const departmentId = document.querySelector('input[name="departmentId"]').value.trim();
      const weeklyHours = document.querySelector('input[name="weeklyHours"]').value.trim();

      if (!firstName) newErrors.firstName = 'El nombre es obligatorio';
      if (!lastName) newErrors.lastName = 'Los apellidos son obligatorios';
      if (!id) newErrors.id = 'El ID del empleado es obligatorio';
      if (!jobTitle) newErrors.jobTitle = 'Indicar el puesto de trabajo es obligatorio';
      if (!departmentId) newErrors.departmentId = 'Indicar el departamento es obligatorio';
      if (!weeklyHours) newErrors.weeklyHours = 'Indicar la jornada laboral es obligatorio';
    }

    if (currentSection === 1) {
      if (!email) newErrors.email = 'El correo electrónico es obligatorio';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Debe ser un correo electrónico válido';
    }

    if (currentSection === 2) {
      if (!dateJoined.day || !dateJoined.month || !dateJoined.year) {
        newErrors.dateJoined = 'La fecha de inicio es obligatoria';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextSection = () => {
    if (validateSection()) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePreviousSection = () => {
    setCurrentSection(currentSection - 1);
  };
  
  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  const handleDepartmentIdChange = (event) => {
    setDepartmentId(event.target.value);
  };

  const handleWeeklyHoursChange = (event) => {
    setWeeklyHours(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDateJoinedChange = (event) => {
    setDateJoined(event.target.value);
  };

  const handleRegister = async () => {
    const registerData = { firstName, lastName, id, jobTitle, departmentId, weeklyHours, email, dateJoined };
    console.log(registerData)
        
        // const result = await registerEmployee(registerData);
      
  
        // if (result.success) {
        //   navigate("/dashboard");
        // } else {
        //   setErrors({ loginError: result.message });
        // }
     
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
            <h3 className="flex justify-center text-lg font-medium font-mainFont mb-4">Rellena los datos generales</h3>

            <div className="flex flex-col justify-center mb-2">
            
            <div className="flex flex-col justify-center mb-2">
              <Input name="id" type="string" value= {id} onChange={handleIdChange} placeholder="ID del empleado" />
                {errors.id && <p className="text-red-500">{errors.id}</p>}
            </div>
              <Input name="firstName" type="string" value={firstName} onChange={handleFirstNameChange} placeholder="Nombre" />
              {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="lastName" type="string" value={lastName} onChange={handleLastNameChange} placeholder="Apellidos" />
              {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="jobTitle" type="string" value={jobTitle} onChange={handleJobTitleChange} placeholder="Puesto de trabajo" />
              {errors.jobTitle && <p className="text-red-500">{errors.jobTitle}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="departmentId" type="string" value={departmentId} onChange={handleDepartmentIdChange} placeholder="Departamento" />
              {errors.departmentId && <p className="text-red-500">{errors.departmentId}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="weeklyHours" type="string" value={weeklyHours} onChange={handleWeeklyHoursChange} placeholder="Jornada laboral" />
              {errors.weeklyHours && <p className="text-red-500">{errors.weeklyHours}</p>}
            </div>
            <div className="flex">
              <Button className="flex items-center justify-center" onClick={handleNextSection}>
                <span className="mr-2">Siguiente</span>
                <MdArrowForward />
              </Button>
            </div>
          </div>
        )}
        {currentSection === 1 && (
          <div>
            <h3 className="flex justify-center text-lg font-medium font-mainFont mb-4">Añade los datos de contacto</h3>
            <div className="flex flex-col justify-center mb-2">
              <Input
                type="email"
                id="email"
                placeholder="Dirección de correo electrónico corporativo"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
              <div className="flex flex-col">
              <Button className="flex items-center justify-center mb-4" onClick={handleNextSection}>
                <span className="mr-2">Siguiente</span>
                <MdArrowForward />
              </Button>
              <Button className="flex items-center justify-center border border-primary bg-primarybg" onClick={handlePreviousSection}>
                <MdArrowBack className="text-primary" />
                <span className="mr-2 text-primary">Anterior</span>
              </Button>
            </div>
          </div>
        )}
        {currentSection === 2 && (
          <div>
            <h3 className="flex justify-center text-lg font-medium font-mainFont mb-12">Selecciona fecha de inicio</h3>
            
            <div className="mb-8">
                <div className="flex space-x-4">
                {errors.dateJoined && <p className="text-red-500">{errors.startDate}</p>}
                  <select
                    className="border rounded py-2 px-3 w-1/3"
                    id="day"
                    value={dateJoined.day}
                    onChange= {handleDateJoinedChange}
                  >
                    <option value="">Día</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>

                  <select
                    className="border rounded py-2 px-3 w-1/3"
                    id="month"
                    value={dateJoined.month}
                    onChange= {handleDateJoinedChange}
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
                    value={dateJoined.year}
                    onChange= {handleDateJoinedChange}
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