import { create } from 'zustand';

export const useTimeStore = create((set, get) => ({
  startTime: null,
  pauseTime: null,
  stopTime: null,
  resumeTime: null,
  actions: [],
  journeyEndMessage: null,
  token: null,

  setToken: (token) => set({ token }), // Guarda el token
  clearToken: () => set({ token: null }), // Limpia el token

  setStartTime: (time) => {
    set((state) => {
      const newActions = [
        ...state.actions.filter((action) => action.type !== ''),
        { type: 'Trabajo', time },
      ];
      return {
        startTime: time,
        actions: newActions,
      };
    });
  },

  setResumeTime: (time) =>
    set((state) => ({
      resumeTime: time,
      actions: [...state.actions, { type: 'Trabajo', time }],
    })),

  setPauseTime: (time) =>
    set((state) => ({
      pauseTime: time,
      actions: [...state.actions, { type: 'Pausa', time }],
    })),

  setStopTime: (time) =>
    set((state) => ({
      stopTime: time,
      actions: [], // Limpiar completamente las acciones
      journeyEndMessage: `Has finalizado tu jornada a las ${time}`,
    })),

  clearJourneyEndMessage: () => set({ journeyEndMessage: null }),

  clearActions: () => set({ actions: [] }),
}));
