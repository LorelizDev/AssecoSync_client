import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  // Estado relacionado con el token
  token: null,
  setToken: (token) => set({ token }), // Guarda el token
  clearToken: () => set({ token: null }), // Limpia el token

  // Otros estados y funcionalidades relacionados con la autenticación
  isAuthenticated: false, // Indica si el usuario está autenticado
  setIsAuthenticated: (value) => set({ isAuthenticated: value }), // Cambia el estado de autenticación

  // Función para realizar el login
  login: (token) => {
    set({ token, isAuthenticated: true }); // Guarda el token y establece el estado como autenticado
    localStorage.setItem('token', token); // Opcional: persiste el token en localStorage
  },

}));



















//crear funcion para guardar el token en el localstorage
//crear estado global para guaradr el token

// const token = localStorage.getItem('authToken');
//     const role = localStorage.getItem('role');
//     const user = JSON.parse(localStorage.getItem('user'));
//     const expirationTime = localStorage.getItem('tokenExpiration');
//     const sessionExpired =
//       expirationTime && Number(expirationTime) < Date.now();

      // const localStorageService = {
  // loadSession: () => {
    

  //   return {
  //     token,
  //     role,
  //     user,
  //     sessionExpired,
  //   };
  // },

  // saveSession: (token, role, user) => {
  //   const expirationTime = Date.now() + 7200000; // 2 horas
  //   localStorage.setItem('authToken', token);
  //   localStorage.setItem('role', role);
  //   localStorage.setItem('user', JSON.stringify(user));
  //   localStorage.setItem('tokenExpiration', expirationTime);
  // },

  // clearSession: () => {
  //   localStorage.removeItem('authToken');
  //   localStorage.removeItem('role');
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('tokenExpiration');
  // },
// };

// Store de Zustand para la autenticación
// const useAuthStore = create((set) => ({
//   isAuthenticated: false,
//   user: null,
//   isAdmin: false,
//   token: null,
//   loading: true,
//   sessionExpired: false,

  // // Método para cargar la sesión desde localStorage al iniciar la app
  // loadSession: () => {
  //   const { token, role, user, sessionExpired } =
  //     localStorageService.loadSession();

  //   set({
  //     token,
  //     isAuthenticated: !!token,
  //     isAdmin: role === 'admin',
  //     user,
  //     sessionExpired,
  //     loading: false,
  //   });
  // },

  // // Método para iniciar sesión
  // login: (token) => {
  //   console.log('hola desde zustand');
  //   localStorage.setItem('authToken', token);
  //   set({
  //     isAuthenticated: true,
  //     // isAdmin: role === 'admin',
  //     // user,
  //     token,
  //     sessionExpired: false,
  //   });
  // },

  // Método para cerrar sesión
  // logout: () => {
  //   localStorageService.clearSession();
  //   set({
  //     isAuthenticated: false,
  //     isAdmin: false,
  //     user: null,
  //     token: null,
  //     sessionExpired: false,
  //   });
  // },
// }));

// export default useAuthStore;
