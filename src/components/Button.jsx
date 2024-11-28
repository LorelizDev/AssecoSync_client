import React from 'react';

const CustomButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
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
      {children}
    </button>
  );
};

export default CustomButton;
