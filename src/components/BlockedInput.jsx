import React from 'react';

const BlockedInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-800">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 w-[300px] h-[45px] px-3 py-2 text-gray-700 bg-blockedInput border border-black rounded-lg shadow-sm focus:outline-none cursor-not-allowed"
        readOnly
      />
    </div>
  );
};

export default BlockedInput;