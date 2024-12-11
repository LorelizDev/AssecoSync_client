import { useAuthStore } from './context/authStore';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const { token } = useAuthStore((state) => state);

  return (
    <>
      <TokenValidator token={token} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

const TokenValidator = ({ token }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Actualiza el estado de autenticación según si existe o no el token
  useEffect(() => {
    setIsAuthenticated(!!token); // Si el token existe, establece true
  }, [token]);

  // Renderiza el contenido según el estado de autenticación
  return isAuthenticated ? <AuthenticatedRoutes /> : <LoginPage />;
};

// Componentes de ejemplo (debemos reemplazarlos con los componentes reales)
const AuthenticatedRoutes = () => {
  return <div>Rutas autenticadas</div>;
};

const LoginPage = () => {
  return <div>Página de Login</div>;
};

export default App;
