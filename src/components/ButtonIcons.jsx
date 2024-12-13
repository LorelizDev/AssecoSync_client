import React from 'react';

const ButtonIcons = ({
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  icon: Icon,
}) => {
  const baseStyles =
    'w-[300px] h-[45px] bg-primary rounded-lg text-white font-medium ' +
    'transition-all duration-200 hover:bg-hoverButton active:transform active:scale-95 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 ' +
    'focus:ring-blue-400 focus:ring-opacity-50';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${className}`}
    >
      {typeof icon === 'string' ? (
        <img src={Icon} alt="" className="w-8 h-8 mr-4" />
      ) : (
        Icon && <Icon className="w-8 h-8 mr-4" />
      )}
      <span className="text-left font-medium">{children}</span>
      {children}
    </button>
  );
};

export default ButtonIcons;
