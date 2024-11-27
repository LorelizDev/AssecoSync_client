import React from 'react';
import SidebarItem from './SidebarItem';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { TbSmartHome, TbUser, TbCalendar } from 'react-icons/tb';

const Sidebar = () => {
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
      {/* Imagen del perfil */}
      <div className="rounded-full overflow-hidden w-12 h-12">
        <img src="https://via.placeholder.com/150" alt="Profile" />
      </div>

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
    </div>
  );
};

export default Sidebar;
