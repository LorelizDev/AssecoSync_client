import React from 'react';
import Sidebar from '../components/Sidebar';
import EmployeeList from '../components/EmployeeList'; // Import the EmployeeList component

const AdminEmployeeList = () => {
  const employees = [
    {
      profilePicture: '../src/assets/images/profile-pictures/alan.jpg',
      id: '0001',
      name: 'Alan',
      lastName: 'Montalvo Amador',
      email: 'alan.montalvo.amador@demo-datos.es',
      position: 'Office Manager',
    },
    {
      profilePicture: '../src/assets/images/profile-pictures/alejandro.jpg',
      id: '0002',
      name: 'Alejandro',
      lastName: 'Iglesias Linares',
      email: 'alejandro.iglesias.linares@demo-datos.es',
      position: 'Sales Manager',
    },

    {
      profilePicture: '../src/assets/images/profile-pictures/ana.jpg',
      id: '00003',
      name: 'Ana',
      lastName: 'García',
      email: 'anagarcia@demo-datos.es',
      position: 'UI Designer',
    },
    {
      profilePicture: '../src/assets/images/profile-pictures/carla.jpg',
      id: '00004',
      name: 'Carla',
      lastName: 'Vásquez Aguirre',
      email: 'carla.vasquez.aguirre@demo-datos.es',
      position: 'PR Manager',
    },
    {
      profilePicture: '../src/assets/images/profile-pictures/carlos.jpg',
      id: '00005',
      name: 'Carlos',
      lastName: 'Solís Reynoso',
      email: 'carlos.solis.reynoso@demo-datos.es',
      position: 'Head of IT',
    },
    {
      profilePicture: '../src/assets/images/profile-pictures/catalina.jpg',
      id: '00006',
      name: 'Catalina',
      lastName: 'Martín Blanco',
      email: 'catalina.martin.blanco@demo-datos.es',
      position: 'Senior Backend Developer',
    },
    {
      profilePicture: '../src/assets/images/profile-pictures/cristian.jpg',
      id: '00007',
      name: 'Cristian',
      lastName: 'Mena Sarmiento',
      email: 'cristian.mena.sarmiento@demo-datos.es',
      position: 'Budget Analyst',
    },
    {
      profilePicture: '../src/assets/images/profile-pictures/daniela.jpg',
      id: '00008',
      name: 'Daniela',
      lastName: 'Suárez Gil',
      email: 'daniela.suarez.gil@demo-datos.es',
      position: 'Head of HR',
    },
    {
      profilePicture: '../src/assets/images/profile-pictures/diego.jpg',
      id: '00009',
      name: 'Diego',
      lastName: 'Colón Sánchez',
      email: 'diego.colon.sanchez@demo-datos.es',
      position: 'Asesor Financiero',
    },
    // Add more employees as needed
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="relative w-20 bg-primarybg">
        <Sidebar />
      </div>

      {/* Área principal (80% del ancho) */}
      <div className="w-4/5 bg-primarybg">
        <div className="container mx-auto p-6">
          <h1 className="text-1xl text-primary font-bold mb-6">
            Lista de empleados
          </h1>
          <EmployeeList employees={employees} />{' '}
          {/* Use the EmployeeList component */}
        </div>
      </div>

      {/* Lado derecho (20% del ancho) */}
      <div className="w-1/5 bg-secondarybg"></div>
    </div>
  );
};

export default AdminEmployeeList;
