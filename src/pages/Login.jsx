import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { loginEmployee } from '../services/authService';
import { useAuthStore } from '../context/authStore';

const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validación de campos
  const validateForm = () => {
    if (!email || !password) {
      setLoginError('Por favor, complete todos los campos.');
      return false;
    }

    // Expresión regular simple para validar el formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoginError('El correo electrónico no es válido.');
      return false;
    }

    return true;
  };

  // Manejo de cambios en los campos
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // Función para manejar el login
  const handleLogin = async () => {
    // Validación antes de proceder con el login
    if (!validateForm()) return;

    try {
      const loginData = { email, password };
      const result = await loginEmployee(loginData);

      if (result.success) {
        const session_token = result.token;
        login(session_token); // Guardamos el token en el estado global
        navigate('/dashboard');
      } else {
        setLoginError(result.message || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setLoginError('Hubo un problema al intentar iniciar sesión.');
    }
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
          {loginError && (
            <div className="text-red-500 text-sm mt-2">{loginError}</div>
          )}
          <Button onClick={handleLogin}>Iniciar sesión</Button>
        </div>
      </div>
      <div className="bg-secondarybg w-1/5"></div>
    </div>
  );
};

export default LoginPage;
