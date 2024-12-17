import React from 'react';
import { useUserInfo } from '../context/authStore';
import { RxAvatar } from 'react-icons/rx';

const Navbar = () => {
  const { user } = useUserInfo();

  return (
    <div className="relative w-screen bg-primarybg shadow-md flex items-center pt-6 pb-4 px-4 space-x-10 text-2xl z-50">
      {/* Imagen del perfil */}
      <div className="rounded-full overflow-hidden w-12 h-12">
        <RxAvatar className="w-12 h-12 text-grayicon" />
      </div>
      <p>¡Hola, <b>{user}</b>!</p>
    </div>
  );
};

export default Navbar;
