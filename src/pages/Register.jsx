import { useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Input from '../components/Input';

export const RegisterForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState({ day: '', month: '', year: '' });
  const [errors, setErrors] = useState({});

  const validateSection = () => {
    const newErrors = {};

    if (currentSection === 0) {
      const first_name = document.querySelector('input[name="first_name"]').value.trim();
      const last_name = document.querySelector('input[name="last_name"]').value.trim();
      const id = document.querySelector('input[name="id"]').value.trim();
      const job_title = document.querySelector('input[name="job_title"]').value.trim();
      const department_id = document.querySelector('input[name="department_id"]').value.trim();
      const weekly_hours = document.querySelector('input[name="weekly_hours"]').value.trim();

      if (!first_name) newErrors.first_name = 'El nombre es obligatorio';
      if (!last_name) newErrors.last_name = 'Los apellidos son obligatorios';
      if (!id) newErrors.id = 'El ID del empleado es obligatorio';
      if (!job_title) newErrors.job_title = 'Indicar el puesto de trabajo es obligatorio';
      if (!department_id) newErrors.department_id = 'Indicar el departamento es obligatorio';
      if (!weekly_hours) newErrors.weekly_hours = 'Indicar la jornada laboral es obligatorio';
    }

    if (currentSection === 1) {
      if (!email) newErrors.email = 'El correo electrónico es obligatorio';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Debe ser un correo electrónico válido';
    }

    if (currentSection === 2) {
      if (!date_joined.day || !date_joined.month || !date_joined.year) {
        newErrors.date_joined = 'La fecha de inicio es obligatoria';
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
            
              <Input name="first_name" type="string" placeholder="Nombre" />
              {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="last_name" type="string" placeholder="Apellidos" />
              {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="id" type="string" placeholder="ID del empleado" />
              {errors.id && <p className="text-red-500">{errors.id}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="job_title" type="string" placeholder="Puesto de trabajo" />
              {errors.job_title && <p className="text-red-500">{errors.job_title}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="department_id" type="string" placeholder="Departamento" />
              {errors.department_id && <p className="text-red-500">{errors.department_id}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="weekly_hours" type="string" placeholder="Jornada laboral" />
              {errors.weekly_hours && <p className="text-red-500">{errors.weekly_hours}</p>}
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
                onChange={(e) => setEmail(e.target.value)}
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
                {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
                  <select
                    className="border rounded py-2 px-3 w-1/3"
                    id="day"
                    value={startDate.day}
                    onChange={(e) => setStartDate({ ...startDate, day: e.target.value })}
                  >
                    <option value="">Día</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>

                  <select
                    className="border rounded py-2 px-3 w-1/3"
                    id="month"
                    value={startDate.month}
                    onChange={(e) => setStartDate({ ...startDate, month: e.target.value })}
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
                    value={startDate.year}
                    onChange={(e) => setStartDate({ ...startDate, year: e.target.value })}
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
              <Button className="px-3 py-1 flex items-center justify-center" type="submit">
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