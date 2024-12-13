import { create } from 'zustand';

export const useTimeStore = create((set) => ({
  startTime: null,
  pauseTime: null,
  stopTime: null,
  actions: [], // Arreglo para almacenar las acciones

  setStartTime: (time) => set((state) => ({
    startTime: time,
    actions: [...state.actions, { type: 'Trabajo', time }]
  })),

  setPauseTime: (time) => set((state) => ({
    pauseTime: time,
    actions: [...state.actions, { type: 'Pausa', time }]
  })),

  setStopTime: (time) => set((state) => ({
    stopTime: time,
    actions: [...state.actions, { type: 'Detenido', time }]
  })),

  // Método para limpiar las acciones si es necesario
  clearActions: () => set({ actions: [] })
}));
