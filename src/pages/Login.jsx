import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { loginEmployee } from '../services/authService';
import { useForm } from 'react-hook-form';
import useAuthStore from '../context/authStore';

const LoginPage = () => {
const { login } = useAuthStore();
const { register, formState: { errors }, handleSubmit} = useForm();
const navigate = useNavigate();
const [loginError, setLoginError] = useState(null);
  const handleLogin = async (loginData) => {
      const result = await loginEmployee(loginData);
  
      if (result.success) {
        login(result.userData.token, result.userData.user.role);
        navigate("/");
      } else {
        setLoginError(result.message);
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

          <Input {...register("email")}
            label="Correo electrónico"
            name="email"
            type="email"
            errors={errors}
            placeholder="Ingresa tu correo"
          />

          <Input {...register("password")}
            label="Contraseña"
            name="password"
            type="password"
            errors={errors}
            placeholder="Ingresa tu contraseña"
          />

          <div>
						{loginError && (
							<p className="text-red-500 text-sm mt-1">
								{loginError}
							</p>
						)}
					</div>

          <Button onClick={handleSubmit(handleLogin)}>Iniciar sesión</Button>
        </div>
      </div>
      <div className="bg-secondarybg w-1/5"></div>
    </div>
  );
};

export default LoginPage;
