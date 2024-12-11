import React, { useState, useEffect } from 'react';
import { getEmployeeByIdFromExternalDb } from '../services/getEmployeeService';
import { registerEmployee } from '../services/adminServices';
import BlockedInput from '../components/BlockedInput';
import Input from '../components/Input';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import { BiSolidBadgeCheck } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!employeeId) return;

      try {
        const employeeData = await getEmployeeByIdFromExternalDb(employeeId);
        if (!employeeData) {
          setError('Empleado no encontrado');
        } else {
          setEmployee(employeeData);
          setError(null);
        }
      } catch (error) {
        console.error('Error al cargar los datos del empleado:', error);
        setError('Por favor, inténtalo nuevamente.');
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleRegister = async () => {
    if (!employee || !employee.data) {
      setError("No hay datos del empleado para registrar.");
      return;
    }

    const { id, firstName, lastName, jobTitle, department, weeklyHours, email, dateJoined } = employee.data;

    const registerData = { 
      id,
      firstName, 
      lastName, 
      jobTitle, 
      department, 
      weeklyHours, 
      email, 
      dateJoined 
    };

    try {
      const result = await registerEmployee(registerData);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setErrors({ 
          loginError: result.message || 'Error al registrar el empleado' 
        });
      }
    } catch (error) {
      console.error('Error al registrar el empleado:', error);
      setError('Hubo un error al intentar registrar el empleado. Intenta nuevamente.');
    }
  };

  return (
    <div className="flex bg-primarybg">
        <div className="relative w-20 bg-primarybg">
            <Sidebar />
        </div>
        <div className="flex flex-col w-4/5 justify-center bg-primarybg p-8">
        <div className="flex flex-row space-x-4">
        <BiSolidBadgeCheck className="size-7 text-primary" />
        <h3 className="text-lg font-medium mb-4">Registrar a un nuevo empleado</h3>
        </div>
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-row space-x-16">
        <Input
            label="Introduce el ID del empleado"
            name="id"
            type="string"
            placeholder="EMP000"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
        />
     
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {employee && (
                <div className="flex flex-row flex-wrap bg-white p-6 space-x-44">
                <div className="flex flex-col">
                  <BlockedInput
                  label="Nombre"
                  value={employee.data.firstName}
                  />
                  <BlockedInput
                  label="Apellidos"
                  value={employee.data.lastName}
                  />
                  <BlockedInput
                  label="Corrreo corporativo"
                  value={employee.data.email}
                  />
                  <BlockedInput 
                  label="Fecha de inicio"
                  value={employee.data.dateJoined}
                  /> 
                </div>
                <div className="flex flex-col">
                  <BlockedInput
                  label="Puesto"
                  value={employee.data.jobTitle}
                  />
                  <BlockedInput 
                  label="Departamento"
                  value={employee.data.department}
                  />
                  <BlockedInput 
                  label="Jornada laboral"
                  value={employee.data.weeklyHours}
                  />
                  <Button className="mt-6 justify" onClick={handleRegister}>Registrar </Button>
                </div>   
          </div>
        )}
        
        </div> 
        
        </div>
        <div className="w-1/5 bg-secondarybg"></div>
    </div>
  );
}