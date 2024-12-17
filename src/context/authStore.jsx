import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      role: null,
      user: null,
      isAuthenticated: false,

      isTokenExpired: () => {
        const token = get().token;
        if (!token) return true;

        try {
          const decoded = jwtDecode(token);
          return Date.now() >= decoded.exp * 1000;
        } catch (error) {
          console.error('Error decoding token:', error);
          return true;
        }
      },

      extractRoleFromToken: (token) => {
        try {
          const decoded = jwtDecode(token);

          const realmRoles = decoded.realm_access?.roles || [];
          const apiRoles =
            decoded.resource_access?.['AssecoSync-API']?.roles || [];

          const allRoles = [...realmRoles, ...apiRoles];

          if (allRoles.includes('admin')) return 'admin';
          if (allRoles.includes('employee')) return 'employee';

          return null;
        } catch (error) {
          console.error('Error extracting role:', error);
          return null;
        }
      },

      setToken: (token) => set({ token }),

      login: (token) => {
        const role = get().extractRoleFromToken(token);

        try {
          const decoded = jwtDecode(token);

          set({
            token,
            role,
            isAuthenticated: true,
            user: decoded.given_name,
          });
          localStorage.setItem('token', token);
        } catch (error) {
          console.error('Error in login:', error);
          set({
            token: null,
            role: null,
            isAuthenticated: false,
            user: null,
          });
        }
      },

      logout: () => {
        set({
          token: null,
          role: null,
          isAuthenticated: false,
          user: null,
        });
        localStorage.removeItem('token');
      },
    }),
    {
      name: 'keycloak-auth-storage',
      partialize: (state) => ({
        token: state.token,
        role: state.role,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Helper function for easy access to user info
export const useUserInfo = () => {
  const { user, role, isAuthenticated } = useAuthStore();
  return { user, role, isAuthenticated };
};
