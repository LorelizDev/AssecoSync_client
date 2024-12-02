import { useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Input from '../components/Input';

export const RegisterForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState({ day: '', month: '', year: '' });
  const [errors, setErrors] = useState({});

  const validateSection = () => {
    const newErrors = {};

    if (currentSection === 0) {
      const name = document.querySelector('input[name="name"]').value.trim();
      const surname = document.querySelector('input[name="surname"]').value.trim();
      const id = document.querySelector('input[name="id"]').value.trim();
      const position = document.querySelector('input[name="position"]').value.trim();
      const contract = document.querySelector('input[name="contract"]').value.trim();
      const jornada = document.querySelector('input[name="jornada"]').value.trim();

      if (!name) newErrors.name = 'El nombre es obligatorio';
      if (!surname) newErrors.surname = 'Los apellidos son obligatorios';
      if (!id) newErrors.id = 'El ID del empleado es obligatorio';
      if (!position) newErrors.position = 'El puesto de trabajo es obligatorio';
      if (!contract) newErrors.contract = 'El tipo de contrato es obligatorio';
      if (!jornada) newErrors.jornada = 'La jornada laboral es obligatoria';
    }

    if (currentSection === 1) {
      if (!phoneNumber) newErrors.phoneNumber = 'El número de teléfono es obligatorio';
      else if (!/^\d{9}$/.test(phoneNumber)) newErrors.phoneNumber = 'El número de teléfono debe tener 9 dígitos';

      if (!email) newErrors.email = 'El correo electrónico es obligatorio';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Debe ser un correo electrónico válido';
    }

    if (currentSection === 2) {
      if (!startDate.day || !startDate.month || !startDate.year) {
        newErrors.startDate = 'La fecha de inicio es obligatoria';
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
            
              <Input name="name" type="string" placeholder="Nombre" />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="surname" type="string" placeholder="Apellidos" />
              {errors.surname && <p className="text-red-500">{errors.surname}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="id" type="string" placeholder="ID del empleado" />
              {errors.id && <p className="text-red-500">{errors.id}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="position" type="string" placeholder="Puesto de trabajo" />
              {errors.position && <p className="text-red-500">{errors.position}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="contract" type="string" placeholder="Tipo de contrato" />
              {errors.contract && <p className="text-red-500">{errors.contract}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input name="jornada" type="string" placeholder="Jornada laboral" />
              {errors.jornada && <p className="text-red-500">{errors.jornada}</p>}
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
                type="tel"
                id="phone"
                placeholder="Número de teléfono personal"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
            </div>
            <div className="flex flex-col justify-center mb-2">
              <Input
                type="email"
                id="corporate-email"
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
  );
};


