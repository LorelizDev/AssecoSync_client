import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import logo from '../assets/images/logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Aquí iría la lógica de inicio de sesión
    console.log('Correo:', email);
    console.log('Contraseña:', password);
  };

  return (
    <div className="flex h-screen">
      <div className="bg-primarybg w-4/5 flex flex-col items-center justify-center space-y-8">
        <img src={logo} alt="Asseco Logo" className="w-52 h-11" />
        <div className="flex flex-col w-auto space-y-4">
          <h2 className="text-xl font-semibold text-font self-start">
            Iniciar sesión
          </h2>

          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Ingresa tu correo"
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Ingresa tu contraseña"
          />
          <Button onClick={handleLogin}>Iniciar sesión</Button>
        </div>
      </div>
      <div className="bg-secondarybg w-1/5"></div>
    </div>
  );
};

export default LoginPage;
