import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ icon, label, route, isPrimary = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <NavLink
        to={route}
        className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors duration-200"
        activeClassName="text-blue-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Contenedor del ícono con condicional para fondo primary */}
        <div
          className={`
          flex justify-center items-center 
          w-12 h-12 
          rounded-full shadow-md 
          hover:shadow-lg 
          transition-shadow duration-200
          ${isPrimary ? 'bg-primary text-white' : 'bg-white'}
        `}
        >
          {icon}
        </div>
      </NavLink>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2">
          <div
            className="
            bg-gray-800 text-white 
            text-xs 
            px-3 py-2 
            rounded-md 
            whitespace-nowrap
            shadow-lg
            z-50
            transition-all duration-300 ease-in-out
          "
          >
            {label}
            <div
              className="
              absolute right-full 
              top-1/2 
              transform -translate-y-1/2 
              w-0 h-0 
              border-y-8 border-y-transparent 
              border-r-8 border-r-gray-800
            "
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Definir los tipos de propiedades esperadas
SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool,
};

export default SidebarItem;
