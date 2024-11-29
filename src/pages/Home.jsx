import React, { useState } from 'react';
import CustomButton from '../components/Button';
import Input from '../components/Input';
import { TimeClock } from '../components/TimeClock';

const Home = () => {
  // Estado para manejar el valor del input
  const [inputValue, setInputValue] = useState('');

  // Función para manejar el cambio en el input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Función para manejar el clic en el botón
  const handleButtonClick = () => {
    alert(`El valor del input es: ${inputValue}`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-10">
      <Input
        label="Prueba de Input"
        name="testInput"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Escribe algo..."
      />
      <CustomButton onClick={handleButtonClick}>Iniciar sesión</CustomButton>
      <TimeClock />
    </div>
  );
};

export default Home;
