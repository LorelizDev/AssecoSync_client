import create from 'zustand';

const localStorageService = {
  loadSession: () => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');
    const user = JSON.parse(localStorage.getItem('user'));
    const expirationTime = localStorage.getItem('tokenExpiration');
    const sessionExpired =
      expirationTime && Number(expirationTime) < Date.now();

    return {
      token,
      role,
      user,
      sessionExpired,
    };
  },

  saveSession: (token, role, user) => {
    const expirationTime = Date.now() + 7200000; // 2 horas
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('tokenExpiration', expirationTime);
  },

  clearSession: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiration');
  },
};

// Store de Zustand para la autenticación
const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  isAdmin: false,
  token: null,
  loading: true,
  sessionExpired: false,

  // Método para cargar la sesión desde localStorage al iniciar la app
  loadSession: () => {
    const { token, role, user, sessionExpired } =
      localStorageService.loadSession();

    set({
      token,
      isAuthenticated: !!token,
      isAdmin: role === 'admin',
      user,
      sessionExpired,
      loading: false,
    });
  },

  // Método para iniciar sesión
  login: (token, role, user) => {
    localStorageService.saveSession(token, role, user);
    set({
      isAuthenticated: true,
      isAdmin: role === 'admin',
      user,
      token,
      sessionExpired: false,
    });
  },

  // Método para cerrar sesión
  logout: () => {
    localStorageService.clearSession();
    set({
      isAuthenticated: false,
      isAdmin: false,
      user: null,
      token: null,
      sessionExpired: false,
    });
  },
}));

export default useAuthStore;
