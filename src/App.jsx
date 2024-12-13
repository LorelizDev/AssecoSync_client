import { useAuthStore } from "./context/authStore";
import { useTimeStore } from "./context/timeStore";
import  { useState } from "react";

export const App = () => {
  const { token } = useAuthStore((state) => state.token);
  const { startTime, pauseTime, stopTime } = useTimeStore((state) => ({
    startTime: state.startTime,
    pauseTime: state.pauseTime,
    stopTime: state.stopTime,
  }));

  return <TokenValidator token={token} />;
};

const TokenValidator = ({ token }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
// Actualiza el estado de autenticación según si existe o no el token
    useEffect(() => {
        setIsAuthenticated(!!token); // Si el token existe, establece true
    }, [token]);
}