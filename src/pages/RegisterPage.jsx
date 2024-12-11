import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getEmployeeByIdFromExternalDb } from '../services/getEmployeeService';
import { registerEmployee } from '../services/adminServices';
import BlockedInput from '../components/BlockedInput';
import Input from '../components/Input';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import { BiSolidBadgeCheck } from "react-icons/bi";

export const RegisterPage = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!employeeId) return;

      try {
        const employeeData = await getEmployeeByIdFromExternalDb(employeeId);
        
        if (employeeData) {
          setEmployee(employeeData);
          setError(null);
        } else {
          setError('Empleado no encontrado');
          setEmployee(null);
        }
      } catch (error) {
        console.error('Error al cargar datos del empleado:', error);
        setError('Error al buscar el empleado');
        setEmployee(null);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleRegister = async () => {
    if (!employee || !employee.data) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay datos del empleado para registrar',
      });
      return;
    }

    const { 
      id, 
      firstName, 
      lastName, 
      jobTitle, 
      department, 
      weeklyHours, 
      email, 
      dateJoined 
    } = employee.data;

    try {
      const result = await registerEmployee({
        id,
        firstName,
        lastName,
        jobTitle,
        department,
        weeklyHours,
        email,
        dateJoined
      });

      if (result.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: `${firstName} ${lastName} ha sido registrado correctamente`,
          confirmButtonText: 'Aceptar'
        });

        navigate('/dashboard');
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error de Registro',
          text: result.message || 'No se pudo registrar al empleado',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado',
        confirmButtonText: 'Aceptar'
      });
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
          <Input
            label="Introduce el ID del empleado"
            name="id"
            type="string"
            placeholder="EMP000"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          
          {error && <p className="text-red-500 mt-2">{error}</p>}
          
          {employee && (
            <div className="flex flex-row flex-wrap bg-white p-6 space-x-44 w-full">
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
                  label="Correo corporativo"
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
                <Button 
                  className="mt-6 justify-center" 
                  onClick={handleRegister}
                >
                  Registrar
                </Button>
              </div>   
            </div>
          )}
        </div> 
      </div>
      <div className="w-1/5 bg-secondarybg"></div>
    </div>
  );
};