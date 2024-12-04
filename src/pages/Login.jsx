import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para redirección

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();  // Usamos el hook de navegación

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error('Error al conectar con el servidor');
      }

      const users = await response.json();
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        setSuccess(true);
        setError('');
        console.log('Inicio de sesión exitoso:', user);
        
        // Redirigir al dashboard
        navigate('/dashboard');
      } else {
        setSuccess(false);
        setError('Tus datos no se reconocen en el sistema');
      }
    } catch (err) {
      setError('Hubo un problema al iniciar sesión');
      console.error('Error:', err);
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
          {error && <p className="text-red-500">{error}</p>}  {/* Muestra el mensaje de error */}
          <Button onClick={handleLogin}>Iniciar sesión</Button>
        </div>
      </div>
      <div className="bg-secondarybg w-1/5"></div>
    </div>
  );
};

export default LoginPage;
