import React from 'react';
import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../context/authStore';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { TbSmartHome, TbUser, TbCalendar } from 'react-icons/tb';

const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout); // Obtener la función logout
  const navigate = useNavigate();

  // Maneja el evento de cerrar sesión
  const handleLogout = () => {
    logout(); // Limpia el estado de autenticación
    navigate('/'); // Redirige al usuario a la página de login
  };

  // Lista de ítems de navegación
  const menuItems = [
    { icon: <TbSmartHome size={24} />, label: 'Inicio', route: '/dashboard' },
    {
      icon: <TbCalendar size={24} />,
      label: 'Calendario',
      route: '/calendar',
    },
    { icon: <TbUser size={24} />, label: 'Perfil', route: '/profile' },
    {
      icon: <HiOutlineCog6Tooth size={24} />,
      label: 'Configuración',
      route: '/configuration',
    },
  ];

  return (
    <div className="relative h-screen w-20 bg-primarybg shadow-md flex flex-col items-center py-4 space-y-6">
      {/* Línea divisoria a la derecha */}
      <div className="absolute right-0 top-0 h-full w-px bg-[#EAEEF4]"></div>

      {/* Ítems de navegación */}
      <nav className="flex flex-col items-center space-y-6">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            route={item.route}
            // Añadimos isPrimary solo al primer elemento para poder cambiar el color de fondo
            isPrimary={index === 0}
          />
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-800 text-sm flex flex-col items-center"
        >
          <span className="text-2xl">⎋</span> {/* Icono simple de logout */}
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
